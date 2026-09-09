'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Calendar } from 'lucide-react';

interface ScheduleVisitModalProps {
  onClose: () => void;
  projectName?: string;
  projectId?: string;
  plotNumber?: string;
  plotId?: string;
}

export default function ScheduleVisitModal({
  onClose,
  projectName = 'Riddhi Premium Plots (Dholera SIR)',
  projectId,
  plotNumber,
  plotId,
}: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    visitDate: '',
    visitTimeSlot: 'Morning (10:00 AM - 1:00 PM)',
    cityOfOrigin: '',
    notes: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanedMobile = formData.mobile.replace(/\D/g, '');
    if (cleanedMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.visitDate) {
      setErrorMsg('Please select a preferred visit date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          requirement: `[SITE VISIT REQUEST] Date: ${formData.visitDate}, Slot: ${formData.visitTimeSlot}, Traveling from: ${formData.cityOfOrigin || 'Not specified'}. Notes: ${formData.notes}`,
          honeypot: formData.honeypot,
          projectId: projectId || null,
          plotId: plotId || null,
          source: 'WEBSITE',
          isSiteVisit: true,
          visitDate: formData.visitDate,
          visitTimeSlot: formData.visitTimeSlot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to schedule site visit.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error booking site visit. Please connect directly via phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
          }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={56} style={{ color: '#10b981', margin: '0 auto 1.25rem' }} />
            <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Site Visit Requested!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Our executive desk will confirm your slot and provide site coordinates, airport/station transit guidance, and plot layout verification.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
                <Calendar size={13} /> On-Site Experience
              </span>
              <h3 style={{ fontSize: '1.85rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                Schedule Dholera Site Visit
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {plotNumber ? `Inspecting Plot #${plotNumber} at ${projectName}` : `Inspecting ${projectName}`}
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #f87171',
                  borderRadius: '6px',
                  color: '#991b1b',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="website_url"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time Slot</label>
                  <select
                    className="form-select"
                    value={formData.visitTimeSlot}
                    onChange={(e) => setFormData({ ...formData, visitTimeSlot: e.target.value })}
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (4:00 PM - 6:00 PM)">Evening (4 PM - 6 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Traveling From (City)</label>
                <input
                  type="text"
                  placeholder="e.g. Delhi NCR, Ahmedabad, Mumbai"
                  className="form-input"
                  value={formData.cityOfOrigin}
                  onChange={(e) => setFormData({ ...formData, cityOfOrigin: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Any pickup requests or specific block preferences..."
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Confirming Slot...
                  </>
                ) : (
                  'Confirm Visit Request'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
