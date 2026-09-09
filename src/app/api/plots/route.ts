import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  const status = searchParams.get('status');

  const whereClause: any = {};
  if (projectId && projectId !== 'ALL') whereClause.projectId = projectId;
  if (status && status !== 'ALL') whereClause.status = status;

  const plots = await prisma.plot.findMany({
    where: whereClause,
    orderBy: { plotNumber: 'asc' },
    include: {
      project: { select: { id: true, name: true, location: true } },
    },
  });

  return NextResponse.json({ plots });
}

export async function POST(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ error: 'Unauthorized to add inventory.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      plotNumber,
      projectId,
      sizeSqYd,
      facing = 'EAST',
      roadWidthFt = 30,
      isCorner = false,
      isParkFacing = false,
      isMainRoadFacing = false,
      pricePerUnit,
      bookingAmount = 51000,
      remarks,
    } = body;

    if (!plotNumber || !projectId || !sizeSqYd || !pricePerUnit) {
      return NextResponse.json(
        { error: 'Plot number, project, size and price are required.' },
        { status: 400 }
      );
    }

    // Duplicate prevention
    const existing = await prisma.plot.findUnique({
      where: {
        projectId_plotNumber: {
          projectId,
          plotNumber: plotNumber.trim(),
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Plot #${plotNumber} already exists in this project.` },
        { status: 409 }
      );
    }

    const sizeSqFt = sizeSqYd * 9;
    const priceTotal = sizeSqYd * pricePerUnit;

    const plot = await prisma.plot.create({
      data: {
        plotNumber: plotNumber.trim(),
        projectId,
        sizeSqYd: parseFloat(sizeSqYd),
        sizeSqFt: sizeSqFt,
        facing,
        roadWidthFt: parseFloat(roadWidthFt),
        isCorner: Boolean(isCorner),
        isParkFacing: Boolean(isParkFacing),
        isMainRoadFacing: Boolean(isMainRoadFacing),
        priceTotal,
        pricePerUnit: parseFloat(pricePerUnit),
        bookingAmount: parseFloat(bookingAmount),
        status: 'AVAILABLE',
        remarks: remarks || null,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'PLOT_CREATED',
        entityType: 'Plot',
        entityId: plot.id,
        userId: session.userId,
        details: `Plot #${plot.plotNumber} created by ${session.name}`,
      },
    });

    return NextResponse.json({ success: true, plot }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
