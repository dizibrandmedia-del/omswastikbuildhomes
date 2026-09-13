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
  CheckCircle2,
  Download,
  Scale,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Dholera SIR Guide | India’s First Smart Industrial City | Om Swastik Buildhomes',
  description: 'In-depth analysis of Dholera Special Investment Region (SIR), DMIC connectivity, expressways, 1426 Ha international airport, 4400 MW solar park, and semiconductor investments.',
};

export default function DholeraLocationPage() {
  const drivers = [
    {
      title: 'Dholera International Airport (1,426 Ha)',
      status: 'Under Development',
      desc: 'Planned world-class international cargo and passenger hub designed to handle massive domestic and global traffic, facilitating seamless export for semiconductor and industrial corridors.',
      icon: <Plane size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Ahmedabad–Dholera Expressway (NE-8)',
      status: 'Under Construction / Active',
      desc: '250-meter wide, access-controlled expressway connecting Ahmedabad directly to Dholera in under 45 minutes, creating a unified economic metropolitan corridor.',
      icon: <Truck size={24} style={{ color: 'var(--primary)' }} />,
    },
    {
      title: 'High-Speed Rail & Vande Metro',
      status: 'Under Construction',
      desc: 'Integration with the Western High-Speed Bullet train corridor and dedicated regional Vande Metro transit line linking Gandhinagar, Ahmedabad, and Dholera.',
      icon: <Train size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Dedicated Freight Corridor (DFC)',
      status: 'Operational Logistics',
      desc: 'Direct logistical connection to the Western Dedicated Freight Corridor for rapid container transit to Mundra and Pipavav deep-water ports.',
      icon: <Anchor size={24} style={{ color: 'var(--primary)' }} />,
    },
    {
      title: '4,400 MW Ultra Mega Solar Park',
      status: 'Renewable Clean Energy',
      desc: 'One of the world’s most advanced ultra-mega solar energy parks powering Dholera’s heavy industries, data centers, and chip foundries with clean power.',
      icon: <Sun size={24} style={{ color: 'var(--gold-deep)' }} />,
    },
    {
      title: 'Semiconductor & Global Foundries',
      status: 'Industrial Ecosystem',
      desc: 'Anchored by multi-billion dollar commitments from Tata Electronics, Vedanta, and global tier-1 tech suppliers establishing India’s first major chip fab.',
      icon: <Zap size={24} style={{ color: 'var(--primary)' }} />,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '6rem 0 5rem',
          backgroundColor: '#00292c',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/brochure/economic-hub-aerial.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 41, 44, 0.85) 0%, rgba(16, 26, 29, 0.95) 100%)',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>
            <Award size={14} style={{ marginRight: '0.35rem' }} /> India&apos;s 1st Greenfield Smart City • DMIC Node
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
            Dholera Special Investment Region (SIR)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '750px', lineHeight: 1.6, marginBottom: '2rem' }}>
            Spanning 920 square kilometers—twice the size of Ahmedabad—Dholera is India&apos;s pioneering greenfield smart city, engineered from the ground up for global manufacturing, clean technology, and premium plotted communities like <strong>Riddhi</strong>.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/projects/riddhi" className="btn-primary">
              Explore Riddhi Plots
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              data-action="download-brochure"
              className="btn-outline-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'transparent' }}
            >
              <Download size={16} />
              Download Official Brochure
            </button>
            <button
              type="button"
              data-action="download-masterplan"
              className="btn-outline-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'transparent' }}
            >
              <Download size={16} />
              Master Plan (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Overview & SIR Act */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Government Backed</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                A Visionary Greenfield City
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Administered by <strong>Dholera Industrial City Development Limited (DICDL)</strong> under the Government of Gujarat and Central Government&apos;s Delhi–Mumbai Industrial Corridor (DMIC), Dholera features underground ICT cabling, SCADA water grids, automated waste management, and dedicated industrial zoning.
              </p>

              {/* SIR Act 2009 note */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid var(--gold)',
                  borderRadius: '8px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Scale size={18} style={{ color: 'var(--gold-deep)' }} />
                  <strong style={{ color: 'var(--primary-dark)' }}>Special Investment Region (SIR) Act, 2009</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                  Enacted in 2009 by the Government of Gujarat to provide a clear statutory framework for large-scale investment zones with world-class infrastructure, efficient governance, and fast-track industrial growth.
                </p>
              </div>

              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Om Swastik Buildhomes presents <strong>Riddhi Premium Plots</strong> at Kamiyala within this growth corridor, offering early investors clear-title plotted assets.
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
                  src="/images/brochure/dholera-canal-boulevard.webp"
                  alt="Dholera Smart City Boulevard and Canal Infrastructure"
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
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              6 Major Growth Drivers
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Multi-billion dollar infrastructure projects currently transforming Dholera into India&apos;s most advanced industrial metropolis.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {drivers.map((d, i) => (
              <div key={i} className="luxury-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                    {d.icon}
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(228, 170, 60, 0.15)', color: 'var(--gold-deep)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                    {d.status}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
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
            The Early Investor Gains the Advantage
          </span>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Secure Your Plotted Asset in Dholera SIR
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Demarcated clear-title plots available starting at ₹26 Lakh. Direct site visit pickup arranged from Ahmedabad.
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
