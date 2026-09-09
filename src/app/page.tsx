import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import PlotInventoryViewer from '@/components/PlotInventoryViewer';
import {
  ArrowRight,
  Shield,
  MapPin,
  TrendingUp,
  Compass,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  Building2,
  Zap,
  Globe2,
  Plane,
  Train,
  Anchor,
  Droplets,
  Sun,
  Truck
} from 'lucide-react';

export const revalidate = 60; // ISR every 60 seconds

export default async function HomePage() {
  // Fetch flagship project
  const project = await prisma.project.findUnique({
    where: { slug: 'riddhi' },
  });

  // Fetch available plots
  const plots = await prisma.plot.findMany({
    where: { projectId: project?.id || '' },
    orderBy: { plotNumber: 'asc' },
    take: 12,
  });

  // Fetch FAQs & Testimonials
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });

  const partnerLogos = [
    { name: 'Tata Electronics', src: '/images/logos/tata-electronics.png' },
    { name: 'Vedanta', src: '/images/logos/vedanta.png' },
    { name: 'Adani', src: '/images/logos/adani.png' },
    { name: 'Reliance', src: '/images/logos/reliance.png' },
    { name: 'L&T', src: '/images/logos/lt.png' },
    { name: 'Hitachi', src: '/images/logos/hitachi.png' },
    { name: 'Siemens', src: '/images/logos/siemens.png' },
    { name: 'Cisco', src: '/images/logos/cisco.png' },
  ];

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#00292c',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(228, 170, 60, 0.15), transparent 40%), linear-gradient(180deg, rgba(0, 54, 58, 0.75) 0%, rgba(16, 26, 29, 0.95) 100%)',
          overflow: 'hidden',
          paddingTop: '3rem',
          paddingBottom: '4rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-dholera.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span className="gold-badge">
                <Shield size={13} /> Presented by Om Swastik Buildhomes Pvt. Ltd.
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.12,
                marginBottom: '1.25rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Dholera Smart City
              <span style={{ display: 'block', color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>
                The Future of Smart Investment
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: '#e2e8f0',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '720px',
              }}
            >
              Explore <strong>Riddhi Premium Plots</strong> in Dholera SIR, Gujarat. Positioned strategically within the flagship Delhi–Mumbai Industrial Corridor (DMIC) with world-class planned expressways, international airport, and high-speed rail.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/projects/riddhi" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}>
                Explore Riddhi Plots
                <ArrowRight size={18} />
              </Link>
              <Link href="/plots" className="btn-secondary" style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}>
                View Available Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MACRO DHOLERA STATS COUNTER BAR */}
      <section style={{ backgroundColor: 'var(--primary-dark)', borderBottom: '1px solid rgba(228, 170, 60, 0.25)', padding: '2.5rem 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                920 <span style={{ fontSize: '1.4rem' }}>Sq. Km</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Total City Area
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Twice the size of Ahmedabad</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                422 <span style={{ fontSize: '1.4rem' }}>Sq. Km</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Developable Area
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Planned sustainable urban node</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                2.0 <span style={{ fontSize: '1.4rem' }}>Million</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Projected Population
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Global high-tech workforce</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                0.8 <span style={{ fontSize: '1.4rem' }}>Million</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Estimated Employment
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Semiconductor &amp; manufacturing</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT: RIDDHI SHOWCASE */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>
                Flagship Plotted Development
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>
                Riddhi Premium Plots
                <span style={{ display: 'block', fontSize: '1.25rem', color: 'var(--gold-deep)', fontStyle: 'italic', fontWeight: 400, marginTop: '0.25rem' }}>
                  Premium Plots | Prime Plots — Dholera SIR, Gujarat
                </span>
              </h2>

              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Riddhi is a thoughtfully designed plotted development by <strong>Om Swastik Buildhomes Pvt. Ltd.</strong>, positioned directly within the economic growth corridor of Dholera SIR. Created for forward-thinking investors, Riddhi offers verified clear-title plots with complete utility infrastructure planning.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                    Direct connectivity to <strong>250-meter wide Ahmedabad–Dholera Expressway</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                    Minutes from upcoming <strong>Dholera International Cargo &amp; Passenger Airport</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                    Plot dimensions from <strong>150 to 500 Sq. Yd.</strong> with 30ft &amp; 40ft wide internal paved roads
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                    Underground utilities, stormwater management, and 24x7 gated security infrastructure
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/projects/riddhi" className="btn-primary">
                  View Master Layout &amp; Project Details
                  <ArrowRight size={16} />
                </Link>
                <Link href="/plots" className="btn-outline-gold">
                  Explore Live Inventory
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
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
                  src="/images/riddhi-project.jpg"
                  alt="Riddhi Project Layout Dholera"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  background: 'var(--primary-dark)',
                  color: '#ffffff',
                  padding: '1.25rem 1.75rem',
                  borderRadius: '14px',
                  border: '2px solid var(--gold)',
                  boxShadow: 'var(--shadow-gold)',
                  maxWidth: '260px',
                }}
              >
                <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  Early Investor Opportunity
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.25rem' }}>
                  Plots from ₹11.25 Lakh
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                  Booking Token: ₹51,000 only
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLOT INVENTORY PREVIEW */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Real-Time Availability</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Available Plot Inventory
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Inspect live availability, facing, dimensions, and allotment status for Riddhi Premium Plots. Every plot is synchronized directly with our internal booking ledger.
            </p>
          </div>

          {/* Plot Inventory Component */}
          <PlotInventoryViewer plots={plots as any} projectName="Riddhi Premium Plots" projectId={project?.id} />

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/plots" className="btn-teal" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
              Open Full Plot Inventory Catalog
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 STRATEGIC GROWTH PILLARS OF DHOLERA */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>India&apos;s Greenfield Miracle</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Why Investors Are Choosing Dholera SIR
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Dholera is India&apos;s first greenfield industrial smart city, designed to meet the highest global benchmarks of urban mobility, governance, and sustainability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div className="luxury-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(228, 170, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', marginBottom: '1.25rem' }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>01. Strategic Connectivity</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Direct access via the 250m wide Ahmedabad–Dholera Expressway, upcoming Dholera International Airport, High-Speed Bullet Train node, and dedicated freight corridors.
              </p>
            </div>

            <div className="luxury-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>02. Government Backed</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Jointly promoted by the Central Government and Gujarat State Government under the Delhi–Mumbai Industrial Corridor (DMIC), administered by DICDL.
              </p>
            </div>

            <div className="luxury-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(228, 170, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', marginBottom: '1.25rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>03. Smart Infrastructure</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                ICT-enabled administration, 100% subterranean utility cabling, smart sensors, SCADA management, and 300 MW solar park clean energy grid.
              </p>
            </div>

            <div className="luxury-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Globe2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>04. Tourism &amp; Heritage</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Surrounded by UNESCO World Heritage Lothal Maritime Complex, Black Buck Sanctuary, and coastal eco-tourism zones driving massive regional demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS CAROUSEL */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '3.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Industrial Ecosystem &amp; Global Confidence
            </span>
            <h3 style={{ color: '#ffffff', fontSize: '1.8rem', marginTop: '0.25rem' }}>
              Global Leaders Investing in Dholera
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80px',
                }}
              >
                <div style={{ position: 'relative', width: '100px', height: '45px' }}>
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE TEAM DIRECTORY */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Leadership &amp; Advisory</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Connect Directly with Our Directors
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              At Om Swastik Buildhomes, we believe in direct transparency. Speak directly with our leadership team for investment consultation, plot allotment, or site visits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Rahul Bisht */}
            <div className="luxury-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                <Image src="/images/qr-rahul.png" alt="Rahul Bisht QR" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>Rahul Bisht</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a href="tel:+919810484742" className="btn-teal" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>
                  <Phone size={14} /> Call
                </a>
                <a
                  href="https://wa.me/919810484742?text=Hi%20Rahul%20Bisht%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Praful Singh */}
            <div className="luxury-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                <Image src="/images/qr-prafull.png" alt="Praful Singh QR" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>Praful Singh</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a href="tel:+919599213531" className="btn-teal" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>
                  <Phone size={14} /> Call
                </a>
                <a
                  href="https://wa.me/919599213531?text=Hi%20Praful%20Singh%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Santosh Gupta */}
            <div className="luxury-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                <Image src="/images/qr-santosh.png" alt="Santosh Gupta QR" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>Santosh Gupta</h3>
              <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                Director — Om Swastik Buildhomes
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a href="tel:+919990842233" className="btn-teal" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>
                  <Phone size={14} /> Call
                </a>
                <a
                  href="https://wa.me/919990842233?text=Hi%20Santosh%20Gupta%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Clear Answers</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--grey-border)',
                }}
              >
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  {faq.question}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
