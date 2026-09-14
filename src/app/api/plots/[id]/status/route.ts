import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  const session = getSessionUser(req);
  if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
    return NextResponse.json({ error: 'Unauthorized to change plot inventory status.' }, { status: 403 });
  }

  const { id } = await params;
  const { status, remarks } = await req.json();

  const validStatuses = ['AVAILABLE', 'HOLD', 'BOOKED', 'SOLD', 'BLOCKED'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid plot status.' }, { status: 400 });
  }

  const existing = await prisma.plot.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Plot not found' }, { status: 404 });
  }

  // If plot is already SOLD, only Super Admin can revert to available
  if (existing.status === 'SOLD' && status !== 'SOLD' && session.role !== 'SUPER_ADMIN') {
    return NextResponse.json(
      { error: 'Only Super Admin can revert a SOLD plot.' },
      { status: 403 }
    );
  }

  const updated = await prisma.plot.update({
    where: { id },
    data: {
      status,
      remarks: remarks !== undefined ? remarks : existing.remarks,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: 'PLOT_STATUS_CHANGED',
      entityType: 'Plot',
      entityId: id,
      userId: session.userId,
      previousValue: existing.status,
      newValue: status,
      details: `Plot #${existing.plotNumber} status changed from ${existing.status} to ${status} by ${session.name}`,
    },
  });

  try {
    revalidatePath('/');
    revalidatePath('/plots');
    revalidatePath('/admin/inventory');
    revalidatePath(`/plots/${id}`);
  } catch (e) {
    console.error('Revalidation error:', e);
  }

  return NextResponse.json(
    { success: true, plot: updated },
    { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
  );
}

