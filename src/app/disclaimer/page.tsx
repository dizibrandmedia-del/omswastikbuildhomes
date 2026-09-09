import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';

export const metadata = {
  title: 'Disclaimer | Om Swastik Buildhomes',
  description: 'Legal disclaimer and regulatory disclosure for plotted developments by Om Swastik Buildhomes Private Limited.',
};

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '4.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <h1 style={{ fontSize: '2.75rem', color: '#ffffff', marginBottom: '0.5rem' }}>Legal Disclaimer</h1>
          <p style={{ color: '#cbd5e1' }}>Regulatory and Allotment Disclosures</p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', lineHeight: 1.8 }}>
            <p>
              The information, specifications, artistic renderings, project boundaries, and layout images contained on this website (<strong>omswastikbuildhomes.com</strong>) are intended for general promotional and informational guidance regarding plotted developments by <strong>Om Swastik Buildhomes Private Limited</strong> (CIN: U41000UW2026PTC256814).
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>No Investment or Legal Advice</h3>
            <p>
              Real-estate land investments are subject to market conditions and regional economic developments. While statistics regarding Dholera SIR, DMIC corridors, DICDL planning, expressways, and airports are sourced from official publications and development authorities, prospective buyers are encouraged to perform independent title checks, revenue searches, and physical verification prior to financial commitments.
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>Layout &amp; Dimensional Precision</h3>
            <p>
              All plot sizes (Sq. Yd. / Sq. Ft.), internal road widths, and facing directions displayed in the online inventory are subject to minor adjustments as per final municipal demarcation and boundary demarcation on ground.
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>Allotment Terms</h3>
            <p>
              Online reservation enquiries or tokens do not automatically constitute a registered deed of sale or final allotment until formal agreements are verified, signed, and registered in accordance with applicable state revenue regulations.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
