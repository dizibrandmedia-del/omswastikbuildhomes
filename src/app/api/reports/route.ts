import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
    return NextResponse.json({ error: 'Unauthorized to access business reports.' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');
  const type = searchParams.get('type');

  // CSV Export Handler
  if (format === 'csv') {
    if (type === 'inventory') {
      const plots = await prisma.plot.findMany({
        include: { project: { select: { name: true } } },
        orderBy: { plotNumber: 'asc' },
      });

      const header = 'Plot Number,Project,Size (Sq Yd),Size (Sq Ft),Facing,Road Width,Status,Price,Rate/SqYd\n';
      const rows = plots
        .map(
          (p) =>
            `"${p.plotNumber}","${p.project.name}",${p.sizeSqYd},${p.sizeSqFt},"${p.facing}",${p.roadWidthFt},"${p.status}",${p.priceTotal},${p.pricePerUnit}`
        )
        .join('\n');

      return new NextResponse(header + rows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="omswastik_plot_inventory.csv"',
        },
      });
    }

    if (type === 'leads') {
      const leads = await prisma.lead.findMany({
        include: {
          assignedUser: { select: { name: true } },
          interestedProject: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      const header = 'Lead Name,Mobile,Email,Project,Source,Status,Assigned Executive,Created Date\n';
      const rows = leads
        .map(
          (l) =>
            `"${l.name}","${l.mobile}","${l.email || ''}","${l.interestedProject?.name || 'General'}","${l.leadSource}","${l.status}","${l.assignedUser?.name || 'Unassigned'}","${l.createdAt.toISOString().split('T')[0]}"`
        )
        .join('\n');

      return new NextResponse(header + rows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="omswastik_leads_report.csv"',
        },
      });
    }
  }

  // JSON Metrics Compilation
  const [
    totalProjects,
    totalPlots,
    availablePlots,
    holdPlots,
    bookedPlots,
    soldPlots,
    totalLeads,
    newLeads,
    followupLeads,
    visitLeads,
    totalBookings,
    totalCustomers,
    leadsBySource,
    salesUsers,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.plot.count(),
    prisma.plot.count({ where: { status: 'AVAILABLE' } }),
    prisma.plot.count({ where: { status: 'HOLD' } }),
    prisma.plot.count({ where: { status: 'BOOKED' } }),
    prisma.plot.count({ where: { status: 'SOLD' } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'FOLLOW_UP' } }),
    prisma.lead.count({ where: { status: { in: ['SITE_VISIT_SCHEDULED', 'SITE_VISIT_DONE'] } } }),
    prisma.booking.count(),
    prisma.customer.count(),
    prisma.lead.groupBy({
      by: ['leadSource'],
      _count: { id: true },
    }),
    prisma.user.findMany({
      where: { role: { in: ['SALES_EXECUTIVE', 'SALES_MANAGER', 'ADMIN'] } },
      select: {
        id: true,
        name: true,
        role: true,
        _count: {
          select: {
            assignedLeads: true,
            followUps: true,
            siteVisits: true,
            bookingsClosed: true,
          },
        },
      },
    }),
  ]);

  return NextResponse.json({
    metrics: {
      totalProjects,
      totalPlots,
      availablePlots,
      holdPlots,
      bookedPlots,
      soldPlots,
      totalLeads,
      newLeads,
      followupLeads,
      visitLeads,
      totalBookings,
      totalCustomers,
    },
    leadsBySource,
    salesTeamPerformance: salesUsers,
  });
}
