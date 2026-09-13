'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDate, getPlotStatusBadgeClass, getLeadStatusBadgeClass } from '@/lib/utils';
import {
  Users,
  Grid,
  PhoneCall,
  Calendar,
  FileText,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 1,
    totalPlots: 69,
    availablePlots: 55,
    holdPlots: 8,
    bookedPlots: 6,
    soldPlots: 0,
    totalLeads: 11,
    newLeads: 4,
    totalBookings: 2,
  });

  const [upcomingVisits, setUpcomingVisits] = useState<any[]>([
    {
      id: 'sv-1',
      visitDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      visitTime: 'Morning (10:30 AM)',
      lead: { name: 'Sunita Sharma', mobile: '+91 98112 34567' },
      project: { name: 'Riddhi Premium Plots' },
      assignedUser: { name: 'Rahul Bisht' },
    },
    {
      id: 'sv-2',
      visitDate: new Date(Date.now() + 86400000 * 4).toISOString(),
      visitTime: 'Afternoon (02:00 PM)',
      lead: { name: 'Amitabh Sen', mobile: '+91 98200 54321' },
      project: { name: 'Riddhi Premium Plots' },
      assignedUser: { name: 'Praful Singh' },
    },
  ]);

  const [todaysFollowUps, setTodaysFollowUps] = useState<any[]>([
    {
      id: 'fu-1',
      lead: { name: 'Vikramaditya Chauhan' },
      user: { name: 'Rahul Bisht' },
      remarks: 'Customer reviewed brochure and requested pricing breakdown for 200 Sq. Yd. plot.',
      nextAction: 'Send Allotment Cost Sheet via WhatsApp',
    },
    {
      id: 'fu-2',
      lead: { name: 'Harishankar Meena' },
      user: { name: 'Praful Singh' },
      remarks: 'Wants to schedule a site inspection this upcoming Saturday.',
      nextAction: 'Confirm cab pickup schedule',
    },
  ]);

  const [recentLeads, setRecentLeads] = useState<any[]>([
    {
      id: 'lead_001_sunita',
      name: 'Sunita Sharma',
      mobile: '+91 98112 34567',
      leadSource: 'WEBSITE',
      status: 'INTERESTED',
      interestedProject: { name: 'Riddhi Premium Plots' },
      interestedPlot: { plotNumber: '10' },
      assignedUser: { name: 'Rahul Bisht' },
      createdAt: new Date().toISOString(),
    },
    {
      id: 'lead_002_amitabh',
      name: 'Amitabh Sen',
      mobile: '+91 98200 54321',
      leadSource: 'GOOGLE_ADS',
      status: 'FOLLOW_UP',
      interestedProject: { name: 'Riddhi Premium Plots' },
      interestedPlot: { plotNumber: '25' },
      assignedUser: { name: 'Praful Singh' },
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'lead_003_vikram',
      name: 'Vikramaditya Chauhan',
      mobile: '+91 97180 98765',
      leadSource: 'LANDING_PAGE',
      status: 'NEW',
      interestedProject: { name: 'Riddhi Premium Plots' },
      interestedPlot: { plotNumber: '32' },
      assignedUser: { name: 'Rahul Bisht' },
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLiveDashboard = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch plots to calculate live inventory KPI
      const plotRes = await fetch('/api/plots?t=' + Date.now());
      if (plotRes.ok) {
        const pData = await plotRes.json();
        const pList = pData?.plots || (Array.isArray(pData) ? pData : []);
        if (pList.length > 0) {
          const avail = pList.filter((p: any) => p.status === 'AVAILABLE').length;
          const hold = pList.filter((p: any) => p.status === 'HOLD').length;
          const booked = pList.filter((p: any) => p.status === 'BOOKED').length;
          const sold = pList.filter((p: any) => p.status === 'SOLD').length;
          setStats((prev) => ({
            ...prev,
            totalPlots: pList.length,
            availablePlots: avail,
            holdPlots: hold,
            bookedPlots: booked,
            soldPlots: sold,
          }));
        }
      }

      // 2. Fetch leads
      const leadRes = await fetch('/api/leads?t=' + Date.now());
      if (leadRes.ok) {
        const lData = await leadRes.json();
        const lList = lData?.leads || (Array.isArray(lData) ? lData : []);
        if (lList.length > 0) {
          const newCount = lList.filter((l: any) => l.status === 'NEW').length;
          setStats((prev) => ({
            ...prev,
            totalLeads: lList.length,
            newLeads: newCount,
          }));
          setRecentLeads(lList.slice(0, 6));
        }
      }
    } catch (e) {
      console.warn('Live dashboard fetch error, using resilient fallback data:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveDashboard();
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Executive Management Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Real-time operations, plot inventory status, and sales team velocity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={fetchLiveDashboard}
            disabled={isRefreshing}
            className="btn-outline-gold"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Syncing...' : 'Sync Live Data'}
          </button>
          <Link href="/admin/leads" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
            <Plus size={16} /> Manage Leads
          </Link>
          <Link href="/admin/inventory" className="btn-teal" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
            <Grid size={16} /> Plot Inventory
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* Total Plots */}
        <div className="luxury-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>Total Plots</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                {stats.totalPlots}
              </div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Grid size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.5rem', fontWeight: 600 }}>
            {stats.availablePlots} Available for Allotment
          </div>
        </div>

        {/* Available Plots */}
        <div className="luxury-card" style={{ padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#166534', fontWeight: 600 }}>Available Plots</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#15803d', fontFamily: 'var(--font-heading)' }}>
                {stats.availablePlots}
              </div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            {stats.holdPlots} on temporary hold
          </div>
        </div>

        {/* Leads in Pipeline */}
        <div className="luxury-card" style={{ padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#1e40af', fontWeight: 600 }}>Active Leads</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1d4ed8', fontFamily: 'var(--font-heading)' }}>
                {stats.totalLeads}
              </div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.5rem', fontWeight: 600 }}>
            {stats.newLeads} new inquiries pending
          </div>
        </div>

        {/* Bookings */}
        <div className="luxury-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-deep)', fontWeight: 600 }}>Total Bookings</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                {stats.totalBookings}
              </div>
            </div>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(228, 170, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)' }}>
              <FileText size={20} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            {stats.soldPlots} plots deed completed
          </div>
        </div>
      </div>

      {/* Two Column Operational Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Upcoming Site Visits */}
        <div className="luxury-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Upcoming Site Visits</h3>
            </div>
            <Link href="/admin/site-visits" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              View All &rarr;
            </Link>
          </div>

          {upcomingVisits.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '1rem 0' }}>No site visits scheduled currently.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  style={{
                    padding: '0.85rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.9rem' }}>{visit.lead?.name || 'Customer'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{visit.lead?.mobile || ''} &bull; {visit.project?.name || 'Riddhi'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                      Staff: {visit.assignedUser?.name || 'Unassigned'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {formatDate(visit.visitDate)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{visit.visitTime || 'Morning'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Follow-ups Logged */}
        <div className="luxury-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PhoneCall size={18} style={{ color: 'var(--gold-deep)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Recent Follow-Up Activity</h3>
            </div>
            <Link href="/admin/follow-ups" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              View Queue &rarr;
            </Link>
          </div>

          {todaysFollowUps.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '1rem 0' }}>No follow-up calls logged yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {todaysFollowUps.map((fu) => (
                <div
                  key={fu.id}
                  style={{
                    padding: '0.85rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--dark)' }}>{fu.lead?.name || 'Customer'}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>By {fu.user?.name || 'Sales Staff'}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.25rem 0' }}>
                    &ldquo;{fu.remarks}&rdquo;
                  </p>
                  {fu.nextAction && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                      Next Action: {fu.nextAction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads Inquiries Table */}
      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>Recent Customer Enquiries</h3>
          <Link href="/admin/leads" className="btn-outline-gold" style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}>
            Open Lead Pipeline
          </Link>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Project / Plot</th>
                <th>Source</th>
                <th>Assigned Executive</th>
                <th>Status</th>
                <th>Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <Link href={`/admin/leads/${lead.id}`} style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      {lead.name}
                    </Link>
                  </td>
                  <td>{lead.mobile}</td>
                  <td>
                    {lead.interestedProject?.name || 'General'}{' '}
                    {lead.interestedPlot && <span style={{ color: 'var(--gold-deep)', fontWeight: 600 }}>(Plot #{lead.interestedPlot.plotNumber})</span>}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {lead.leadSource || 'WEBSITE'}
                    </span>
                  </td>
                  <td>{lead.assignedUser?.name || 'Unassigned'}</td>
                  <td>
                    <span className={getLeadStatusBadgeClass(lead.status)}>{lead.status}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{formatDate(lead.createdAt)}</td>
                  <td>
                    <Link href={`/admin/leads/${lead.id}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                      Manage &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
