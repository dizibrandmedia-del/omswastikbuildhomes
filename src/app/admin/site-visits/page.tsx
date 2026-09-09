import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Calendar, Phone, MapPin, CheckCircle, Clock } from 'lucide-react';

export const revalidate = 60;

export default async function AdminSiteVisitsPage() {
  const siteVisits = await prisma.siteVisit.findMany({
    orderBy: { visitDate: 'desc' },
    include: {
      lead: true,
      project: true,
      plot: true,
      assignedUser: true,
    },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Site Visit Coordination</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Schedule and verify physical site inspections in Dholera Special Investment Region.
          </p>
        </div>
      </div>

      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        {siteVisits.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>No site visits registered.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Project / Plot</th>
                  <th>Scheduled Date</th>
                  <th>Slot</th>
                  <th>Assigned Executive</th>
                  <th>Status</th>
                  <th>Remarks / Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {siteVisits.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <Link href={`/admin/leads/${v.leadId}`} style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        {v.lead.name}
                      </Link>
                    </td>
                    <td>
                      <a href={`tel:${v.lead.mobile}`} style={{ color: 'var(--primary)', fontWeight: 500 }}>
                        {v.lead.mobile}
                      </a>
                    </td>
                    <td>
                      {v.project.name}
                      {v.plot && <span style={{ color: 'var(--gold-deep)', fontWeight: 600 }}> (Plot #{v.plot.plotNumber})</span>}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--dark)' }}>
                      {formatDate(v.visitDate)}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{v.visitTime || 'Morning'}</td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{v.assignedUser?.name || 'Unassigned'}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: v.status === 'COMPLETED' ? '#dcfce7' : v.status === 'CONFIRMED' ? '#e0f2fe' : '#fef3c7',
                          color: v.status === 'COMPLETED' ? '#166534' : v.status === 'CONFIRMED' ? '#0369a1' : '#92400e',
                        }}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '200px' }}>
                      {v.remarks || '-'}
                    </td>
                    <td>
                      <Link href={`/admin/leads/${v.leadId}`} className="btn-outline-gold" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
