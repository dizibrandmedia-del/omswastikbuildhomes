'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrency, getPlotStatusBadgeClass } from '@/lib/utils';
import { Grid, Plus, Download, Edit2, AlertTriangle, Check, Loader2, Search, Filter } from 'lucide-react';

export default function AdminInventoryPage() {
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Status Modal State
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const [targetStatus, setTargetStatus] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // New Plot State
  const [newPlot, setNewPlot] = useState({
    plotNumber: '',
    projectId: 'cmtttzn7g0004v1e858pzpnl9', // Riddhi ID
    sizeSqYd: 150,
    facing: 'EAST',
    roadWidthFt: 30,
    isCorner: false,
    isParkFacing: false,
    isMainRoadFacing: false,
    pricePerUnit: 7500,
    bookingAmount: 51000,
    remarks: '',
  });

  const fetchPlots = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/plots?status=${statusFilter}`);
      const data = await res.json();
      if (data.plots) setPlots(data.plots);
    } catch (err) {
      console.error('Fetch plots error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, [statusFilter]);

  const openStatusModal = (plot: any, newStatus: string) => {
    setSelectedPlot(plot);
    setTargetStatus(newStatus);
    setStatusRemarks(plot.remarks || '');
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlot) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/plots/${selectedPlot.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetStatus,
          remarks: statusRemarks,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update plot status.');
      } else {
        setIsStatusModalOpen(false);
        fetchPlots();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleCreatePlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch('/api/plots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlot),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to create plot.');
      } else {
        setIsAddPlotModalOpen(false);
        setNewPlot({
          plotNumber: '',
          projectId: 'cmtttzn7g0004v1e858pzpnl9',
          sizeSqYd: 150,
          facing: 'EAST',
          roadWidthFt: 30,
          isCorner: false,
          isParkFacing: false,
          isMainRoadFacing: false,
          pricePerUnit: 7500,
          bookingAmount: 51000,
          remarks: '',
        });
        fetchPlots();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredPlots = plots.filter((p) => {
    if (searchTerm && !p.plotNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Plot Inventory Control</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage individual plot availability, pricing rates, and status transitions with duplicate protection.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href="/api/reports?format=csv&type=inventory"
            download
            className="btn-outline-gold"
            style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} /> Export Inventory CSV
          </a>
          <button onClick={() => setIsAddPlotModalOpen(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={16} /> Add Plot Unit
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="luxury-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'AVAILABLE', 'HOLD', 'BOOKED', 'SOLD', 'BLOCKED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: statusFilter === st ? 'var(--primary)' : '#e2e8f0',
                  backgroundColor: statusFilter === st ? 'var(--primary)' : '#ffffff',
                  color: statusFilter === st ? '#ffffff' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: statusFilter === st ? 600 : 500,
                  cursor: 'pointer',
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search Plot No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '32px', paddingBlock: '0.45rem', fontSize: '0.85rem', width: '200px' }}
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="luxury-card" style={{ padding: '1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 0.5rem' }} />
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading plot records...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Plot Number</th>
                  <th>Project</th>
                  <th>Area</th>
                  <th>Facing</th>
                  <th>Road</th>
                  <th>Total Price</th>
                  <th>Rate/Sq.Yd.</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlots.map((plot) => (
                  <tr key={plot.id}>
                    <td>
                      <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>#{plot.plotNumber}</strong>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{plot.project.name}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{plot.sizeSqYd} Sq. Yd.</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({plot.sizeSqFt} sqft)</div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{plot.facing.replace('_', ' ')}</td>
                    <td style={{ fontSize: '0.85rem' }}>{plot.roadWidthFt} Ft</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {formatCurrency(plot.priceTotal)}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      ₹{plot.pricePerUnit.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={getPlotStatusBadgeClass(plot.status)}>{plot.status}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '160px' }}>
                      {plot.remarks || '-'}
                    </td>
                    <td>
                      <select
                        value={plot.status}
                        onChange={(e) => openStatusModal(plot, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="HOLD">HOLD</option>
                        <option value="BOOKED">BOOKED</option>
                        <option value="SOLD">SOLD</option>
                        <option value="BLOCKED">BLOCKED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STATUS CHANGE CONFIRMATION MODAL (Instruction 60: CURRENT STATUS -> NEW STATUS) */}
      {isStatusModalOpen && selectedPlot && (
        <div className="modal-overlay" onClick={() => setIsStatusModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary-dark)' }}>
                Confirm Plot Status Transition
              </h3>
            </div>

            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              You are updating the public and CRM availability for <strong>Plot #{selectedPlot.plotNumber}</strong>.
            </p>

            {/* Instruction 60 Explicit Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '1.25rem',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8' }}>Current Status</div>
                <div className={getPlotStatusBadgeClass(selectedPlot.status)} style={{ marginTop: '0.35rem', fontSize: '0.9rem' }}>
                  {selectedPlot.status}
                </div>
              </div>

              <div style={{ fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>&rarr;</div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8' }}>New Status</div>
                <div className={getPlotStatusBadgeClass(targetStatus)} style={{ marginTop: '0.35rem', fontSize: '0.9rem' }}>
                  {targetStatus}
                </div>
              </div>
            </div>

            <form onSubmit={handleConfirmStatusChange}>
              <div className="form-group">
                <label className="form-label">Status Transition Remarks / Reason *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Record customer token, hold expiry or executive reason..."
                  className="form-textarea"
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={updating} className="btn-primary" style={{ flex: 1 }}>
                  {updating ? 'Updating...' : 'Confirm Transition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PLOT MODAL */}
      {isAddPlotModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddPlotModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Add New Plot to Inventory
            </h3>

            <form onSubmit={handleCreatePlot}>
              <div className="form-group">
                <label className="form-label">Plot Number / Unique Identifier *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A-109, B-209"
                  className="form-input"
                  value={newPlot.plotNumber}
                  onChange={(e) => setNewPlot({ ...newPlot, plotNumber: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Size (Sq. Yd.) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={newPlot.sizeSqYd}
                    onChange={(e) => setNewPlot({ ...newPlot, sizeSqYd: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price per Sq. Yd. (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={newPlot.pricePerUnit}
                    onChange={(e) => setNewPlot({ ...newPlot, pricePerUnit: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Facing Direction</label>
                  <select
                    className="form-select"
                    value={newPlot.facing}
                    onChange={(e) => setNewPlot({ ...newPlot, facing: e.target.value })}
                  >
                    <option value="EAST">EAST</option>
                    <option value="NORTH">NORTH</option>
                    <option value="NORTH_EAST">NORTH EAST</option>
                    <option value="WEST">WEST</option>
                    <option value="SOUTH_EAST">SOUTH EAST</option>
                    <option value="SOUTH">SOUTH</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Internal Road Width (Ft)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newPlot.roadWidthFt}
                    onChange={(e) => setNewPlot({ ...newPlot, roadWidthFt: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', margin: '0.75rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newPlot.isCorner}
                    onChange={(e) => setNewPlot({ ...newPlot, isCorner: e.target.checked })}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Corner Plot</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newPlot.isParkFacing}
                    onChange={(e) => setNewPlot({ ...newPlot, isParkFacing: e.target.checked })}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Park Facing</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddPlotModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, color: '#475569', borderColor: '#cbd5e1' }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={updating} className="btn-primary" style={{ flex: 1 }}>
                  {updating ? 'Saving...' : 'Add Plot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
