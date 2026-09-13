'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, formatDateTime, getLeadStatusBadgeClass } from '@/lib/utils';
import { PhoneCall, Calendar, Clock, User, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

const INITIAL_TODAYS_LEADS = [
  {
    id: 'lead_001_sunita',
    name: 'Sunita Sharma',
    mobile: '+91 98112 34567',
    status: 'INTERESTED',
    assignedUser: { name: 'Rahul Bisht' },
    interestedProject: { name: 'Riddhi Premium Plots' },
    nextFollowUpDate: new Date().toISOString(),
  },
  {
    id: 'lead_002_amitabh',
    name: 'Amitabh Sen',
    mobile: '+91 98200 54321',
    status: 'FOLLOW_UP',
    assignedUser: { name: 'Praful Singh' },
    interestedProject: { name: 'Riddhi Premium Plots' },
    nextFollowUpDate: new Date().toISOString(),
  },
];

const INITIAL_OVERDUE_LEADS = [
  {
    id: 'lead_003_vikram',
    name: 'Vikramaditya Chauhan',
    mobile: '+91 97180 98765',
    status: 'NEW',
    assignedUser: { name: 'Rahul Bisht' },
    interestedProject: { name: 'Riddhi Premium Plots' },
    nextFollowUpDate: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_UPCOMING_LEADS = [
  {
    id: 'lead_004_harishankar',
    name: 'Harishankar Meena',
    mobile: '+91 99280 12345',
    status: 'SITE_VISIT_SCHEDULED',
    assignedUser: { name: 'Praful Singh' },
    interestedProject: { name: 'Riddhi Premium Plots' },
    nextFollowUpDate: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
];

export default function AdminFollowUpsPage() {
  const [todaysLeads, setTodaysLeads] = useState<any[]>(INITIAL_TODAYS_LEADS);
  const [overdueLeads, setOverdueLeads] = useState<any[]>(INITIAL_OVERDUE_LEADS);
  const [upcomingLeads, setUpcomingLeads] = useState<any[]>(INITIAL_UPCOMING_LEADS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/leads?t=' + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const list = data?.leads || (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          const now = new Date();
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

          const todayList = list.filter((l: any) => {
            if (!l.nextFollowUpDate) return false;
            const d = new Date(l.nextFollowUpDate);
            return d >= startOfToday && d <= endOfToday;
          });
          const overdueList = list.filter((l: any) => {
            if (!l.nextFollowUpDate) return false;
            const d = new Date(l.nextFollowUpDate);
            return d < startOfToday && !['BOOKING', 'SOLD', 'LOST'].includes(l.status);
          });
          const upcomingList = list.filter((l: any) => {
            if (!l.nextFollowUpDate) return false;
            const d = new Date(l.nextFollowUpDate);
            return d > endOfToday;
          });

          if (todayList.length > 0) setTodaysLeads(todayList);
          if (overdueList.length > 0) setOverdueLeads(overdueList);
          if (upcomingList.length > 0) setUpcomingLeads(upcomingList);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Daily Follow-Up Call Queue</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Prioritize pending callbacks, schedule meetings, and maintain consistent investor engagement.
        </p>
      </div>

      {/* 3 Status Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Today's Queue */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#e0f2fe', borderRadius: '10px 10px 0 0', border: '1px solid #bae6fd' }}>
            <strong style={{ color: '#0369a1', fontSize: '1rem' }}>Today&apos;s Follow-Ups</strong>
            <span style={{ background: '#0284c7', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {todaysLeads.length}
            </span>
          </div>

          <div className="luxury-card" style={{ borderRadius: '0 0 10px 10px', padding: '1.25rem', borderTop: 'none', minHeight: '300px' }}>
            {todaysLeads.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                No follow-ups due today.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {todaysLeads.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        {l.name}
                      </Link>
                      <span className={getLeadStatusBadgeClass(l.status)}>{l.status}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                      Phone: <a href={`tel:${l.mobile}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{l.mobile}</a>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Assigned: <strong>{l.assignedUser?.name || 'Unassigned'}</strong> &bull; {l.interestedProject?.name || 'General'}
                    </div>
                    <Link href={`/admin/leads/${l.id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.45rem', fontSize: '0.8rem' }}>
                      Open &amp; Log Call
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overdue Queue */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#fee2e2', borderRadius: '10px 10px 0 0', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#991b1b', fontSize: '1rem' }}>Overdue Callbacks</strong>
            <span style={{ background: '#dc2626', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {overdueLeads.length}
            </span>
          </div>

          <div className="luxury-card" style={{ borderRadius: '0 0 10px 10px', padding: '1.25rem', borderTop: 'none', minHeight: '300px' }}>
            {overdueLeads.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                Zero overdue follow-ups!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {overdueLeads.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', background: '#fff1f2', borderRadius: '8px', border: '1px solid #ffe4e6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.95rem' }}>
                        {l.name}
                      </Link>
                      <span className={getLeadStatusBadgeClass(l.status)}>{l.status}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                      Phone: <a href={`tel:${l.mobile}`} style={{ color: '#991b1b', fontWeight: 600 }}>{l.mobile}</a>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Assigned: <strong>{l.assignedUser?.name || 'Unassigned'}</strong>
                    </div>
                    <Link href={`/admin/leads/${l.id}`} className="btn-secondary" style={{ display: 'block', textAlign: 'center', padding: '0.45rem', fontSize: '0.8rem', background: '#991b1b', color: '#ffffff' }}>
                      Action Immediately
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Queue */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#fef3c7', borderRadius: '10px 10px 0 0', border: '1px solid #fde68a' }}>
            <strong style={{ color: '#92400e', fontSize: '1rem' }}>Upcoming Pipeline</strong>
            <span style={{ background: '#d97706', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {upcomingLeads.length}
            </span>
          </div>

          <div className="luxury-card" style={{ borderRadius: '0 0 10px 10px', padding: '1.25rem', borderTop: 'none', minHeight: '300px' }}>
            {upcomingLeads.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                No future follow-ups scheduled yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcomingLeads.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        {l.name}
                      </Link>
                      <span className={getLeadStatusBadgeClass(l.status)}>{l.status}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                      Scheduled: <strong>{formatDate(l.nextFollowUpDate)}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Assigned: <strong>{l.assignedUser?.name || 'Unassigned'}</strong>
                    </div>
                    <Link href={`/admin/leads/${l.id}`} className="btn-outline-gold" style={{ display: 'block', textAlign: 'center', padding: '0.45rem', fontSize: '0.8rem' }}>
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
