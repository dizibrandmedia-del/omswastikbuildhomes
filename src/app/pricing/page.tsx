import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import PricingSection from '@/components/PricingSection';
import {
  Shield,
  FileCheck,
  Building2,
  Phone,
  Mail,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Price List & Payment Plans | Riddhi Dholera SIR | Om Swastik Buildhomes',
  description:
    'Official Price List and Staged Payment Plans for Riddhi Premium Plots, Dholera SIR by Om Swastik Buildhomes Pvt. Ltd. Basic Sale Price (BSP) from ₹12,999/Sq. Yd. Down Payment & Flexi plans.',
  keywords: [
    'Dholera plot price list',
    'Riddhi premium plots price',
    'Dholera smart city payment plan',
    'Om Swastik Buildhomes price list',
    'Dholera SIR plot rates 2026',
    'Dholera plot cost calculator',
  ],
  alternates: {
    canonical: 'https://omswastikbuildhomes.com/pricing',
  },
  openGraph: {
    title: 'Riddhi Plots Official Price List & Payment Schedules | Dholera SIR',
    description:
      'Explore official rates from ₹12,999/Sq. Yd. with transparent payment plans, development charges, and live allotment calculator.',
    url: 'https://omswastikbuildhomes.com/pricing',
    siteName: 'Om Swastik Buildhomes',
    images: [
      {
        url: 'https://omswastikbuildhomes.com/images/hero-dholera.jpg',
        width: 1200,
        height: 630,
        alt: 'Om Swastik Buildhomes Pricing',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function PricingPage() {
  const faqs = [
    {
      q: 'What is the initial booking token amount for Riddhi Premium Plots?',
      a: 'The standard token to reserve a specific plot number from the live inventory is ₹51,000. This is adjusted against the 10% Stage 1 booking commitment upon allotment agreement signing.',
    },
    {
      q: 'What is the key difference between Down Payment Plan and Flexi Payment Plan?',
      a: 'The Down Payment Plan offers our most attractive rate of ₹12,999/- per Sq. Yd. with 10% on booking and 90% within 30 days. The Flexi Payment Plan is ₹13,999/- per Sq. Yd., allowing you to disburse across 3 milestones (10% on booking, 40% in 45 days, and 50% in 90 days).',
    },
    {
      q: 'What infrastructure is covered under the ₹1,500/- per Sq. Yd. Development Charges?',
      a: 'Development Charges fund the execution of internal 30ft & 40ft wide paved roads, decorative street lighting, boundary wall demarcation, underground utility conduits, stormwater drainage, and entry portal gate infrastructure.',
    },
    {
      q: 'Can NRIs and non-Gujarat residents purchase plots in Riddhi?',
      a: 'Yes, 100%. Freehold residential and commercial plotted property in Dholera SIR can be purchased by any Indian citizen or NRI/OCI under FEMA guidelines through standard banking channels (NRE/NRO/cheque/wire transfer).',
    },
    {
      q: 'When does the registry and title transfer take place?',
      a: 'Title deed registration and formal possession handover are executed at the local sub-registrar office upon completion of 100% milestone payment and issuance of statutory allotment receipts.',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Header / Hero */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem',
          backgroundColor: '#002528',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(228, 170, 60, 0.15), transparent 45%), linear-gradient(180deg, rgba(0, 54, 58, 0.85) 0%, rgba(16, 26, 29, 0.95) 100%)',
          color: '#ffffff',
          borderBottom: '2px solid var(--gold)',
        }}
      >
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="gold-badge">
                <Shield size={13} /> Transparent Pricing Policy
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              Project Price List &amp; Payment Plans
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2rem' }}>
              Official rates, development schedules, and flexible payment plans for <strong>Riddhi Premium Plots</strong> in Dholera SIR, Gujarat.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/plots" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                View Available Plots
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                data-action="open-visit"
                data-project-name="Riddhi Premium Plots"
                className="btn-secondary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Section Component */}
      <PricingSection showHeroBadge={false} />

      {/* WHY INVEST SECTION - TRUST & SECURITY */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Security &amp; Assurance</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>
              Complete Investment Safeguards
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Every allotment is executed through government-notarized legal standards, clear chain of title, and banking compliance.
            </p>
          </div>

          <div className="why-invest-grid">
            <div className="luxury-card why-invest-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <FileCheck size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                100% Clear Title Documentation
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Every plot is backed by freehold ownership, certified survey boundaries, and complete legal verification with no encumbrances.
              </p>
            </div>

            <div className="luxury-card why-invest-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', marginBottom: '1.25rem' }}>
                <Building2 size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                Planned Greenfield Infrastructure
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Includes 30ft &amp; 40ft wide internal roads, underground electrical ducts, water supply lines, and 24x7 gated security.
              </p>
            </div>

            <div className="luxury-card why-invest-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '1.25rem' }}>
                <Layers size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                Direct Highway &amp; Airport Access
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Strategically positioned just minutes from the Ahmedabad–Dholera 4-lane expressway and upcoming Dholera International Airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & PAYMENT FAQS */}
      <section className="section-padding" style={{ backgroundColor: '#faf8f5', borderTop: '1px solid var(--grey-border)' }}>
        <div className="container-custom" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Investor Clarity</span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Frequently Asked Questions on Pricing
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Clear answers to the most common financial, legal, and payment timeline questions.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="luxury-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <HelpCircle size={20} style={{ color: 'var(--gold-deep)', flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                      {faq.q}
                    </h4>
                    <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.65, margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CORPORATE CTA BANNER */}
      <section
        style={{
          padding: '4.5rem 0',
          backgroundColor: '#002528',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '780px' }}>
          <span className="gold-badge" style={{ marginBottom: '1rem' }}>Limited Plot Allotments</span>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Secure Your Plot Allotment in Dholera SIR Today
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Speak directly with our senior investment director for master layout availability, customized payment schedules, and site inspection arrangements.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              data-action="open-enquiry"
              data-project-name="Riddhi Premium Plots"
              className="btn-primary"
              style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}
            >
              Enquire For Direct Allotment →
            </button>
            <a
              href="tel:+919599213531"
              className="btn-secondary"
              style={{ padding: '1rem 2rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Phone size={18} style={{ color: 'var(--gold)' }} />
              Call +91 95992 13531
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
