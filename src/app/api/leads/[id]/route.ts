import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedUser: { select: { id: true, name: true, email: true, phone: true } },
      interestedProject: true,
      interestedPlot: true,
      followUps: {
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true } } },
      },
      siteVisits: {
        orderBy: { visitDate: 'desc' },
        include: {
          assignedUser: { select: { id: true, name: true } },
          plot: true,
        },
      },
      customer: {
        include: {
          bookings: {
            include: { plot: true },
          },
        },
      },
      activityLogs: {
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true } } },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  // Permissions: SALES_EXECUTIVE can only view assigned lead
  if (session.role === 'SALES_EXECUTIVE' && lead.assignedUserId !== session.userId) {
    return NextResponse.json({ error: 'Access denied to this lead.' }, { status: 403 });
  }

  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, assignedUserId, remarks, nextFollowUpDate } = body;

  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  // Update object
  const updateData: any = {};
  if (status) updateData.status = status;
  if (remarks !== undefined) updateData.remarks = remarks;
  if (nextFollowUpDate !== undefined) updateData.nextFollowUpDate = nextFollowUpDate ? new Date(nextFollowUpDate) : null;

  // Reassignment allowed for MANAGER, ADMIN, SUPER_ADMIN
  if (assignedUserId !== undefined && session.role !== 'SALES_EXECUTIVE') {
    updateData.assignedUserId = assignedUserId;
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: updateData,
  });

  // Log activity
  if (status && status !== existing.status) {
    await prisma.activityLog.create({
      data: {
        action: 'STATUS_CHANGED',
        entityType: 'Lead',
        entityId: id,
        leadId: id,
        userId: session.userId,
        previousValue: existing.status,
        newValue: status,
        details: `Lead status updated from ${existing.status} to ${status} by ${session.name}`,
      },
    });
  }

  if (assignedUserId && assignedUserId !== existing.assignedUserId) {
    await prisma.activityLog.create({
      data: {
        action: 'LEAD_ASSIGNED',
        entityType: 'Lead',
        entityId: id,
        leadId: id,
        userId: session.userId,
        previousValue: existing.assignedUserId || 'Unassigned',
        newValue: assignedUserId,
        details: `Lead reassigned by ${session.name}`,
      },
    });
  }

  return NextResponse.json({ success: true, lead: updated });
}
