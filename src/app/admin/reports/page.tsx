'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, Download, PieChart, Users, Grid, TrendingUp } from 'lucide-react';

export default function AdminReportsPage() {
  const [data, setData] = useState({
    totalPlots: 69,
    availablePlots: 55,
    holdPlots: 8,
    bookedPlots: 6,
    soldPlots: 0,
    totalLeads: 11,
    totalBookings: 2,
    leadsBySource: [
      { leadSource: 'WEBSITE', _count: { id: 5 } },
      { leadSource: 'GOOGLE_ADS', _count: { id: 3 } },
      { leadSource: 'LANDING_PAGE', _count: { id: 2 } },
      { leadSource: 'DIRECT_CALL', _count: { id: 1 } },
    ],
    salesUsers: [
      {
        id: 'user-1',
        name: 'Rahul Bisht',
        role: 'ADMIN',
        _count: { assignedLeads: 6, followUps: 8, siteVisits: 3, bookingsClosed: 1 },
      },
      {
        id: 'user-2',
        name: 'Praful Singh',
        role: 'SALES_MANAGER',
        _count: { assignedLeads: 5, followUps: 7, siteVisits: 2, bookingsClosed: 1 },
      },
    ],
  });

  useEffect(() => {
    fetch('/api/reports?t=' + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((resData) => {
        if (resData && resData.totalPlots) {
          setData(resData);
        }
      })
      .catch(() => {});
  }, []);

  const { totalPlots, availablePlots, holdPlots, bookedPlots, soldPlots, totalLeads, totalBookings, leadsBySource, salesUsers } = data;
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
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981' }} />
                <span>Available ({availablePlots})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b' }} />
                <span>On Hold ({holdPlots})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444' }} />
                <span>Allotted ({bookedPlots + soldPlots})</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Estimated Layout GMV</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>
                ₹{((totalPlots * 2600000) / 10000000).toFixed(2)} Cr
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Bookings In Flow</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                {totalBookings} Registered
              </div>
            </div>
          </div>
        </div>

        {/* Lead Sources Distribution */}
        <div className="luxury-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <PieChart size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
              Lead Acquisition Channels
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {leadsBySource.map((ls: any) => {
              const count = ls._count?.id || 0;
              const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div key={ls.leadSource}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>{ls.leadSource}</span>
                    <span style={{ color: '#64748b' }}>{count} leads ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sales Team Performance Leaderboard */}
      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Users size={18} style={{ color: 'var(--gold-deep)' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
            Sales Executive Activity Leaderboard
          </h3>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Executive Name</th>
                <th>Role</th>
                <th>Assigned Leads</th>
                <th>Calls Logged</th>
                <th>Site Visits Conducted</th>
                <th>Bookings Closed</th>
              </tr>
            </thead>
            <tbody>
              {salesUsers.map((u: any) => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td><span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{u.role}</span></td>
                  <td>{u._count.assignedLeads}</td>
                  <td>{u._count.followUps}</td>
                  <td>{u._count.siteVisits}</td>
                  <td><strong style={{ color: '#16a34a' }}>{u._count.bookingsClosed}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
