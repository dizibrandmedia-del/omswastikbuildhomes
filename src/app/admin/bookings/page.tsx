'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, ShieldCheck, Download, Plus, RefreshCw } from 'lucide-react';

const INITIAL_BOOKINGS = [
  {
    id: 'bkg-1',
    bookingNumber: 'OSB-2026-001',
    customer: { name: 'Sunita Sharma', phone: '+91 98112 34567', city: 'Delhi' },
    project: { name: 'Riddhi Premium Plots' },
    plot: { plotNumber: '10' },
    totalPropertyValue: 2600000,
    bookingAmount: 51000,
    paymentMode: 'NEFT / IMPS',
    paymentReference: 'UTR9876543210',
    bookingDate: new Date().toISOString(),
    status: 'CONFIRMED',
  },
  {
    id: 'bkg-2',
    bookingNumber: 'OSB-2026-002',
    customer: { name: 'Amitabh Sen', phone: '+91 98200 54321', city: 'Mumbai' },
    project: { name: 'Riddhi Premium Plots' },
    plot: { plotNumber: '25' },
    totalPropertyValue: 2600000,
    bookingAmount: 51000,
    paymentMode: 'UPI',
    paymentReference: 'UPI/2026/87654',
    bookingDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'COMPLETED',
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>(INITIAL_BOOKINGS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/bookings?t=' + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.bookings && Array.isArray(data.bookings) && data.bookings.length > 0) {
          setBookings(data.bookings);
        }
      })
      .catch(() => {});
  }, []);

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
                      <div style={{ fontWeight: 600 }}>{b.customer?.name || 'Customer'}</div>
                      {b.customer?.city && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.customer.city}</div>}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      <a href={`tel:${b.customer?.phone || ''}`} style={{ color: 'var(--primary)' }}>{b.customer?.phone || '-'}</a>
                    </td>
                    <td>
                      <div>{b.project?.name || 'Riddhi'}</div>
                      <div style={{ fontWeight: 700, color: 'var(--gold-deep)' }}>Plot #{b.plot?.plotNumber || '-'}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--dark)' }}>
                      {formatCurrency(b.totalPropertyValue || 2600000)}
                    </td>
                    <td style={{ fontWeight: 700, color: '#16a34a' }}>
                      {formatCurrency(b.bookingAmount || 51000)}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      <div>{b.paymentMode || 'Online'}</div>
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
                        {b.status || 'CONFIRMED'}
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
