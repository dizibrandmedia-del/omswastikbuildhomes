import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
      project: { select: { id: true, name: true, location: true } },
      plot: { select: { id: true, plotNumber: true, sizeSqYd: true, priceTotal: true } },
      salesUser: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
    return NextResponse.json({ error: 'Unauthorized to initiate official bookings.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      customerId,
      customerName,
      customerPhone,
      customerEmail,
      panNumber,
      fullAddress,
      leadId,
      projectId,
      plotId,
      bookingAmount,
      paymentMode = 'CHEQUE',
      paymentReference,
      remarks,
    } = body;

    if (!projectId || !plotId || !bookingAmount) {
      return NextResponse.json(
        { error: 'Project, plot and booking amount are required.' },
        { status: 400 }
      );
    }

    // STRICT INVENTORY INTEGRITY TRANSACTION
    const result = await prisma.$transaction(async (tx) => {
      // 1. Lock and verify plot availability
      const plot = await tx.plot.findUnique({
        where: { id: plotId },
      });

      if (!plot) {
        throw new Error('Selected plot does not exist.');
      }

      if (plot.status === 'BOOKED' || plot.status === 'SOLD') {
        throw new Error(`Integrity Conflict: Plot #${plot.plotNumber} is already ${plot.status} and cannot be double-booked.`);
      }

      // 2. Resolve Customer Profile
      let activeCustomerId = customerId;
      if (!activeCustomerId) {
        if (!customerName || !customerPhone) {
          throw new Error('Customer name and phone are required to create booking record.');
        }

        const newCustomer = await tx.customer.create({
          data: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail || null,
            panNumber: panNumber || null,
            fullAddress: fullAddress || null,
            convertedFromLeadId: leadId || null,
          },
        });
        activeCustomerId = newCustomer.id;
      }

      // 3. Generate Booking Number
      const count = await tx.booking.count();
      const bookingNumber = `OSB-2026-${String(count + 1).padStart(4, '0')}`;

      // 4. Create Booking
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          customerId: activeCustomerId,
          projectId,
          plotId,
          salesUserId: session.userId,
          bookingAmount: parseFloat(bookingAmount),
          totalPropertyValue: plot.priceTotal,
          paymentMode,
          paymentReference: paymentReference || null,
          status: 'BOOKED',
          remarks: remarks || null,
        },
      });

      // 5. Update Plot status to BOOKED
      await tx.plot.update({
        where: { id: plotId },
        data: {
          status: 'BOOKED',
          remarks: `Booked under ${bookingNumber}`,
        },
      });

      // 6. Update Lead status if applicable
      if (leadId) {
        await tx.lead.update({
          where: { id: leadId },
          data: { status: 'BOOKING' },
        });
      }

      // 7. Activity Log
      await tx.activityLog.create({
        data: {
          action: 'BOOKING_CREATED',
          entityType: 'Booking',
          entityId: booking.id,
          userId: session.userId,
          details: `Booking #${bookingNumber} recorded for Plot #${plot.plotNumber} by ${session.name}`,
        },
      });

      return booking;
    });

    return NextResponse.json({ success: true, booking: result }, { status: 201 });
  } catch (err: any) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: err.message || 'Transaction failed.' }, { status: 400 });
  }
}
