import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatDate, formatDateTime, getLeadStatusBadgeClass } from '@/lib/utils';
import { PhoneCall, Calendar, Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminFollowUpsPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const [todaysLeads, overdueLeads, upcomingLeads] = await Promise.all([
    prisma.lead.findMany({
      where: {
        nextFollowUpDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      include: {
        assignedUser: { select: { name: true } },
        interestedProject: { select: { name: true } },
        followUps: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
    prisma.lead.findMany({
      where: {
        nextFollowUpDate: {
          lt: startOfToday,
        },
        status: { notIn: ['BOOKING', 'SOLD', 'LOST'] },
      },
      include: {
        assignedUser: { select: { name: true } },
        interestedProject: { select: { name: true } },
        followUps: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
    prisma.lead.findMany({
      where: {
        nextFollowUpDate: {
          gt: endOfToday,
        },
      },
      include: {
        assignedUser: { select: { name: true } },
        interestedProject: { select: { name: true } },
        followUps: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
  ]);

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
            <strong style={{ color: '#b91c1c', fontSize: '1rem' }}>Overdue Follow-Ups</strong>
            <span style={{ background: '#dc2626', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {overdueLeads.length}
            </span>
          </div>

          <div className="luxury-card" style={{ borderRadius: '0 0 10px 10px', padding: '1.25rem', borderTop: 'none', minHeight: '300px' }}>
            {overdueLeads.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                Great job! No overdue follow-up calls.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {overdueLeads.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 700, color: '#b91c1c', fontSize: '0.95rem' }}>
                        {l.name}
                      </Link>
                      <span className={getLeadStatusBadgeClass(l.status)}>{l.status}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>
                      Phone: <a href={`tel:${l.mobile}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{l.mobile}</a>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Was due: {formatDate(l.nextFollowUpDate)}
                    </div>
                    <Link href={`/admin/leads/${l.id}`} className="btn-teal" style={{ display: 'block', textAlign: 'center', padding: '0.45rem', fontSize: '0.8rem' }}>
                      Call Now &rarr;
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
            <strong style={{ color: '#92400e', fontSize: '1rem' }}>Scheduled Later</strong>
            <span style={{ background: '#d97706', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {upcomingLeads.length}
            </span>
          </div>

          <div className="luxury-card" style={{ borderRadius: '0 0 10px 10px', padding: '1.25rem', borderTop: 'none', minHeight: '300px' }}>
            {upcomingLeads.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                No upcoming follow-ups scheduled.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcomingLeads.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <Link href={`/admin/leads/${l.id}`} style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        {l.name}
                      </Link>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formatDate(l.nextFollowUpDate)}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Assigned: {l.assignedUser?.name || 'Unassigned'}
                    </div>
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
