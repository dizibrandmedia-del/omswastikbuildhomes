'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate, formatDateTime, getLeadStatusBadgeClass } from '@/lib/utils';
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Plus,
  CheckCircle2,
  FileText,
  AlertCircle,
  Loader2,
  MessageCircle,
  History
} from 'lucide-react';

import initialLeads from '@/lib/initialLeads.json';

export default function LeadDetailClient({ id }: { id: string }) {
  const router = useRouter();

  const [lead, setLead] = useState<any>(() => {
    return initialLeads.find((l: any) => l.id === id) || initialLeads[0];
  });
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState<any[]>([
    { id: 'usr_admin', name: 'Super Admin', role: 'SUPER_ADMIN' },
    { id: 'usr_rahul', name: 'Rahul Bisht', role: 'ADMIN' },
    { id: 'usr_praful', name: 'Praful Singh', role: 'SALES_MANAGER' },
    { id: 'usr_santosh', name: 'Santosh Gupta', role: 'SALES_EXECUTIVE' },
  ]);

  // Modals
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Follow-up form
  const [followUpData, setFollowUpData] = useState({
    callStatus: 'ANSWERED',
    remarks: '',
    customerRequirement: '',
    nextAction: '',
    nextFollowUpDate: '',
    leadStatus: 'FOLLOW_UP',
  });

  // Site visit form
  const [visitData, setVisitData] = useState({
    visitDate: '',
    visitTime: 'Morning (10:00 AM - 1:00 PM)',
    remarks: '',
  });

  // Booking form
  const [bookingData, setBookingData] = useState({
    bookingAmount: 51000,
    paymentMode: 'CHEQUE',
    paymentReference: '',
    panNumber: '',
    fullAddress: '',
    remarks: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const fetchLeadDetails = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.lead) setLead(data.lead);
      }

      // Also fetch sales team
      const reportRes = await fetch('/api/reports');
      if (reportRes.ok) {
        const reportData = await reportRes.json();
        if (reportData.salesTeamPerformance) {
          setTeam(reportData.salesTeamPerformance);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchLeadDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssigneeChange = async (newUserId: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedUserId: newUserId }),
      });
      if (res.ok) fetchLeadDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/leads/${id}/followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(followUpData),
      });
      if (res.ok) {
        setIsFollowUpModalOpen(false);
        setFollowUpData({
          callStatus: 'ANSWERED',
          remarks: '',
          customerRequirement: '',
          nextAction: '',
          nextFollowUpDate: '',
          leadStatus: 'FOLLOW_UP',
        });
        fetchLeadDetails();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/leads/${id}/sitevisit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...visitData,
          projectId: lead.interestedProjectId || 'cmtttzn7g0004v1e858pzpnl9',
          plotId: lead.interestedPlotId || null,
        }),
      });
      if (res.ok) {
        setIsVisitModalOpen(false);
        setVisitData({ visitDate: '', visitTime: 'Morning (10:00 AM - 1:00 PM)', remarks: '' });
        fetchLeadDetails();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          customerName: lead.name,
          customerPhone: lead.mobile,
          customerEmail: lead.email,
          panNumber: bookingData.panNumber,
          fullAddress: bookingData.fullAddress,
          projectId: lead.interestedProjectId,
          plotId: lead.interestedPlotId,
          bookingAmount: bookingData.bookingAmount,
          paymentMode: bookingData.paymentMode,
          paymentReference: bookingData.paymentReference,
          remarks: bookingData.remarks,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create booking.');
      } else {
        alert(`Booking #${data.booking.bookingNumber} created successfully! Plot status is now BOOKED.`);
        setIsBookingModalOpen(false);
        fetchLeadDetails();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
        <p style={{ color: '#64748b' }}>Loading customer profile &amp; activity history...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div>
        <p>Lead not found.</p>
        <Link href="/admin/leads">&larr; Back to Leads</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Navigation */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          href="/admin/leads"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--primary)',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          <ArrowLeft size={16} /> Back to Lead Pipeline
        </Link>
      </div>

      {/* Top Profile Header */}
      <div
        className="luxury-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', margin: 0 }}>{lead.name}</h1>
            <span className={getLeadStatusBadgeClass(lead.status)} style={{ fontSize: '0.85rem' }}>
              {lead.status}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', color: '#64748b', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} style={{ color: 'var(--primary)' }} />
              <a href={`tel:${lead.mobile}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{lead.mobile}</a>
            </span>
            {lead.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Mail size={14} style={{ color: 'var(--primary)' }} />
                <span>{lead.email}</span>
              </span>
            )}
            <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Source: {lead.leadSource}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Created: {formatDate(lead.createdAt)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => setIsFollowUpModalOpen(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            <Phone size={15} /> Log Call Follow-Up
          </button>
          <button onClick={() => setIsVisitModalOpen(true)} className="btn-teal" style={{ fontSize: '0.85rem' }}>
            <Calendar size={15} /> Schedule Visit
          </button>
          {lead.interestedPlotId && lead.status !== 'BOOKING' && lead.status !== 'SOLD' && (
            <button onClick={() => setIsBookingModalOpen(true)} className="btn-outline-gold" style={{ fontSize: '0.85rem' }}>
              <FileText size={15} /> Convert to Booking
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Details + Actions + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Requirements & Status Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Status & Assignment Card */}
          <div className="luxury-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>
              Pipeline Status &amp; Assignment
            </h3>

            <div className="form-group">
              <label className="form-label">Update Lead Stage</label>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="form-select"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="INTERESTED">INTERESTED</option>
                <option value="FOLLOW_UP">FOLLOW UP</option>
                <option value="SITE_VISIT_SCHEDULED">SITE VISIT SCHEDULED</option>
                <option value="SITE_VISIT_DONE">SITE VISIT DONE</option>
                <option value="NEGOTIATION">NEGOTIATION</option>
                <option value="BOOKING">BOOKING INITIATED</option>
                <option value="SOLD">SOLD</option>
                <option value="LOST">LOST</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Sales Executive</label>
              <select
                value={lead.assignedUserId || ''}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                className="form-select"
              >
                <option value="">Unassigned</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Interests Card */}
          <div className="luxury-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Property Preferences
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#64748b' }}>Interested Project: </span>
                <strong>{lead.interestedProject?.name || 'General Inquiry'}</strong>
              </div>

              {lead.interestedPlot && (
                <div>
                  <span style={{ color: '#64748b' }}>Interested Plot: </span>
                  <Link href={`/plots/${lead.interestedPlot.id}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    Plot #{lead.interestedPlot.plotNumber} ({lead.interestedPlot.sizeSqYd} Sq. Yd.)
                  </Link>
                </div>
              )}

              <div>
                <span style={{ color: '#64748b' }}>Budget Indication: </span>
                <strong>{lead.budget || 'Not specified'}</strong>
              </div>

              {lead.requirement && (
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Customer Requirement:</span>
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155' }}>
                    {lead.requirement}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Follow-up Timeline & Activity History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Follow-up Calls */}
          <div className="luxury-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Follow-Up Call Log</h3>
              <button
                onClick={() => setIsFollowUpModalOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                + Add Call
              </button>
            </div>

            {(!lead.followUps || lead.followUps.length === 0) ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No calls logged yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {lead.followUps.map((f: any) => (
                  <div key={f.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
                        Status: {f.callStatus}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {formatDateTime(f.createdAt)} by {f.user?.name || 'Executive'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem' }}>
                      &ldquo;{f.remarks}&rdquo;
                    </p>
                    {f.nextAction && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                        Next: {f.nextAction}{' '}
                        {f.nextFollowUpDate && `(${formatDate(f.nextFollowUpDate)})`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log / History */}
          <div className="luxury-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <History size={18} style={{ color: 'var(--gold-deep)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Activity Audit Trail</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(lead.activityLogs || []).map((log: any) => (
                <div key={log.id} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.825rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold)', marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#334155', fontWeight: 500 }}>{log.details || log.action}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{formatDateTime(log.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up Modal */}
      {isFollowUpModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFollowUpModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Log Follow-Up Call
            </h3>
            <form onSubmit={handleSaveFollowUp}>
              <div className="form-group">
                <label className="form-label">Call Response</label>
                <select
                  className="form-select"
                  value={followUpData.callStatus}
                  onChange={(e) => setFollowUpData({ ...followUpData, callStatus: e.target.value })}
                >
                  <option value="ANSWERED">Answered &amp; Discussed</option>
                  <option value="CALLBACK_REQUESTED">Callback Requested</option>
                  <option value="UNANSWERED">Ringing / Not Answered</option>
                  <option value="BUSY">Busy</option>
                  <option value="WRONG_NUMBER">Wrong Number</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Call Discussion Remarks *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record customer reaction, objections, or plot preferences discussed..."
                  className="form-textarea"
                  value={followUpData.remarks}
                  onChange={(e) => setFollowUpData({ ...followUpData, remarks: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Next Action</label>
                <input
                  type="text"
                  placeholder="e.g. Send site layout on WhatsApp / Follow up on Friday"
                  className="form-input"
                  value={followUpData.nextAction}
                  onChange={(e) => setFollowUpData({ ...followUpData, nextAction: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Next Follow-Up Date</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={followUpData.nextFollowUpDate}
                  onChange={(e) => setFollowUpData({ ...followUpData, nextFollowUpDate: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsFollowUpModalOpen(false)} className="btn-secondary" style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
                  {submitting ? 'Saving...' : 'Save Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Site Visit Modal */}
      {isVisitModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVisitModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Schedule Site Visit
            </h3>
            <form onSubmit={handleSaveVisit}>
              <div className="form-group">
                <label className="form-label">Visit Date *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="form-input"
                  value={visitData.visitDate}
                  onChange={(e) => setVisitData({ ...visitData, visitDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <select
                  className="form-select"
                  value={visitData.visitTime}
                  onChange={(e) => setVisitData({ ...visitData, visitTime: e.target.value })}
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10 AM - 1 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1 PM - 4 PM)</option>
                  <option value="Evening (4:00 PM - 6:00 PM)">Evening (4 PM - 6 PM)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Transport arrangements, family members traveling..."
                  className="form-textarea"
                  value={visitData.remarks}
                  onChange={(e) => setVisitData({ ...visitData, remarks: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsVisitModalOpen(false)} className="btn-secondary" style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
                  {submitting ? 'Scheduling...' : 'Confirm Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Convert to Booking Modal */}
      {isBookingModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Initiate Plot Booking
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Lock Plot #{lead.interestedPlot?.plotNumber || ''} for customer <strong>{lead.name}</strong>.
            </p>

            <form onSubmit={handleCreateBooking}>
              <div className="form-group">
                <label className="form-label">Booking Advance Amount (₹) *</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={bookingData.bookingAmount}
                  onChange={(e) => setBookingData({ ...bookingData, bookingAmount: parseFloat(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-select"
                  value={bookingData.paymentMode}
                  onChange={(e) => setBookingData({ ...bookingData, paymentMode: e.target.value })}
                >
                  <option value="CHEQUE">Cheque</option>
                  <option value="NEFT">NEFT / RTGS</option>
                  <option value="UPI">UPI</option>
                  <option value="CASH">Cash Token</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Reference / Cheque No.</label>
                <input
                  type="text"
                  placeholder="e.g. UTR / Cheque # 123456"
                  className="form-input"
                  value={bookingData.paymentReference}
                  onChange={(e) => setBookingData({ ...bookingData, paymentReference: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Customer PAN Number</label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  className="form-input"
                  value={bookingData.panNumber}
                  onChange={(e) => setBookingData({ ...bookingData, panNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal Address</label>
                <textarea
                  rows={2}
                  placeholder="Residential address for allotment agreement..."
                  className="form-textarea"
                  value={bookingData.fullAddress}
                  onChange={(e) => setBookingData({ ...bookingData, fullAddress: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="btn-secondary" style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
                  {submitting ? 'Processing Lock...' : 'Lock Plot & Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
