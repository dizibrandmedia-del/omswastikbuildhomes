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
  const { callStatus, remarks, customerRequirement, nextAction, nextFollowUpDate, leadStatus } = body;

  if (!remarks) {
    return NextResponse.json({ error: 'Follow-up remarks are required.' }, { status: 400 });
  }

  try {
    const followup = await prisma.followUp.create({
      data: {
        leadId: id,
        userId: session.userId,
        callStatus: callStatus || 'ANSWERED',
        remarks,
        customerRequirement: customerRequirement || null,
        nextAction: nextAction || null,
        nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : null,
        completedAt: new Date(),
      },
    });

    // Update the lead's next follow-up date and status
    const updateData: any = {};
    if (nextFollowUpDate) updateData.nextFollowUpDate = new Date(nextFollowUpDate);
    if (leadStatus) updateData.status = leadStatus;

    await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    // Record activity
    await prisma.activityLog.create({
      data: {
        action: 'FOLLOW_UP_ADDED',
        entityType: 'Lead',
        entityId: id,
        leadId: id,
        userId: session.userId,
        details: `Follow-up call logged by ${session.name} (${callStatus}): "${remarks}"`,
      },
    });

    return NextResponse.json({ success: true, followup }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
