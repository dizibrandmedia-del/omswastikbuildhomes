'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, getLeadStatusBadgeClass } from '@/lib/utils';
import { Users, Search, Filter, Plus, Phone, Calendar, ArrowRight, Loader2, X, RefreshCw } from 'lucide-react';
import initialLeads from '@/lib/initialLeads.json';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('');

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

  const fetchLeads = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const headers: Record<string, string> = {};
      if (typeof window !== 'undefined') {
        const u = localStorage.getItem('osb_user');
        if (u) headers['x-osb-user'] = encodeURIComponent(u);
      }

      const res = await fetch(`/api/leads?status=${selectedStatus}&search=${encodeURIComponent(searchTerm)}`, {
        headers,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads)) {
          setLeads(data.leads);
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Auto-refresh every 8 seconds so any enquiry submitted on website shows up immediately
    const interval = setInterval(() => {
      fetchLeads(true);
    }, 8000);

    // Refresh immediately when tab gains focus or on lead submitted event
    const handleFocus = () => fetchLeads(true);
    const handleLeadSubmitted = () => fetchLeads(true);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'osb_last_lead_time') fetchLeads(true);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('osb_lead_submitted', handleLeadSubmitted);
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('osb_lead_submitted', handleLeadSubmitted);
      window.removeEventListener('storage', handleStorage);
    };
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
        const data = await res.json();
        setIsAddModalOpen(false);
        setNewLead({ name: '', mobile: '', email: '', budget: '', requirement: '', leadSource: 'MANUAL' });
        if (data.lead) {
          setLeads((prev) => [data.lead, ...prev]);
        } else {
          fetchLeads();
        }
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to save lead.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving lead');
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

  const filteredLeads = leads.filter((l) => {
    if (selectedStatus !== 'ALL' && l.status !== selectedStatus) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        (l.name || '').toLowerCase().includes(q) ||
        (l.mobile || '').includes(q) ||
        (l.email || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Leads Management Hub</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#166534',
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                padding: '0.2rem 0.55rem',
                borderRadius: '999px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
              Live Sync Active
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Direct pipeline: website allotment enquiries &amp; ground visits update instantly.
            {lastSyncedTime && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>• Last synced at {lastSyncedTime}</span>}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            id="btn-refresh-leads"
            onClick={() => fetchLeads(false)}
            disabled={loading || isRefreshing}
            style={{
              padding: '0.55rem 0.95rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              transition: 'all 0.15s ease',
            }}
            title="Refresh Leads"
          >
            <RefreshCw size={14} className={(loading || isRefreshing) ? 'animate-spin' : ''} />
            <span>{(loading || isRefreshing) ? 'Syncing...' : 'Refresh'}</span>
          </button>

          <button
            id="btn-open-add-lead"
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{ fontSize: '0.875rem' }}
          >
            <Plus size={16} /> Add Manual Lead
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="luxury-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Status Tabs */}
          <div id="leads-status-tabs" style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {statusOptions.map((opt) => {
              const active = selectedStatus === opt.value;
              return (
                <button
                  key={opt.value}
                  data-status={opt.value}
                  onClick={() => setSelectedStatus(opt.value)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: active ? 'var(--primary)' : '#e2e8f0',
                    backgroundColor: active ? 'var(--primary)' : '#ffffff',
                    color: active ? '#ffffff' : '#64748b',
                    fontSize: '0.8rem',
                    fontWeight: active ? 600 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <form id="leads-search-form" onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                id="leads-search-input"
                type="text"
                placeholder="Search name, phone, email..."
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
        ) : (
          <div className="table-responsive">
            <table className="custom-table" id="leads-table">
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
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No leads found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} data-lead-id={lead.id} data-status={lead.status}>
                      <td>
                        <Link href={`/admin/leads/${lead.id}`} style={{ fontWeight: 600, color: 'var(--primary)' }}>
                          {lead.name}
                        </Link>
                        {lead.email && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lead.email}</div>}
                      </td>
                      <td style={{ fontWeight: 500 }}>
                        <a href={`tel:${lead.mobile}`} style={{ color: 'inherit' }}>
                          {lead.mobile}
                        </a>
                      </td>
                      <td>
                        <div>{lead.interestedProject?.name || 'Riddhi Premium Plots'}</div>
                        {lead.interestedPlot && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                            Plot #{lead.interestedPlot.plotNumber}
                          </span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: '#475569' }}>{lead.budget || '₹10 - 15 Lakhs'}</td>
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
                          {lead.assignedUser?.name || 'Rahul Bisht'}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {lead.followUps?.[0] ? (
                          <div>
                            <div style={{ fontWeight: 500 }}>Call: {lead.followUps[0].callStatus}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatDate(lead.followUps[0].createdAt || new Date())}</div>
                          </div>
                        ) : lead.siteVisits?.[0] ? (
                          <div>
                            <div style={{ fontWeight: 500, color: '#8430ce' }}>Site Visit Scheduled</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatDate(lead.siteVisits[0].visitDate || new Date())}</div>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>New Lead</span>
                        )}
                      </td>
                      <td>
                        <Link href={`/admin/leads/${lead.id}`} className="btn-outline-gold" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Lead Modal */}
      <div
        id="add-lead-modal"
        className="modal-overlay"
        style={{ display: isAddModalOpen ? 'flex' : 'none' }}
        onClick={() => setIsAddModalOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0 }}>
              Create New Lead Record
            </h3>
            <button
              type="button"
              id="btn-close-add-lead"
              onClick={() => setIsAddModalOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
          </div>

          <form id="add-lead-form" onSubmit={handleCreateLead}>
            <div className="form-group">
              <label className="form-label" htmlFor="lead-name">Customer Name *</label>
              <input
                id="lead-name"
                name="name"
                type="text"
                required
                placeholder="Full name"
                className="form-input"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lead-mobile">Mobile Number *</label>
              <input
                id="lead-mobile"
                name="mobile"
                type="tel"
                required
                placeholder="+91 00000 00000"
                className="form-input"
                value={newLead.mobile}
                onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lead-email">Email Address</label>
              <input
                id="lead-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="form-input"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lead-budget">Budget Range</label>
              <select
                id="lead-budget"
                name="budget"
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
              <label className="form-label" htmlFor="lead-requirement">Requirement Details</label>
              <textarea
                id="lead-requirement"
                name="requirement"
                rows={2}
                placeholder="Plot preferences, facing, timing..."
                className="form-textarea"
                value={newLead.requirement}
                onChange={(e) => setNewLead({ ...newLead, requirement: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                type="button"
                id="btn-cancel-add-lead"
                onClick={() => setIsAddModalOpen(false)}
                className="btn-secondary"
                style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="btn-save-lead-submit"
                disabled={saving}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                {saving ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bulletproof DOM Fallback Script (Runs even if external React chunks fail to load) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initLeadInteractions() {
                var modal = document.getElementById('add-lead-modal');
                var openBtn = document.getElementById('btn-open-add-lead');
                var closeBtn = document.getElementById('btn-close-add-lead');
                var cancelBtn = document.getElementById('btn-cancel-add-lead');
                var form = document.getElementById('add-lead-form');
                var searchInput = document.getElementById('leads-search-input');
                var statusTabs = document.getElementById('leads-status-tabs');
                var table = document.getElementById('leads-table');

                if (openBtn && modal) {
                  openBtn.onclick = function() { modal.style.display = 'flex'; };
                }
                if (closeBtn && modal) {
                  closeBtn.onclick = function() { modal.style.display = 'none'; };
                }
                if (cancelBtn && modal) {
                  cancelBtn.onclick = function() { modal.style.display = 'none'; };
                }

                // Instant Client-side Search
                if (searchInput && table) {
                  searchInput.addEventListener('input', function() {
                    var q = searchInput.value.toLowerCase().trim();
                    var rows = table.querySelectorAll('tbody tr');
                    rows.forEach(function(row) {
                      var text = row.innerText.toLowerCase();
                      row.style.display = text.includes(q) ? '' : 'none';
                    });
                  });
                }

                // Instant Client-side Status Filter
                if (statusTabs && table) {
                  var buttons = statusTabs.querySelectorAll('button');
                  buttons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                      buttons.forEach(function(b) {
                        b.style.backgroundColor = '#ffffff';
                        b.style.color = '#64748b';
                        b.style.borderColor = '#e2e8f0';
                      });
                      btn.style.backgroundColor = 'var(--primary)';
                      btn.style.color = '#ffffff';
                      btn.style.borderColor = 'var(--primary)';

                      var st = btn.getAttribute('data-status');
                      var rows = table.querySelectorAll('tbody tr');
                      rows.forEach(function(row) {
                        var rowSt = row.getAttribute('data-status');
                        if (st === 'ALL' || rowSt === st) {
                          row.style.display = '';
                        } else {
                          row.style.display = 'none';
                        }
                      });
                    });
                  });
                }

                // Add Lead Fallback
                if (form) {
                  form.addEventListener('submit', function(e) {
                    var submitBtn = document.getElementById('btn-save-lead-submit');
                    if (submitBtn) submitBtn.innerText = 'Saving...';
                  });
                }
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initLeadInteractions);
              } else {
                initLeadInteractions();
              }
            })();
          `,
        }}
      />
    </div>
  );
}
