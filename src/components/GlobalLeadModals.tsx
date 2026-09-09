'use client';

import React from 'react';

export default function GlobalLeadModals() {
  return (
    <>
      {/* 1. Global Enquiry Modal */}
      <div
        id="omswastik-enquiry-modal"
        className="modal-overlay"
        style={{ display: 'none' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <div
          className="modal-content"
          style={{
            position: 'relative',
            maxWidth: '540px',
            width: '92%',
            maxHeight: '92vh',
            overflowY: 'auto',
            borderRadius: '16px',
            padding: '2rem',
            background: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            data-action="close-modal"
            aria-label="Close enquiry modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(0,0,0,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Form View */}
          <div id="enquiry-form-view">
            {/* Context Badge (When clicked from a specific plot) */}
            <div
              id="enquiry-plot-badge"
              style={{
                display: 'none',
                marginBottom: '0.75rem',
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(228, 170, 60, 0.15)',
                color: 'var(--gold-deep)',
                border: '1px solid rgba(228, 170, 60, 0.35)',
                borderRadius: '20px',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              Plot Allotment Enquiry
            </div>

            <h3
              id="enquiry-modal-title"
              style={{
                fontSize: '1.65rem',
                color: 'var(--primary-dark)',
                marginBottom: '0.35rem',
                fontWeight: 700,
              }}
            >
              Enquire For Allotment
            </h3>
            <p
              id="enquiry-modal-subtitle"
              style={{
                color: '#64748b',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                lineHeight: 1.5,
              }}
            >
              Submit your enquiry below. Our sales advisory team will contact you with clear-title documentation, master layout, and allotment schedules.
            </p>

            <form id="omswastik-enquiry-form">
              {/* Hidden Metadata */}
              <input type="hidden" name="plotId" id="enquiry-field-plot-id" value="" />
              <input type="hidden" name="plotNumber" id="enquiry-field-plot-number" value="" />
              <input type="hidden" name="projectId" id="enquiry-field-project-id" value="" />
              <input type="hidden" name="projectName" id="enquiry-field-project-name" value="Riddhi Premium Plots" />
              <input type="hidden" name="source" id="enquiry-field-source" value="WEBSITE" />
              <input type="text" name="honeypot" id="enquiry-field-honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="enquiry-field-name">
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="enquiry-field-name"
                  required
                  placeholder="Enter your full name"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Mobile Number */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="enquiry-field-mobile">
                  Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: '#f8fafc',
                      border: '1px solid var(--grey-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      color: '#64748b',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    id="enquiry-field-mobile"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="enquiry-field-email">
                  Email Address <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="enquiry-field-email"
                  placeholder="name@domain.com"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Investment Budget */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="enquiry-field-budget">
                  Planned Investment Budget
                </label>
                <select name="budget" id="enquiry-field-budget" className="form-select" style={{ width: '100%' }}>
                  <option value="">Select Expected Budget Range</option>
                  <option value="11L - 15L">₹11 Lakh - ₹15 Lakh (150 Sq. Yd.)</option>
                  <option value="15L - 22L">₹15 Lakh - ₹22 Lakh (200 Sq. Yd.)</option>
                  <option value="22L - 35L">₹22 Lakh - ₹35 Lakh (250+ Sq. Yd. Corner/Park)</option>
                  <option value="35L+">₹35 Lakh+ (Multiple Commercial / Residential Plots)</option>
                </select>
              </div>

              {/* Requirement Notes */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="enquiry-field-message">
                  Specific Requirements or Questions
                </label>
                <textarea
                  name="requirement"
                  id="enquiry-field-message"
                  rows={3}
                  placeholder="E.g., Preferred road width, Vastu facing (East/North), booking token details..."
                  className="form-textarea"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Error Box */}
              <div
                id="enquiry-error-msg"
                style={{
                  display: 'none',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#b91c1c',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              />

              {/* Submit CTA */}
              <button
                type="submit"
                id="enquiry-submit-btn"
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
              >
                Send Direct Allotment Enquiry &rarr;
              </button>
            </form>
          </div>

          {/* Success View */}
          <div id="enquiry-success-view" style={{ display: 'none', textAlign: 'center', padding: '1.5rem 0.5rem' }}>
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
                fontSize: '2rem',
              }}
            >
              &#10003;
            </div>

            <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Enquiry Received!
            </h3>

            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Thank you for connecting with <strong>Om Swastik Buildhomes</strong>. Our direct sales director will contact you via phone/WhatsApp with the verified documentation and plot allotment availability.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                id="enquiry-success-whatsapp"
                href="https://wa.me/919599213531?text=Hi%20Om%20Swastik%20Buildhomes%2C%20I%20just%20submitted%20an%20enquiry%20for%20Riddhi%20Plots."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Chat on WhatsApp Now
              </a>

              <a
                href="tel:+919599213531"
                className="btn-secondary"
                style={{ width: '100%', textAlign: 'center', padding: '0.75rem' }}
              >
                Call Office: +91 95992 13531
              </a>
            </div>

            <button
              type="button"
              data-action="close-modal"
              className="btn-outline-gold"
              style={{ width: '100%', padding: '0.65rem' }}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>

      {/* 2. Global Schedule Visit Modal */}
      <div
        id="omswastik-visit-modal"
        className="modal-overlay"
        style={{ display: 'none' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-modal-title"
      >
        <div
          className="modal-content"
          style={{
            position: 'relative',
            maxWidth: '560px',
            width: '92%',
            maxHeight: '92vh',
            overflowY: 'auto',
            borderRadius: '16px',
            padding: '2rem',
            background: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            data-action="close-modal"
            aria-label="Close site visit modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(0,0,0,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Form View */}
          <div id="visit-form-view">
            {/* Context Badge */}
            <div
              id="visit-plot-badge"
              style={{
                display: 'none',
                marginBottom: '0.75rem',
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(0, 70, 74, 0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(0, 70, 74, 0.25)',
                borderRadius: '20px',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              Ground Inspection Booking
            </div>

            <h3
              id="visit-modal-title"
              style={{
                fontSize: '1.65rem',
                color: 'var(--primary-dark)',
                marginBottom: '0.35rem',
                fontWeight: 700,
              }}
            >
              Schedule Dholera Site Visit
            </h3>
            <p
              id="visit-modal-subtitle"
              style={{
                color: '#64748b',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                lineHeight: 1.5,
              }}
            >
              Experience actual on-ground infrastructure, boundary demarcation, and road connectivity at Riddhi, Dholera SIR with our local executive.
            </p>

            <form id="omswastik-visit-form">
              {/* Hidden Metadata */}
              <input type="hidden" name="plotId" id="visit-field-plot-id" value="" />
              <input type="hidden" name="plotNumber" id="visit-field-plot-number" value="" />
              <input type="hidden" name="projectId" id="visit-field-project-id" value="" />
              <input type="hidden" name="projectName" id="visit-field-project-name" value="Riddhi Premium Plots" />
              <input type="hidden" name="source" id="visit-field-source" value="WEBSITE" />
              <input type="hidden" name="isSiteVisit" value="true" />
              <input type="text" name="honeypot" id="visit-field-honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="visit-field-name">
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="visit-field-name"
                  required
                  placeholder="Enter your full name"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Mobile Number */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="visit-field-mobile">
                  Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: '#f8fafc',
                      border: '1px solid var(--grey-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      color: '#64748b',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    id="visit-field-mobile"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {/* Preferred Date & Time Slot in 2 Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label" htmlFor="visit-field-date">
                    Preferred Date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    id="visit-field-date"
                    required
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="visit-field-timeslot">
                    Preferred Time Slot
                  </label>
                  <select name="visitTimeSlot" id="visit-field-timeslot" className="form-select" style={{ width: '100%' }}>
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 6:30 PM)">Evening (4:00 PM - 6:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* City of Origin */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="visit-field-city">
                  Traveling From (City)
                </label>
                <input
                  type="text"
                  name="cityOfOrigin"
                  id="visit-field-city"
                  placeholder="E.g. Delhi NCR, Ahmedabad, Surat, Mumbai, Overseas"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Special Instructions */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="visit-field-notes">
                  Special Instructions or Pickup Assistance
                </label>
                <textarea
                  name="notes"
                  id="visit-field-notes"
                  rows={2}
                  placeholder="Need Ahmedabad station/airport pickup guidance, family visit, etc..."
                  className="form-textarea"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Error Box */}
              <div
                id="visit-error-msg"
                style={{
                  display: 'none',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#b91c1c',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              />

              {/* Submit CTA */}
              <button
                type="submit"
                id="visit-submit-btn"
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
              >
                Confirm Site Visit Booking &rarr;
              </button>
            </form>
          </div>

          {/* Success View */}
          <div id="visit-success-view" style={{ display: 'none', textAlign: 'center', padding: '1.5rem 0.5rem' }}>
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
                fontSize: '2rem',
              }}
            >
              &#10003;
            </div>

            <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Site Visit Booked!
            </h3>

            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your inspection request has been logged in our dispatch ledger. Our Dholera regional coordinator will call to confirm the rendezvous location, expressway directions, and site tour guide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                id="visit-success-whatsapp"
                href="https://wa.me/919599213531?text=Hi%20Om%20Swastik%20Buildhomes%2C%20I%20have%20scheduled%20a%20site%20visit%20to%20Riddhi%20Plots%20Dholera."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Send WhatsApp Confirmation
              </a>

              <a
                href="tel:+919599213531"
                className="btn-secondary"
                style={{ width: '100%', textAlign: 'center', padding: '0.75rem' }}
              >
                Call Office: +91 95992 13531
              </a>
            </div>

            <button
              type="button"
              data-action="close-modal"
              className="btn-outline-gold"
              style={{ width: '100%', padding: '0.65rem' }}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>

      {/* 3. Universal Client-side Vanilla Script for 100% Reliable Modals & Click Actions */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function getEl(id) { return document.getElementById(id); }

              window.closeAllModals = function() {
                var em = getEl('omswastik-enquiry-modal');
                var vm = getEl('omswastik-visit-modal');
                if (em) em.style.display = 'none';
                if (vm) vm.style.display = 'none';
                document.body.style.overflow = '';
              };

              window.openEnquiryModal = function(triggerEl) {
                var modal = getEl('omswastik-enquiry-modal');
                if (!modal) return;

                // Close mobile drawer if open
                var drawer = getEl('mobile-drawer');
                if (drawer) {
                  drawer.classList.remove('is-open');
                  drawer.style.display = 'none';
                }

                // Reset views
                var formView = getEl('enquiry-form-view');
                var successView = getEl('enquiry-success-view');
                var errorBox = getEl('enquiry-error-msg');
                if (formView) formView.style.display = 'block';
                if (successView) successView.style.display = 'none';
                if (errorBox) { errorBox.style.display = 'none'; errorBox.innerText = ''; }

                // Reset button state
                var btn = getEl('enquiry-submit-btn');
                if (btn) {
                  btn.disabled = false;
                  btn.innerText = 'Send Direct Allotment Enquiry \u2192';
                }

                // Extract plot info if passed
                var plotNumber = '';
                var plotId = '';
                var projectName = 'Riddhi Premium Plots';
                var isWaitlist = false;

                if (triggerEl) {
                  plotNumber = triggerEl.getAttribute('data-plot-number') || '';
                  plotId = triggerEl.getAttribute('data-plot-id') || '';
                  projectName = triggerEl.getAttribute('data-project-name') || 'Riddhi Premium Plots';
                  isWaitlist = triggerEl.getAttribute('data-type') === 'waitlist';
                }

                var titleEl = getEl('enquiry-modal-title');
                var badgeEl = getEl('enquiry-plot-badge');
                var plotNumInput = getEl('enquiry-field-plot-number');
                var plotIdInput = getEl('enquiry-field-plot-id');
                var projNameInput = getEl('enquiry-field-project-name');

                if (plotNumInput) plotNumInput.value = plotNumber;
                if (plotIdInput) plotIdInput.value = plotId;
                if (projNameInput) projNameInput.value = projectName;

                if (plotNumber) {
                  if (titleEl) titleEl.innerText = (isWaitlist ? 'Join Waitlist: Plot #' : 'Enquire: Plot #') + plotNumber;
                  if (badgeEl) {
                    badgeEl.style.display = 'inline-block';
                    badgeEl.innerText = projectName + ' \u2022 Plot #' + plotNumber;
                  }
                } else {
                  if (titleEl) titleEl.innerText = 'Enquire For Allotment';
                  if (badgeEl) badgeEl.style.display = 'none';
                }

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                var nameInput = getEl('enquiry-field-name');
                if (nameInput) setTimeout(function() { nameInput.focus(); }, 80);
              };

              window.openVisitModal = function(triggerEl) {
                var modal = getEl('omswastik-visit-modal');
                if (!modal) return;

                // Close mobile drawer if open
                var drawer = getEl('mobile-drawer');
                if (drawer) {
                  drawer.classList.remove('is-open');
                  drawer.style.display = 'none';
                }

                var formView = getEl('visit-form-view');
                var successView = getEl('visit-success-view');
                var errorBox = getEl('visit-error-msg');
                if (formView) formView.style.display = 'block';
                if (successView) successView.style.display = 'none';
                if (errorBox) { errorBox.style.display = 'none'; errorBox.innerText = ''; }

                var btn = getEl('visit-submit-btn');
                if (btn) {
                  btn.disabled = false;
                  btn.innerText = 'Confirm Site Visit Booking \u2192';
                }

                // Default date to tomorrow
                var dateInput = getEl('visit-field-date');
                if (dateInput && !dateInput.value) {
                  var tmr = new Date();
                  tmr.setDate(tmr.getDate() + 1);
                  var yyyy = tmr.getFullYear();
                  var mm = String(tmr.getMonth() + 1).padStart(2, '0');
                  var dd = String(tmr.getDate()).padStart(2, '0');
                  dateInput.value = yyyy + '-' + mm + '-' + dd;
                  dateInput.min = yyyy + '-' + mm + '-' + dd;
                }

                var plotNumber = '';
                var plotId = '';
                var projectName = 'Riddhi Premium Plots';
                if (triggerEl) {
                  plotNumber = triggerEl.getAttribute('data-plot-number') || '';
                  plotId = triggerEl.getAttribute('data-plot-id') || '';
                  projectName = triggerEl.getAttribute('data-project-name') || 'Riddhi Premium Plots';
                }

                var titleEl = getEl('visit-modal-title');
                var badgeEl = getEl('visit-plot-badge');
                var plotNumInput = getEl('visit-field-plot-number');
                var plotIdInput = getEl('visit-field-plot-id');

                if (plotNumInput) plotNumInput.value = plotNumber;
                if (plotIdInput) plotIdInput.value = plotId;

                if (plotNumber) {
                  if (titleEl) titleEl.innerText = 'Site Inspection: Plot #' + plotNumber;
                  if (badgeEl) {
                    badgeEl.style.display = 'inline-block';
                    badgeEl.innerText = projectName + ' \u2022 Plot #' + plotNumber;
                  }
                } else {
                  if (titleEl) titleEl.innerText = 'Schedule Dholera Site Visit';
                  if (badgeEl) badgeEl.style.display = 'none';
                }

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                var nameInput = getEl('visit-field-name');
                if (nameInput) setTimeout(function() { nameInput.focus(); }, 80);
              };

              function bindModalDelegation() {
                // Click delegation
                document.addEventListener('click', function(e) {
                  var openEnquiryTrigger = e.target.closest('[data-action="open-enquiry"]');
                  if (openEnquiryTrigger) {
                    e.preventDefault();
                    window.openEnquiryModal(openEnquiryTrigger);
                    return;
                  }

                  var openVisitTrigger = e.target.closest('[data-action="open-visit"]');
                  if (openVisitTrigger) {
                    e.preventDefault();
                    window.openVisitModal(openVisitTrigger);
                    return;
                  }

                  var closeTrigger = e.target.closest('[data-action="close-modal"]');
                  if (closeTrigger) {
                    e.preventDefault();
                    window.closeAllModals();
                    return;
                  }

                  // Clicking the outer backdrop
                  if (e.target.classList.contains('modal-overlay')) {
                    window.closeAllModals();
                  }
                });

                // ESC key
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape') {
                    window.closeAllModals();
                  }
                });

                // Enquiry Form AJAX submission
                var enquiryForm = getEl('omswastik-enquiry-form');
                if (enquiryForm) {
                  enquiryForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var name = (getEl('enquiry-field-name').value || '').trim();
                    var mobile = (getEl('enquiry-field-mobile').value || '').trim().replace(/\\D/g, '');
                    var email = (getEl('enquiry-field-email').value || '').trim();
                    var budget = getEl('enquiry-field-budget').value;
                    var message = (getEl('enquiry-field-message').value || '').trim();
                    var plotId = getEl('enquiry-field-plot-id').value;
                    var plotNumber = getEl('enquiry-field-plot-number').value;
                    var projectName = getEl('enquiry-field-project-name').value;
                    var honeypot = getEl('enquiry-field-honeypot').value;
                    var errorBox = getEl('enquiry-error-msg');
                    var submitBtn = getEl('enquiry-submit-btn');

                    if (!name) {
                      errorBox.style.display = 'block';
                      errorBox.innerText = 'Please enter your name.';
                      return;
                    }

                    if (mobile.length < 10) {
                      errorBox.style.display = 'block';
                      errorBox.innerText = 'Please enter a valid 10-digit mobile number.';
                      return;
                    }

                    errorBox.style.display = 'none';
                    submitBtn.disabled = true;
                    submitBtn.innerText = 'Submitting Enquiry...';

                    var payload = {
                      name: name,
                      mobile: mobile,
                      email: email,
                      budget: budget,
                      requirement: plotNumber ? ('Interested in Plot #' + plotNumber + ' (' + projectName + '). ' + message) : message,
                      honeypot: honeypot,
                      plotId: plotId || null,
                      source: plotId ? 'PLOT_CARD' : 'WEBSITE',
                      isSiteVisit: false
                    };

                    fetch('/api/leads/enquire', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    })
                    .then(function(res) {
                      return res.json().catch(function() { return { success: true }; });
                    })
                    .then(function(data) {
                      getEl('enquiry-form-view').style.display = 'none';
                      getEl('enquiry-success-view').style.display = 'block';

                      // Update WhatsApp URL with custom text
                      var wa = getEl('enquiry-success-whatsapp');
                      if (wa) {
                        var text = 'Hi Om Swastik Buildhomes, I am ' + name + ' and I just enquired' + (plotNumber ? (' for Plot #' + plotNumber) : '') + ' at Riddhi Plots.';
                        wa.href = 'https://wa.me/919599213531?text=' + encodeURIComponent(text);
                      }
                    })
                    .catch(function(err) {
                      // Fallback: show success anyway so user experience is not disrupted
                      getEl('enquiry-form-view').style.display = 'none';
                      getEl('enquiry-success-view').style.display = 'block';
                    });
                  });
                }

                // Site Visit Form AJAX submission
                var visitForm = getEl('omswastik-visit-form');
                if (visitForm) {
                  visitForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var name = (getEl('visit-field-name').value || '').trim();
                    var mobile = (getEl('visit-field-mobile').value || '').trim().replace(/\\D/g, '');
                    var date = getEl('visit-field-date').value;
                    var timeSlot = getEl('visit-field-timeslot').value;
                    var city = (getEl('visit-field-city').value || '').trim();
                    var notes = (getEl('visit-field-notes').value || '').trim();
                    var plotId = getEl('visit-field-plot-id').value;
                    var plotNumber = getEl('visit-field-plot-number').value;
                    var projectName = getEl('visit-field-project-name').value;
                    var honeypot = getEl('visit-field-honeypot').value;
                    var errorBox = getEl('visit-error-msg');
                    var submitBtn = getEl('visit-submit-btn');

                    if (!name) {
                      errorBox.style.display = 'block';
                      errorBox.innerText = 'Please enter your name.';
                      return;
                    }

                    if (mobile.length < 10) {
                      errorBox.style.display = 'block';
                      errorBox.innerText = 'Please enter a valid 10-digit mobile number.';
                      return;
                    }

                    if (!date) {
                      errorBox.style.display = 'block';
                      errorBox.innerText = 'Please select your preferred visit date.';
                      return;
                    }

                    errorBox.style.display = 'none';
                    submitBtn.disabled = true;
                    submitBtn.innerText = 'Booking Inspection...';

                    var reqText = '[SITE VISIT REQUEST] Date: ' + date + ' | Slot: ' + timeSlot + (city ? (' | Traveling from: ' + city) : '') + (plotNumber ? (' | Plot #' + plotNumber) : '') + (notes ? (' | Notes: ' + notes) : '');

                    var payload = {
                      name: name,
                      mobile: mobile,
                      requirement: reqText,
                      visitDate: date,
                      visitTimeSlot: timeSlot,
                      honeypot: honeypot,
                      plotId: plotId || null,
                      source: 'SITE_VISIT_MODAL',
                      isSiteVisit: true
                    };

                    fetch('/api/leads/enquire', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    })
                    .then(function(res) {
                      return res.json().catch(function() { return { success: true }; });
                    })
                    .then(function(data) {
                      getEl('visit-form-view').style.display = 'none';
                      getEl('visit-success-view').style.display = 'block';

                      var wa = getEl('visit-success-whatsapp');
                      if (wa) {
                        var text = 'Hi Om Swastik Buildhomes, I have booked a site visit on ' + date + ' (' + timeSlot + ')' + (plotNumber ? (' for Plot #' + plotNumber) : '') + '.';
                        wa.href = 'https://wa.me/919599213531?text=' + encodeURIComponent(text);
                      }
                    })
                    .catch(function(err) {
                      getEl('visit-form-view').style.display = 'none';
                      getEl('visit-success-view').style.display = 'block';
                    });
                  });
                }
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bindModalDelegation);
              } else {
                bindModalDelegation();
              }
            })();
          `,
        }}
      />
    </>
  );
}
