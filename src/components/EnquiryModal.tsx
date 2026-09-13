'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface EnquiryModalProps {
  onClose: () => void;
  projectName?: string;
  projectId?: string;
  plotNumber?: string;
  plotId?: string;
}

export default function EnquiryModal({
  onClose,
  projectName = 'Riddhi Premium Plots',
  projectId,
  plotNumber,
  plotId,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    budget: '',
    message: '',
    honeypot: '', // Spam protection field: must remain empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic mobile validation for 10 digits
    const cleanedMobile = formData.mobile.replace(/\D/g, '');
    if (cleanedMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
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
          email: formData.email,
          budget: formData.budget,
          requirement: formData.message,
          honeypot: formData.honeypot,
          projectId: projectId || null,
          plotId: plotId || null,
          source: plotId ? 'PLOT_PAGE' : projectId ? 'PROJECT_PAGE' : 'WEBSITE',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '520px',
          width: '94%',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '20px',
          padding: 0,
          background: '#ffffff',
          border: '1px solid rgba(228, 170, 60, 0.35)',
          boxShadow: '0 25px 60px -12px rgba(0, 32, 35, 0.5)',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #00363a 0%, #001f22 100%)',
            padding: '1.5rem 1.75rem 1.25rem',
            borderBottom: '2px solid var(--gold)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--gold-light)',
                background: 'rgba(228, 170, 60, 0.18)',
                border: '1px solid rgba(228, 170, 60, 0.35)',
                padding: '0.25rem 0.65rem',
                borderRadius: '20px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Direct Developer Desk
            </span>

            <button
              onClick={onClose}
              aria-label="Close enquiry modal"
              className="modal-close-luxury"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <X size={17} />
            </button>
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.7rem)',
              color: '#ffffff',
              marginBottom: '0.35rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
            }}
          >
            Enquire For Allotment
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
            {plotNumber ? `Inquiring about Plot #${plotNumber} (${projectName})` : `Inquiring about ${projectName}`}
          </p>
        </div>

        <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: 700 }}>
                Enquiry Received!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Thank you for connecting with <strong>Om Swastik Buildhomes</strong>. Our direct sales director will contact you via phone/WhatsApp with verified documentation and plot allotment availability.
              </p>
              <button type="button" onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
                Done
              </button>
            </div>
          ) : (
            <div>
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
                {/* Honeypot field (hidden from real users) */}
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
                    placeholder="e.g. Rahul Sharma"
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

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Select Budget</option>
                    <option value="₹10 - 15 Lakhs">₹10 - 15 Lakhs</option>
                    <option value="₹15 - 25 Lakhs">₹15 - 25 Lakhs</option>
                    <option value="₹25 - 50 Lakhs">₹25 - 50 Lakhs</option>
                    <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requirement regarding size, facing, or payment plan..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      Submitting...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
