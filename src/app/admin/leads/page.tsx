'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, getLeadStatusBadgeClass } from '@/lib/utils';
import { Users, Search, Filter, Plus, Phone, Calendar, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead form state
  const [newLead, setNewLead] = useState({
    name: '',
    mobile: '',
    email: '',
    budget: '',
    requirement: '',
    leadSource: 'MANUAL',
  });
  const [saving, setSaving] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/leads?status=${selectedStatus}&search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setNewLead({ name: '', mobile: '', email: '', budget: '', requirement: '', leadSource: 'MANUAL' });
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const statusOptions = [
    { value: 'ALL', label: 'All Leads' },
    { value: 'NEW', label: 'New' },
    { value: 'CONTACTED', label: 'Contacted' },
    { value: 'FOLLOW_UP', label: 'Follow Up' },
    { value: 'SITE_VISIT_SCHEDULED', label: 'Site Visit' },
    { value: 'NEGOTIATION', label: 'Negotiation' },
    { value: 'BOOKING', label: 'Booking' },
    { value: 'SOLD', label: 'Sold' },
    { value: 'LOST', label: 'Lost' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Leads Management Hub</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Central pipeline connecting website inquiries, WhatsApp chats, and phone consultations.
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Manual Lead
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="luxury-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedStatus(opt.value)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: selectedStatus === opt.value ? 'var(--primary)' : '#e2e8f0',
                  backgroundColor: selectedStatus === opt.value ? 'var(--primary)' : '#ffffff',
                  color: selectedStatus === opt.value ? '#ffffff' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: selectedStatus === opt.value ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '32px', paddingBlock: '0.45rem', fontSize: '0.85rem', width: '220px' }}
              />
            </div>
            <button type="submit" className="btn-teal" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Leads Table */}
      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 0.5rem' }} />
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading active leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>No leads found for the selected filter.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Mobile Number</th>
                  <th>Interested Project / Plot</th>
                  <th>Budget</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Latest Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`} style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        {lead.name}
                      </Link>
                      {lead.email && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lead.email}</div>}
                    </td>
                    <td style={{ fontWeight: 500 }}>{lead.mobile}</td>
                    <td>
                      <div>{lead.interestedProject?.name || 'General Inquiry'}</div>
                      {lead.interestedPlot && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                          Plot #{lead.interestedPlot.plotNumber}
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#475569' }}>{lead.budget || 'Not specified'}</td>
                    <td>
                      <span style={{ fontSize: '0.7rem', color: '#475569', background: '#f1f5f9', padding: '0.2rem 0.45rem', borderRadius: '4px' }}>
                        {lead.leadSource}
                      </span>
                    </td>
                    <td>
                      <span className={getLeadStatusBadgeClass(lead.status)}>{lead.status}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--dark)' }}>
                        {lead.assignedUser?.name || 'Unassigned'}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {lead.followUps?.[0] ? (
                        <div>
                          <div style={{ fontWeight: 500 }}>Call: {lead.followUps[0].callStatus}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatDate(lead.followUps[0].createdAt)}</div>
                        </div>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>No calls yet</span>
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`} className="btn-outline-gold" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
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

      {/* Manual Lead Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Create New Lead Record
            </h3>

            <form onSubmit={handleCreateLead}>
              <div className="form-group">
                <label className="form-label">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="form-input"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="form-input"
                  value={newLead.mobile}
                  onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="form-input"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Budget Range</label>
                <select
                  className="form-select"
                  value={newLead.budget}
                  onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                >
                  <option value="">Select Budget</option>
                  <option value="₹10 - 15 Lakhs">₹10 - 15 Lakhs</option>
                  <option value="₹15 - 25 Lakhs">₹15 - 25 Lakhs</option>
                  <option value="₹25 - 50 Lakhs">₹25 - 50 Lakhs</option>
                  <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Requirement Details</label>
                <textarea
                  rows={2}
                  placeholder="Plot preferences, facing, timing..."
                  className="form-textarea"
                  value={newLead.requirement}
                  onChange={(e) => setNewLead({ ...newLead, requirement: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary" style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 1 }}>
                  {saving ? 'Saving...' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
