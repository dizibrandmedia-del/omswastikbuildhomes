import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';

export const metadata = {
  title: 'Privacy Policy | Om Swastik Buildhomes',
  description: 'Privacy Policy and data protection standards of Om Swastik Buildhomes Private Limited.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '4.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <h1 style={{ fontSize: '2.75rem', color: '#ffffff', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: '#cbd5e1' }}>Last updated: September 2026</p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', lineHeight: 1.8 }}>
            <p>
              This Privacy Policy explains how <strong>Om Swastik Buildhomes Private Limited</strong> (CIN: U41000UW2026PTC256814) collects, uses, and safeguards personal information when you visit our website or interact with our sales executives.
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>Information We Collect</h3>
            <p>
              When you submit an enquiry, request a site visit, or communicate via WhatsApp or phone, we may collect your name, phone number, email address, property preferences, and budget specifications.
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>How We Use Your Information</h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>To provide requested project brochures, site layouts, and plot pricing.</li>
              <li>To coordinate physical site visits and transport guidance in Dholera SIR.</li>
              <li>To process allotment agreements and booking records.</li>
              <li>To communicate important regulatory, possession, or infrastructure updates.</li>
            </ul>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>Data Protection &amp; Confidentiality</h3>
            <p>
              We do not sell, rent, or trade your personal data to third-party marketing brokers. Your information is accessed solely by authorized representatives of Om Swastik Buildhomes for real-estate service fulfillment.
            </p>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1rem' }}>Contact Grievance Officer</h3>
            <p>
              For any privacy-related questions or data deletion requests, contact us at: <br />
              <strong>Om Swastik Buildhomes Pvt. Ltd.</strong><br />
              Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318<br />
              Email: rahulbisht@omswastikbuildhomes.com | Phone: +91 95992 13531
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
