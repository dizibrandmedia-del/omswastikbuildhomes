import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import { Shield, Target, Award, Users, MapPin, CheckCircle, ArrowRight, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us | Om Swastik Buildhomes Pvt. Ltd.',
  description: 'Learn about Om Swastik Buildhomes Pvt. Ltd. (CIN: U41000UW2026PTC256814), leadership team, and vision for plotted infrastructure in Dholera SIR.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Corporate Profile</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            Building Trust. Creating Spaces.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Om Swastik Buildhomes Private Limited is an active, legally incorporated real-estate enterprise dedicated to pioneering high-yield plotted infrastructure in India&apos;s emerging smart industrial corridors.
          </p>
        </div>
      </section>

      {/* Corporate Verification Section */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>MCA Authenticated</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
                Legal Corporate Identity
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Om Swastik Buildhomes Private Limited is registered with the Ministry of Corporate Affairs (MCA), Government of India, maintaining full corporate governance and compliance standards.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Shield size={20} style={{ color: 'var(--gold-deep)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Corporate Identification Number (CIN)</div>
                    <div style={{ color: '#64748b', fontSize: '0.925rem' }}>U41000UW2026PTC256814</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={20} style={{ color: 'var(--gold-deep)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Registered Headquarters</div>
                    <div style={{ color: '#64748b', fontSize: '0.925rem' }}>
                      Shop No. 151, Gaur World Smart Street, Plot No. C-01, Sector 16B, Gautam Buddha Nagar, Greater Noida West, U.P. 201318
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Award size={20} style={{ color: 'var(--gold-deep)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Specialized Development Sector</div>
                    <div style={{ color: '#64748b', fontSize: '0.925rem' }}>
                      Plotted developments, smart industrial nodes, and high-growth capital investments
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <Image
                  src="/images/about-dholera.jpg"
                  alt="Om Swastik Buildhomes Corporate Vision"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Executive Board</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Leadership &amp; Directors
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Driven by experienced real-estate professionals dedicated to ethical plot allotment, clear legal titles, and transparent investor returns.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Rahul Bisht */}
            <div className="luxury-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(228, 170, 60, 0.35)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)' }}>
                <Image src="/images/directors/rahul-bisht.jpg" alt="Rahul Bisht — Director, Om Swastik Buildhomes" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Rahul Bisht</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 700, background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <Phone size={14} style={{ color: 'var(--primary)' }} /> +91 98104 84742
              </div>
            </div>

            {/* Praful Singh */}
            <div className="luxury-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(228, 170, 60, 0.35)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)' }}>
                <Image src="/images/directors/praful-singh.jpg" alt="Praful Singh — Director, Om Swastik Buildhomes" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Praful Singh</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 700, background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <Phone size={14} style={{ color: 'var(--primary)' }} /> +91 95992 13531
              </div>
            </div>

            {/* Santosh Gupta */}
            <div className="luxury-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(228, 170, 60, 0.35)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)' }}>
                <Image src="/images/directors/santosh-gupta.jpg" alt="Santosh Gupta — Director, Om Swastik Buildhomes" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Santosh Gupta</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 700, background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <Phone size={14} style={{ color: 'var(--primary)' }} /> +91 99908 42233
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
