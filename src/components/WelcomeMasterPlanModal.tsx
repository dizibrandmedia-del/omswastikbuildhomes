'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Download,
  User,
  Phone,
  Mail,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FileText,
} from 'lucide-react';

export default function WelcomeMasterPlanModal() {
  const pathname = usePathname();
  const isAdmin = Boolean(
    pathname?.startsWith('/admin') ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'))
  );

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'WELCOME' | 'FORM' | 'SUCCESS'>('WELCOME');
  const [downloadType, setDownloadType] = useState<'MASTER_PLAN' | 'BROCHURE'>('BROCHURE');
  const [leadSource, setLeadSource] = useState('WELCOME_POPUP');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-trigger modal on initial website visit and URL page refresh (NOT on admin panel)
  useEffect(() => {
    // STRICT CHECK: Never trigger or show on any admin panel route
    if (isAdmin || (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'))) {
      return;
    }

    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        isReload = navEntries[0].type === 'reload';
      } else if ((performance as any)?.navigation) {
        isReload = (performance as any).navigation.type === 1;
      }
    } catch (e) {}

    const hasVisitedSession = typeof window !== 'undefined' ? sessionStorage.getItem('omswastik_session_seen') : 'true';

    // Show popup only if user reloads URL OR it is their first visit to the site
    if (isReload || !hasVisitedSession) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('omswastik_session_seen', 'true');
      }
      const timer = setTimeout(() => {
        // Double check admin route before opening
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
          return;
        }
        setDownloadType('BROCHURE');
        setLeadSource(isReload ? 'PAGE_REFRESH' : 'FIRST_VISIT');
        setStep('WELCOME');
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [pathname, isAdmin]);

  // Listen for manual trigger anywhere on website (e.g. buttons or data-action)
  useEffect(() => {
    const handleOpenModal = (source = 'HERO_DOWNLOAD_BUTTON', type: 'MASTER_PLAN' | 'BROCHURE' = 'BROCHURE') => {
      // Don't open if on admin panel
      if (isAdmin || (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'))) {
        return;
      }
      setDownloadType(type);
      setLeadSource(source);
      setStep('FORM');
      setErrorMsg('');
      setIsOpen(true);
    };

    const handleCustomMasterPlanEvent = (e: any) => {
      handleOpenModal(e?.detail?.source || 'CUSTOM_EVENT', 'MASTER_PLAN');
    };

    const handleCustomBrochureEvent = (e: any) => {
      handleOpenModal(e?.detail?.source || 'BROCHURE_EVENT', 'BROCHURE');
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest('[data-action="download-masterplan"]')) {
        e.preventDefault();
        handleOpenModal('HERO_DOWNLOAD_BUTTON', 'MASTER_PLAN');
        return;
      }

      if (target.closest('[data-action="download-brochure"]') || target.closest('a[href="/brochure.pdf"]')) {
        e.preventDefault();
        handleOpenModal('BROCHURE_DOWNLOAD_BUTTON', 'BROCHURE');
        return;
      }
    };

    window.addEventListener('omswastik:download-masterplan', handleCustomMasterPlanEvent);
    window.addEventListener('omswastik:download-brochure', handleCustomBrochureEvent);
    document.addEventListener('click', handleGlobalClick);
    (window as any).openMasterPlanDownloadModal = () => handleOpenModal('HERO_DOWNLOAD_BUTTON', 'MASTER_PLAN');
    (window as any).openBrochureDownloadModal = () => handleOpenModal('BROCHURE_DOWNLOAD_BUTTON', 'BROCHURE');

    return () => {
      window.removeEventListener('omswastik:download-masterplan', handleCustomMasterPlanEvent);
      window.removeEventListener('omswastik:download-brochure', handleCustomBrochureEvent);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isAdmin]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const triggerPdfDownload = () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      if (downloadType === 'BROCHURE') {
        link.href = '/brochure.pdf';
        link.download = 'Om_Swastik_Riddhi_Official_Brochure.pdf';
      } else {
        link.href = '/Om_Swastik_Master_Plan.pdf';
        link.download = 'Om_Swastik_Riddhi_Master_Plan.pdf';
      }
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanedMobile = formData.mobile.replace(/\D/g, '');
    if (cleanedMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const reqText =
        downloadType === 'BROCHURE'
          ? 'Official Project Brochure PDF Download Request'
          : leadSource === 'HERO_DOWNLOAD_BUTTON'
          ? 'Master Plan PDF Download via Hero Button'
          : 'Master Plan PDF Download via Welcome Popup';

      const finalSource = downloadType === 'BROCHURE' ? 'BROCHURE_DOWNLOAD' : leadSource;

      const res = await fetch('/api/leads/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          requirement: reqText,
          source: finalSource,
          projectId: 'riddhi',
          honeypot: formData.honeypot,
          purpose: downloadType === 'BROCHURE' ? 'brochure' : 'master_plan',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit details. Please try again.');
      }

      // 1. Trigger Download
      triggerPdfDownload();

      // 2. Switch to success state
      setStep('SUCCESS');

      // 3. Auto-close after 2.8 seconds and land user on site
      setTimeout(() => {
        setIsOpen(false);
      }, 2800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAdmin || !isOpen) return null;

  return (
    <div
      className="modal-overlay show"
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 32, 35, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '20px',
          padding: 0,
          background: '#ffffff',
          border: '1.5px solid rgba(228, 170, 60, 0.45)',
          boxShadow: '0 25px 60px -12px rgba(0, 32, 35, 0.6), 0 0 0 1px rgba(228, 170, 60, 0.2)',
          boxSizing: 'border-box',
          color: '#172225',
        }}
      >
        {/* Luxury Real Estate Header Banner */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #00363a 0%, #001f22 100%)',
            padding: '1.25rem 1.5rem',
            borderBottom: '2px solid var(--gold)',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
          }}
        >
          {/* Top Row: Builder Trust Badge + Close Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
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
              <ShieldCheck size={13} style={{ color: 'var(--gold)' }} />
              <span>Om Swastik Buildhomes Pvt. Ltd.</span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close welcome modal"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={17} />
            </button>
          </div>

          {/* Project Header Title */}
          <div style={{ color: '#ffffff' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                margin: '0.2rem 0',
              }}
            >
              {step === 'WELCOME'
                ? 'Welcome to RIDDHI Premium Plots'
                : downloadType === 'BROCHURE'
                ? 'Official Project Brochure (PDF)'
                : 'Official Master Plan Layout'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.82)', margin: 0 }}>
              {step === 'WELCOME'
                ? 'Prime Residential Plotted Development · Kamiyala, Dholera SIR'
                : downloadType === 'BROCHURE'
                ? 'Comprehensive Investment & Blueprint Overview · Dholera SIR'
                : 'High-Resolution 69-Plot Master Plan (PDF) · Dholera SIR'}
            </p>
          </div>
        </div>

        {/* STEP 1: WELCOME & BROCHURE / MASTER PLAN DOWNLOAD PROMPT */}
        {step === 'WELCOME' && (
          <div style={{ padding: '1.5rem 1.5rem 1.25rem' }}>
            {/* Visual Preview Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '1.5px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '12px',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-deep))',
                  color: '#172225',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {downloadType === 'BROCHURE' ? 'Official Brochure Available' : 'Official PDF Available'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    flexShrink: 0,
                  }}
                >
                  <FileText size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--primary-dark)' }}>
                    {downloadType === 'BROCHURE' ? 'Official Project Brochure (PDF)' : 'Complete 69-Unit Master Plan'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {downloadType === 'BROCHURE'
                      ? 'Master Plan, Plot Typologies & Investment Blueprint'
                      : 'Standard Typology: 25′ × 72′ · 200 Sq. Yds. (1,800 Sq. Ft.)'}
                  </div>
                </div>
              </div>

              {/* Bulleted Project Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem', fontSize: '0.82rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>100% Clear-Title NA/NOC residential plots with immediate registry</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>18m, 12m &amp; 9m wide planned road network with clubhouse &amp; central park</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Near 250m Expressway, International Airport, and DMIC corridor</span>
                </div>
              </div>
            </div>

            {/* Prompt Text */}
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem', textAlign: 'center' }}>
              {downloadType === 'BROCHURE'
                ? 'Would you like to download the official project brochure for complete layout and investment details?'
                : 'Would you like to download the verified high-resolution master plan layout for your investment review?'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                id="welcome-download-plan-btn"
                onClick={() => setStep('FORM')}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                <Download size={18} />{' '}
                {downloadType === 'BROCHURE'
                  ? 'Download Official Brochure (PDF)'
                  : 'Download Official Master Plan (PDF)'}
              </button>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '0.4rem',
                  textDecoration: 'underline',
                  transition: 'color 0.2s ease',
                }}
              >
                Continue exploring website without download →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ENQUIRY DETAILS FORM */}
        {step === 'FORM' && (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  color: 'var(--gold-deep)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.25rem',
                }}
              >
                <Sparkles size={12} /> Instant Access Request
              </span>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', margin: 0, fontWeight: 700 }}>
                {downloadType === 'BROCHURE'
                  ? 'Enter Details to Download Official Brochure'
                  : 'Enter Details to Download Master Plan'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0' }}>
                {downloadType === 'BROCHURE'
                  ? 'Your official brochure PDF download will start immediately upon submission.'
                  : 'Your download will start immediately upon submission.'}
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  marginBottom: '1rem',
                  color: '#b91c1c',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.25rem' }}>
              {/* 1. Full Name */}
              <div>
                <label
                  htmlFor="welcome-lead-name"
                  style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '4px' }}
                >
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    id="welcome-lead-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '38px', paddingBlock: '0.65rem', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* 2. Mobile Number */}
              <div>
                <label
                  htmlFor="welcome-lead-mobile"
                  style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '4px' }}
                >
                  Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 0.65rem',
                      background: '#f8fafc',
                      border: '1.5px solid var(--grey-border)',
                      borderRight: 'none',
                      borderTopLeftRadius: 'var(--radius-md)',
                      borderBottomLeftRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    +91
                  </span>
                  <input
                    id="welcome-lead-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit phone number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                    className="form-input"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      paddingBlock: '0.65rem',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>
              </div>

              {/* 3. Email Address */}
              <div>
                <label
                  htmlFor="welcome-lead-email"
                  style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '4px' }}
                >
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    id="welcome-lead-email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '38px', paddingBlock: '0.65rem', fontSize: '0.88rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Privacy Note */}
            <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, marginBottom: '1.25rem', textAlign: 'center' }}>
              🔒 100% Privacy Protected · Direct Official Builder Communication · No Third-party Brokers
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setStep('WELCOME')}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back
              </button>

              <button
                type="submit"
                id="welcome-lead-submit-btn"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '0.8rem 1.25rem',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting &amp; Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Submit &amp; Download {downloadType === 'BROCHURE' ? 'Brochure' : 'Master Plan'}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION & LANDING */}
        {step === 'SUCCESS' && (
          <div style={{ padding: '2.5rem 1.75rem', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 0 8px rgba(22, 163, 74, 0.12)',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: 'var(--primary-dark)',
                margin: '0 0 0.4rem',
              }}
            >
              Thank You, {formData.name || 'Investor'}!
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Your {downloadType === 'BROCHURE' ? 'official Project Brochure PDF' : 'high-resolution Master Plan PDF'} download has been triggered automatically. Our senior {downloadType === 'BROCHURE' ? 'investment' : 'plot'} advisor will connect with you shortly.
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.78rem',
                color: '#64748b',
                marginBottom: '1.5rem',
              }}
            >
              If your download didn't start automatically,{' '}
              <button
                type="button"
                onClick={triggerPdfDownload}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                click here to download manually
              </button>
              .
            </div>

            <button
              type="button"
              id="welcome-enter-website-btn"
              onClick={handleClose}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 700,
              }}
            >
              Enter Website &amp; Explore Plots <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
