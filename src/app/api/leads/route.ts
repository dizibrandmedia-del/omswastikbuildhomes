import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const projectId = searchParams.get('projectId');
  const assignedUserId = searchParams.get('assignedUserId');

  // Role-based scoping: SALES_EXECUTIVE can only view assigned leads
  let whereClause: any = {};
  if (session.role === 'SALES_EXECUTIVE') {
    whereClause.assignedUserId = session.userId;
  } else if (assignedUserId && assignedUserId !== 'ALL') {
    whereClause.assignedUserId = assignedUserId;
  }

  if (status && status !== 'ALL') {
    whereClause.status = status;
  }

  if (projectId && projectId !== 'ALL') {
    whereClause.interestedProjectId = projectId;
  }

  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { mobile: { contains: search } },
      { email: { contains: search } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      assignedUser: { select: { id: true, name: true, role: true } },
      interestedProject: { select: { id: true, name: true } },
      interestedPlot: { select: { id: true, plotNumber: true, priceTotal: true } },
      followUps: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      siteVisits: {
        orderBy: { visitDate: 'desc' },
        take: 1,
      },
    },
  });

  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, mobile, email, budget, requirement, interestedProjectId, interestedPlotId, assignedUserId, leadSource = 'MANUAL' } = body;

    if (!name || !mobile) {
      return NextResponse.json({ error: 'Name and mobile are required.' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        mobile,
        email: email || null,
        budget: budget || null,
        requirement: requirement || null,
        interestedProjectId: interestedProjectId || null,
        interestedPlotId: interestedPlotId || null,
        assignedUserId: assignedUserId || (session.role === 'SALES_EXECUTIVE' ? session.userId : null),
        leadSource,
        status: 'NEW',
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'LEAD_CREATED',
        entityType: 'Lead',
        entityId: lead.id,
        leadId: lead.id,
        userId: session.userId,
        details: `Manual lead created by ${session.name}`,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
