import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      mobile,
      email,
      budget,
      requirement,
      honeypot,
      projectId,
      plotId,
      source = 'WEBSITE',
      isSiteVisit = false,
      visitDate,
      visitTimeSlot,
    } = body;

    // 1. Anti-spam honeypot check
    if (honeypot && honeypot.trim().length > 0) {
      // Silently discard spam bots
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    // 2. Validation
    if (!name || !name.trim() || !mobile || !mobile.trim()) {
      return NextResponse.json(
        { error: 'Name and mobile number are required.' },
        { status: 400 }
      );
    }

    const cleanedMobile = mobile.replace(/\D/g, '');
    if (cleanedMobile.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // 3. Intelligent Sales Executive Assignment
    // Find active sales personnel
    const salesTeam = await prisma.user.findMany({
      where: {
        isActive: true,
        role: { in: ['SALES_EXECUTIVE', 'SALES_MANAGER', 'ADMIN'] },
      },
      select: { id: true, name: true, role: true },
    });

    let assignedUserId: string | null = null;
    if (salesTeam.length > 0) {
      // Prioritize SALES_EXECUTIVE first, then MANAGER, then ADMIN
      const executive = salesTeam.find((u) => u.role === 'SALES_EXECUTIVE') || salesTeam[0];
      assignedUserId = executive.id;
    }

    // 4. Create Lead in Database
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        mobile: cleanedMobile,
        email: email && email.trim() ? email.trim() : null,
        budget: budget || null,
        requirement: requirement || null,
        interestedProjectId: projectId || null,
        interestedPlotId: plotId || null,
        leadSource: source,
        assignedUserId: assignedUserId,
        status: isSiteVisit ? 'SITE_VISIT_SCHEDULED' : 'NEW',
      },
    });

    // 5. If Site Visit Requested, create SiteVisit record
    if (isSiteVisit && visitDate && projectId) {
      await prisma.siteVisit.create({
        data: {
          leadId: lead.id,
          projectId: projectId,
          plotId: plotId || null,
          assignedUserId: assignedUserId,
          visitDate: new Date(visitDate),
          visitTime: visitTimeSlot || 'Morning',
          status: 'SCHEDULED',
          remarks: `Requested from website form by ${name} (${cleanedMobile})`,
        },
      });
    }

    // 6. Record Activity Log
    await prisma.activityLog.create({
      data: {
        action: 'LEAD_CREATED',
        entityType: 'Lead',
        entityId: lead.id,
        leadId: lead.id,
        userId: assignedUserId,
        details: `Public enquiry received from ${name} via ${source}. Assigned to staff.`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been successfully registered.',
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your enquiry.' },
      { status: 500 }
    );
  }
}
