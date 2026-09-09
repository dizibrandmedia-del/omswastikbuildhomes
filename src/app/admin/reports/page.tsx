import React from 'react';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, Download, PieChart, Users, Grid, TrendingUp } from 'lucide-react';

export const revalidate = 60;

export default async function AdminReportsPage() {
  const [
    totalPlots,
    availablePlots,
    holdPlots,
    bookedPlots,
    soldPlots,
    totalLeads,
    totalBookings,
    leadsBySource,
    salesUsers,
  ] = await Promise.all([
    prisma.plot.count(),
    prisma.plot.count({ where: { status: 'AVAILABLE' } }),
    prisma.plot.count({ where: { status: 'HOLD' } }),
    prisma.plot.count({ where: { status: 'BOOKED' } }),
    prisma.plot.count({ where: { status: 'SOLD' } }),
    prisma.lead.count(),
    prisma.booking.count(),
    prisma.lead.groupBy({
      by: ['leadSource'],
      _count: { id: true },
    }),
    prisma.user.findMany({
      where: { role: { in: ['SALES_EXECUTIVE', 'SALES_MANAGER', 'ADMIN'] } },
      include: {
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

  const allocatedPercentage = totalPlots > 0 ? Math.round(((bookedPlots + soldPlots) / totalPlots) * 100) : 0;
  const availablePercentage = totalPlots > 0 ? Math.round((availablePlots / totalPlots) * 100) : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Business Analytics &amp; Reports</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Executive reports on inventory absorption, customer acquisition channels, and sales performance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/api/reports?format=csv&type=inventory"
            download
            className="btn-outline-gold"
            style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} /> Export Inventory CSV
          </a>
          <a
            href="/api/reports?format=csv&type=leads"
            download
            className="btn-primary"
            style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} /> Export Leads CSV
          </a>
        </div>
      </div>

      {/* Two Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Inventory Absorption Card */}
        <div className="luxury-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Grid size={18} style={{ color: 'var(--gold-deep)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
              Plot Inventory Absorption
            </h3>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>Inventory Absorption Rate</span>
              <strong>{allocatedPercentage}% Allotted</strong>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${(availablePlots / totalPlots) * 100}%`, background: '#10b981' }} title="Available" />
              <div style={{ width: `${(holdPlots / totalPlots) * 100}%`, background: '#f59e0b' }} title="Hold" />
              <div style={{ width: `${((bookedPlots + soldPlots) / totalPlots) * 100}%`, background: '#ef4444' }} title="Booked / Sold" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.75rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ color: '#166534', fontWeight: 600 }}>Available Units</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#15803d' }}>{availablePlots}</div>
            </div>

            <div style={{ padding: '0.75rem', background: '#fefce8', borderRadius: '8px', border: '1px solid #fef08a' }}>
              <div style={{ color: '#854d0e', fontWeight: 600 }}>Temporary Hold</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a16207' }}>{holdPlots}</div>
            </div>

            <div style={{ padding: '0.75rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ color: '#991b1b', fontWeight: 600 }}>Booked Units</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#b91c1c' }}>{bookedPlots}</div>
            </div>

            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#475569', fontWeight: 600 }}>Fully Sold / Deed</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>{soldPlots}</div>
            </div>
          </div>
        </div>

        {/* Acquisition Channel Breakdown */}
        <div className="luxury-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
              Lead Sources Breakdown
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {leadsBySource.map((s) => {
              const pct = totalLeads > 0 ? Math.round((s._count.id / totalLeads) * 100) : 0;
              return (
                <div key={s.leadSource}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>{s.leadSource}</span>
                    <span style={{ color: '#64748b' }}>{s._count.id} leads ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sales Team Velocity & Performance Table */}
      <div className="luxury-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Users size={18} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
            Sales Executive &amp; Director Activity Performance
          </h3>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Executive Name</th>
                <th>Role</th>
                <th>Assigned Leads</th>
                <th>Follow-Up Calls Logged</th>
                <th>Site Visits Conducted</th>
                <th>Bookings Closed</th>
                <th>Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {salesUsers.map((u) => {
                const assigned = u._count.assignedLeads;
                const closed = u._count.bookingsClosed;
                const convRate = assigned > 0 ? Math.round((closed / assigned) * 100) : 0;

                return (
                  <tr key={u.id}>
                    <td>
                      <strong style={{ color: 'var(--primary-dark)' }}>{u.name}</strong>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.role.replace('_', ' ')}</td>
                    <td style={{ fontWeight: 600 }}>{assigned}</td>
                    <td>{u._count.followUps}</td>
                    <td>{u._count.siteVisits}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{closed}</td>
                    <td>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '0.8rem' }}>
                        {convRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
