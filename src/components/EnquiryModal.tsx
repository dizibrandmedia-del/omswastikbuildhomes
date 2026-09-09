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
              Enquiry Received!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Thank you for reaching out to <strong>Om Swastik Buildhomes</strong>. Our sales executive has been assigned to your requirement and will connect with you shortly.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Direct Developer Desk</span>
              <h3 style={{ fontSize: '1.85rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                Enquire Now
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {plotNumber ? `Inquiring about Plot #${plotNumber} (${projectName})` : `Inquiring about ${projectName}`}
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
                <label className="form-label">Mobile Number (10 digits) *</label>
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
                <label className="form-label">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Investment Budget</label>
                <select
                  className="form-select"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Select Budget Preference</option>
                  <option value="₹10 - 15 Lakhs">₹10 - 15 Lakhs</option>
                  <option value="₹15 - 25 Lakhs">₹15 - 25 Lakhs</option>
                  <option value="₹25 - 50 Lakhs">₹25 - 50 Lakhs</option>
                  <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Requirement / Message</label>
                <textarea
                  rows={3}
                  placeholder="Mention preferred facing, size or any queries..."
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
  );
}
