import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import PlotInventoryViewer from '@/components/PlotInventoryViewer';
import HomeVideoGallery from '@/components/HomeVideoGallery';
import PricingSection from '@/components/PricingSection';
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
  Truck,
  BookOpen,
  Clock,
  Film
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

  // Fetch active videos for gallery
  const videos = await prisma.video.findMany({
    where: { isActive: true },
    orderBy: [
      { displayOrder: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  // Fetch published blog posts for homepage showcase
  const blogPosts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [
      { publishedAt: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 3
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

      {/* OFFICIAL PROJECT PRICING & PAYMENT PLAN */}
      <PricingSection id="pricing" />

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

      {/* INDUSTRIAL ECOSYSTEM & GLOBAL CONFIDENCE */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5rem 0', color: '#ffffff' }}>
        <div className="container-custom" style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Industrial Ecosystem
            </span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginTop: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
              Global Leaders Investing
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Major corporations are committing to Dholera&apos;s industrial ecosystem.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem 1.25rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '115px',
                  border: '1px solid rgba(228, 170, 60, 0.25)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', width: '170px', height: '60px' }}>
                  <Image
                    src={partner.src}
                    alt={`${partner.name} investing in Dholera`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GALLERY SECTION */}
      <HomeVideoGallery videos={videos} />

      {/* EXECUTIVE TEAM DIRECTORY */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', position: 'relative' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
              <Shield size={13} style={{ marginRight: '0.25rem' }} /> Leadership &amp; Advisory Board
            </span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', color: 'var(--primary-dark)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Connect Directly with Our Directors
            </h2>
            <p style={{ color: '#5e6d70', fontSize: '1.05rem', lineHeight: 1.7 }}>
              At Om Swastik Buildhomes, we uphold complete accountability. Speak directly with our founding directors for authentic plot allotment, legal title due diligence, and arranged Dholera SIR site visits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem', marginBottom: '2.5rem' }}>
            {/* Rahul Bisht */}
            <div
              className="luxury-card"
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(228, 170, 60, 0.35)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--gold))' }} />

              <div>
                {/* Executive Portrait */}
                <div
                  style={{
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 12px 28px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)',
                  }}
                >
                  <Image
                    src="/images/directors/rahul-bisht.jpg"
                    alt="Rahul Bisht — Director, Om Swastik Buildhomes"
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                  Rahul Bisht
                </h3>

                <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                  Director — Om Swastik Buildhomes
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
                </p>
              </div>

              {/* Action Buttons */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <a
                    href="tel:+919810484742"
                    className="btn-teal"
                    style={{
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={15} /> Call Direct
                  </a>
                  <a
                    href="https://wa.me/919810484742?text=Hi%20Rahul%20Bisht%20Ji%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera%20SIR.%20Please%20guide%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '0.75rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={12} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>+91 98104 84742</span>
                </div>
              </div>
            </div>

            {/* Praful Singh */}
            <div
              className="luxury-card"
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(228, 170, 60, 0.35)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--gold), var(--primary))' }} />

              <div>
                {/* Executive Portrait */}
                <div
                  style={{
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 12px 28px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)',
                  }}
                >
                  <Image
                    src="/images/directors/praful-singh.jpg"
                    alt="Praful Singh — Director, Om Swastik Buildhomes"
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                  Praful Singh
                </h3>

                <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                  Director — Om Swastik Buildhomes
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
                </p>
              </div>

              {/* Action Buttons */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <a
                    href="tel:+919599213531"
                    className="btn-teal"
                    style={{
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={15} /> Call Direct
                  </a>
                  <a
                    href="https://wa.me/919599213531?text=Hi%20Praful%20Singh%20Ji%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera%20SIR.%20Please%20guide%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '0.75rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={12} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>+91 95992 13531</span>
                </div>
              </div>
            </div>

            {/* Santosh Gupta */}
            <div
              className="luxury-card"
              style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(228, 170, 60, 0.35)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--gold))' }} />

              <div>
                {/* Executive Portrait */}
                <div
                  style={{
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 12px 28px rgba(0, 70, 74, 0.18), 0 0 0 4px #ffffff, 0 0 0 6px var(--gold)',
                  }}
                >
                  <Image
                    src="/images/directors/santosh-gupta.jpg"
                    alt="Santosh Gupta — Director, Om Swastik Buildhomes"
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                  Santosh Gupta
                </h3>

                <div style={{ color: 'var(--gold-deep)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
                  Director — Om Swastik Buildhomes
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P.
                </p>
              </div>

              {/* Action Buttons */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <a
                    href="tel:+919990842233"
                    className="btn-teal"
                    style={{
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={15} /> Call Direct
                  </a>
                  <a
                    href="https://wa.me/919990842233?text=Hi%20Santosh%20Gupta%20Ji%2C%20I%20am%20interested%20in%20Riddhi%20Premium%20Plots%20in%20Dholera%20SIR.%20Please%20guide%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '0.75rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={12} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>+91 99908 42233</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Leadership Trust Bar */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '1.25rem 2rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                100% Clear-Title Due Diligence
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                Direct Registered Remittances (Zero Middlemen)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                Personal VIP Dholera SIR Site Inspections
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG / MARKET INTELLIGENCE PREVIEW */}
      {blogPosts.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--ivory)', borderTop: '1px solid var(--grey-border)' }}>
          <div className="container-custom">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span className="gold-badge" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={13} /> Market Intelligence &amp; Research
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', margin: 0, color: 'var(--primary-dark)' }}>
                  Authoritative Dholera SIR Insights &amp; Guides
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                  Read comprehensive reports on semiconductor ecosystem progress, expressway connectivity, and legal diligence checklists.
                </p>
              </div>

              <Link
                href="/blog"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}
              >
                <span>View All Articles</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="luxury-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--grey-border)',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '210px',
                      backgroundColor: '#002528',
                      overflow: 'hidden',
                      display: 'block',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage || '/images/hero-dholera.jpg'}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(0, 37, 40, 0.9)',
                        color: 'var(--gold)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {post.category}
                    </span>
                  </Link>

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      {post.publishedAt && (
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      )}
                      {post.readTime && <span>• {post.readTime}</span>}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        margin: '0 0 1.25rem 0',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        marginTop: 'auto',
                      }}
                    >
                      <span>Read Full Report</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
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
