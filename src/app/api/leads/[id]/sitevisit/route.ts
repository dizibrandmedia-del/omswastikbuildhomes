import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { projectId, plotId, visitDate, visitTime, assignedUserId, remarks } = body;

  if (!projectId || !visitDate) {
    return NextResponse.json({ error: 'Project and visit date are required.' }, { status: 400 });
  }

  try {
    const siteVisit = await prisma.siteVisit.create({
      data: {
        leadId: id,
        projectId,
        plotId: plotId || null,
        assignedUserId: assignedUserId || session.userId,
        visitDate: new Date(visitDate),
        visitTime: visitTime || 'Morning (10:00 AM - 1:00 PM)',
        status: 'SCHEDULED',
        remarks: remarks || null,
      },
    });

    // Update lead status to SITE_VISIT_SCHEDULED
    await prisma.lead.update({
      where: { id },
      data: { status: 'SITE_VISIT_SCHEDULED' },
    });

    await prisma.activityLog.create({
      data: {
        action: 'VISIT_SCHEDULED',
        entityType: 'Lead',
        entityId: id,
        leadId: id,
        userId: session.userId,
        details: `Site visit scheduled for ${new Date(visitDate).toLocaleDateString('en-IN')} by ${session.name}`,
      },
    });

    return NextResponse.json({ success: true, siteVisit }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
