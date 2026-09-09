import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import {
  Compass,
  ArrowRight,
  Plane,
  Train,
  Anchor,
  Truck,
  Sun,
  Shield,
  Zap,
  Building,
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Dholera SIR Guide | India’s First Smart Industrial City | Om Swastik Buildhomes',
  description: 'In-depth analysis of Dholera Special Investment Region (SIR), DMIC connectivity, expressways, international airport, and semiconductor manufacturing investments.',
};

export default function DholeraLocationPage() {
  const drivers = [
    {
      title: 'Dholera International Airport',
      desc: 'Planned world-class international cargo and passenger hub designed to handle massive domestic and global traffic, facilitating seamless export for semiconductor and industrial corridors.',
      icon: <Plane size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Ahmedabad–Dholera Expressway',
      desc: '250-meter wide, 109 km access-controlled expressway connecting Ahmedabad directly to Dholera in under 45 minutes, creating a unified economic metropolitan corridor.',
      icon: <Truck size={24} style={{ color: 'var(--primary)' }} />,
    },
    {
      title: 'High-Speed Rail & Metro',
      desc: 'Integration with the Western High-Speed Bullet train corridor and dedicated regional metro transit line linking Gandhinagar, Ahmedabad, and Dholera.',
      icon: <Train size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Dedicated Freight Corridor (DFC)',
      desc: 'Direct logistical connection to the Western Dedicated Freight Corridor for rapid container transit to Mundra and Pipavav ports.',
      icon: <Anchor size={24} style={{ color: 'var(--primary)' }} />,
    },
    {
      title: '300 MW Ultra Mega Solar Park',
      desc: 'One of the world’s most advanced green energy parks powering Dholera’s heavy industries, data centers, and semiconductor foundries with clean, sustainable power.',
      icon: <Sun size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Semiconductor & Global Foundries',
      desc: 'Anchored by multi-billion dollar investments by Tata Electronics, Vedanta, and global tier-1 tech suppliers establishing India’s first major chip fabrication ecosystem.',
      icon: <Zap size={24} style={{ color: 'var(--primary)' }} />,
    },
  ];

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Economic Master Node</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            Dholera Special Investment Region (SIR)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Spanning 920 square kilometers—twice the size of Ahmedabad—Dholera is India&apos;s pioneering greenfield smart city, engineered from the ground up for global manufacturing, clean technology, and premium living.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Government Backed</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
                A Visionary Greenfield City
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Developed by <strong>Dholera Industrial City Development Limited (DICDL)</strong> in partnership with the Government of Gujarat and Central Government under the Delhi–Mumbai Industrial Corridor (DMIC), Dholera features underground ICT cabling, SCADA water grids, automated waste management, and dedicated industrial zoning.
              </p>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Om Swastik Buildhomes is actively developing <strong>Riddhi Premium Plots</strong> within this high-growth ecosystem, offering early investors exceptional value appreciation.
              </p>

              <Link href="/projects/riddhi" className="btn-primary">
                Explore Riddhi Plots in Dholera
                <ArrowRight size={16} />
              </Link>
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
                  alt="Dholera Smart City Infrastructure"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Macro Economic Drivers */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Infrastructure Corridors</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              6 Major Growth Drivers
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Multi-billion dollar infrastructure projects currently transforming Dholera into India&apos;s most advanced industrial metropolis.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {drivers.map((d, i) => (
              <div key={i} className="luxury-card" style={{ padding: '2rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
                  {d.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                  {d.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ backgroundColor: 'var(--primary)', color: '#ffffff', padding: '4.5rem 0', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '750px' }}>
          <span className="gold-badge" style={{ marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--gold-light)' }}>
            Invest Early. Gain Advantage.
          </span>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Secure Your Plotted Asset in Dholera SIR
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Demarcated clear-title plots available starting at ₹11.25 Lakh. Direct site visit pickup arranged from Ahmedabad.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/plots" className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
              Check Plot Availability
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
              Connect with Director Desk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
