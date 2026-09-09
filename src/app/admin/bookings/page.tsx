import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, ShieldCheck, Download, Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
      project: true,
      plot: true,
      salesUser: true,
    },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Official Bookings Ledger</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Permanent registry of plot allotments, customer token receipts, and sale agreements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/leads" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={16} /> New Booking from Lead
          </Link>
        </div>
      </div>

      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        {bookings.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>No bookings recorded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Booking No.</th>
                  <th>Customer Name</th>
                  <th>Contact</th>
                  <th>Project / Plot</th>
                  <th>Property Value</th>
                  <th>Booking Advance</th>
                  <th>Mode &amp; Ref</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                        {b.bookingNumber}
                      </strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.customer.name}</div>
                      {b.customer.city && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.customer.city}</div>}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      <a href={`tel:${b.customer.phone}`} style={{ color: 'var(--primary)' }}>{b.customer.phone}</a>
                    </td>
                    <td>
                      <div>{b.project.name}</div>
                      <div style={{ fontWeight: 700, color: 'var(--gold-deep)' }}>Plot #{b.plot.plotNumber}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--dark)' }}>
                      {formatCurrency(b.totalPropertyValue)}
                    </td>
                    <td style={{ fontWeight: 700, color: '#16a34a' }}>
                      {formatCurrency(b.bookingAmount)}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      <div>{b.paymentMode}</div>
                      {b.paymentReference && <div style={{ color: '#94a3b8' }}>Ref: {b.paymentReference}</div>}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {formatDate(b.bookingDate)}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: b.status === 'COMPLETED' ? '#dcfce7' : '#fef3c7',
                          color: b.status === 'COMPLETED' ? '#166534' : '#92400e',
                        }}
                      >
                        {b.status}
                      </span>
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
