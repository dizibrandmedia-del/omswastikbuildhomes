'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    budget: '',
    requirement: '',
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

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'WEBSITE',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry.');

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error. Please call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Direct Investor Desk</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff', marginBottom: '0.5rem' }}>
            Get In Touch
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Speak directly with the directors and land acquisition team of Om Swastik Buildhomes Pvt. Ltd. for allotment schedules, site inspections, and clear-title documentation.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            {/* Left Column: Office & Executives */}
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Corporate Office</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>Headquarters &amp; Direct Desk</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>Corporate Address</h4>
                    <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, Uttar Pradesh 201318
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-deep)', fontWeight: 600, marginTop: '0.25rem' }}>
                      CIN: U41000UW2026PTC256814
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(228, 170, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>Direct Helpline</h4>
                    <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                      <a href="tel:+919599213531" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 95992 13531</a> &bull;{' '}
                      <a href="tel:+919810484742" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 98104 84742</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>Official Correspondence</h4>
                    <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                      <a href="mailto:rahulbisht@omswastikbuildhomes.com">rahulbisht@omswastikbuildhomes.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Actions */}
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                  Direct WhatsApp with Directors
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a
                    href="https://wa.me/919810484742?text=Hi%20Rahul%20Bisht%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <span><strong>Rahul Bisht</strong> (+91 98104 84742)</span>
                    <span style={{ color: '#25D366', fontWeight: 600 }}>Chat &rarr;</span>
                  </a>

                  <a
                    href="https://wa.me/919599213531?text=Hi%20Praful%20Singh%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <span><strong>Praful Singh</strong> (+91 95992 13531)</span>
                    <span style={{ color: '#25D366', fontWeight: 600 }}>Chat &rarr;</span>
                  </a>

                  <a
                    href="https://wa.me/919990842233?text=Hi%20Santosh%20Gupta%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <span><strong>Santosh Gupta</strong> (+91 99908 42233)</span>
                    <span style={{ color: '#25D366', fontWeight: 600 }}>Chat &rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Lead Form */}
            <div>
              <div className="luxury-card" style={{ padding: '2.5rem', border: '1px solid var(--grey-border)' }}>
                <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Send Message</span>
                <h3 style={{ fontSize: '1.85rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  Send an Enquiry
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                  Fill out the form below. Your request will be directly logged into our CRM and attended to immediately.
                </p>

                <div id="contact-page-success" style={{ display: 'none', textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle size={52} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    Message Received!
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Thank you for contacting Om Swastik Buildhomes. Our executive will call you shortly.
                  </p>
                </div>

                <form id="contact-page-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website_url"
                    id="contact-honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div id="contact-error-box" style={{ display: errorMsg ? 'flex' : 'none', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} />
                    <span id="contact-error-text">{errorMsg}</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="Your full name"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      id="contact-mobile"
                      required
                      maxLength={10}
                      placeholder="+91 00000 00000"
                      className="form-input"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="your@email.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Investment Range</label>
                    <select
                      id="contact-budget"
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
                    <label className="form-label">Message / Specific Plots</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Tell us your preferences (facing, size, location)..."
                      className="form-textarea"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </form>

                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function() {
                        var form = document.getElementById('contact-page-form');
                        var successEl = document.getElementById('contact-page-success');
                        var errorBox = document.getElementById('contact-error-box');
                        var errorText = document.getElementById('contact-error-text');
                        var btn = document.getElementById('contact-submit-btn');

                        if (form) {
                          form.addEventListener('submit', function(e) {
                            var name = (document.getElementById('contact-name').value || '').trim();
                            var mobile = (document.getElementById('contact-mobile').value || '').trim().replace(/\\D/g, '');
                            var email = (document.getElementById('contact-email').value || '').trim();
                            var budget = document.getElementById('contact-budget').value;
                            var requirement = (document.getElementById('contact-message').value || '').trim();
                            var honeypot = (document.getElementById('contact-honeypot').value || '').trim();

                            if (mobile.length < 10) {
                              e.preventDefault();
                              if (errorBox && errorText) {
                                errorText.innerText = 'Please enter a valid 10-digit mobile number.';
                                errorBox.style.display = 'flex';
                              }
                              return;
                            }

                            if (btn) {
                              btn.disabled = true;
                              btn.innerText = 'Sending...';
                            }

                            fetch('/api/leads/enquire', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                name: name,
                                mobile: mobile,
                                email: email,
                                budget: budget,
                                requirement: requirement,
                                honeypot: honeypot,
                                source: 'CONTACT_PAGE'
                              })
                            })
                            .then(function() {
                              if (form) form.style.display = 'none';
                              if (successEl) successEl.style.display = 'block';
                            })
                            .catch(function() {
                              if (form) form.style.display = 'none';
                              if (successEl) successEl.style.display = 'block';
                            });
                          });
                        }
                      })();
                    `,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
