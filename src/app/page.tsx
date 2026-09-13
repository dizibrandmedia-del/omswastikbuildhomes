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
  Film,
  Download,
  Award,
  Sparkles,
  ExternalLink,
  Cpu,
  Factory,
  Layers,
  Scale,
  Eye,
  Check
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

  // Fetch FAQs
  const faqs = await prisma.faq.findMany({
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

  const corporateCommitments = [
    { company: 'Tata Group', amount: '₹91,000 Cr', focus: 'Semiconductor Fab Plant' },
    { company: 'Reliance Industries', amount: '₹5.95 Lakh Cr', focus: 'Gujarat Green Energy Hub' },
    { company: 'Adani Group', amount: '₹3.00 Lakh Cr', focus: 'Hyperscale Data Center & Green Energy' },
    { company: 'Vedanta-Foxconn', amount: '₹1.54 Lakh Cr', focus: 'Semiconductor & Display Fabrication' },
    { company: 'Tsingshan Group', amount: '₹21,000 Cr', focus: 'EV Battery Manufacturing Facility' },
    { company: 'ReNew Power', amount: '₹12,000 Cr', focus: 'Solar & Clean Energy Plant' },
    { company: 'Next Gen & Hitachi', amount: '₹1,500 Cr', focus: 'Semiconductor Fab & Power Electronics' },
  ];

  const locationAdvantages = [
    { title: 'Metro Transit', subtitle: 'Ahmedabad-Dholera Vande Metro', img: '/images/brochure/adv-metro.webp' },
    { title: 'International Airport', subtitle: '1,426 Hectares Cargo & Passenger Hub', img: '/images/brochure/adv-airport.webp' },
    { title: 'Dedicated Freight Corridor', subtitle: 'Direct DMIC High-Speed Cargo Rail', img: '/images/brochure/adv-freight-corridor.webp' },
    { title: '250m Wide Expressway', subtitle: 'Ahmedabad–Dholera Access-Controlled Highway', img: '/images/brochure/adv-expressway.webp' },
    { title: 'Seaport Connectivity', subtitle: 'Strategic Maritime Access via Gulf of Khambhat', img: '/images/brochure/adv-seaport.webp' },
    { title: 'Lothal UNESCO Heritage', subtitle: 'National Maritime Heritage Complex', img: '/images/brochure/adv-lothal-unesco.webp' },
    { title: 'Black Buck Sanctuary', subtitle: 'Velavadar Protected Eco-Tourism Zone', img: '/images/brochure/adv-black-buck.webp' },
    { title: 'Kalpsar Dam Project', subtitle: 'Massive Freshwater & Tidal Reservoir Zone', img: '/images/brochure/adv-kalpsar-dam.webp' },
  ];

  const internationalBenchmarks = [
    { title: 'World Class Infrastructure', desc: 'SCADA-controlled subterranean utility tunnels.' },
    { title: 'Ease of Governance', desc: 'Single-window clearance by DICDL authority.' },
    { title: 'Plug & Play Land', desc: 'Pre-demarcated plots ready for construction.' },
    { title: 'Social Infrastructure', desc: 'Planned education, hospitals, and civic spaces.' },
    { title: 'Ease of Doing Business', desc: 'Streamlined statutory approvals and policies.' },
    { title: 'Fast Track Approvals', desc: 'Accelerated online clearances under SIR Act.' },
    { title: 'External Connectivity', desc: 'Expressways, airport, and freight corridors.' },
    { title: 'Security & Surveillance', desc: 'Integrated Command and Control Center (ICCC).' },
    { title: 'Internal Connectivity', desc: 'IBC-compliant multi-lane boulevard road grids.' },
    { title: 'Live Work Play', desc: 'Self-sustaining walk-to-work urban design.' },
    { title: 'Sustainability', desc: '100% wastewater recycling and green spaces.' },
    { title: 'Smart Technology', desc: 'Citywide IoT sensor network and fiber grid.' },
  ];

  const dholeraDimensions = [
    {
      title: 'Location',
      badge: 'Gulf of Khambhat',
      desc: 'Located in the Gulf of Khambhat, approximately 100 kilometers south of Ahmedabad, Gujarat’s largest commercial hub.'
    },
    {
      title: 'Purpose',
      badge: 'Global Investment Zone',
      desc: 'Creates a world-class infrastructure and support system to attract global capital, manufacturing, and technology enterprises.'
    },
    {
      title: 'Size & Scope',
      badge: '920 Sq. Km',
      desc: 'One of the largest planned greenfield industrial smart cities in India, spanning over 920 sq km (larger than Singapore).'
    },
    {
      title: 'Development Authority',
      badge: 'DICDL Administered',
      desc: 'Dholera Industrial City Development Limited (DICDL) is the nodal statutory agency responsible for planning, governance, and execution.'
    },
    {
      title: 'Infrastructure',
      badge: 'Underground Utilities',
      desc: 'Comprehensive infrastructure including multi-tier roads, smart water management, subterranean power, and planned social amenities.'
    },
    {
      title: 'Smart City Vision',
      badge: 'IoT & ICT Driven',
      desc: 'Envisioned as a greenfield smart city incorporating IoT analytics, sensor grids, and sustainable practices to elevate quality of life.'
    },
    {
      title: 'Investment Opportunities',
      badge: 'High Growth Potential',
      desc: 'Extensive plotted development and commercial opportunities across semiconductor manufacturing, clean energy, and logistics.'
    },
    {
      title: 'Government Support',
      badge: 'Centre & State Backed',
      desc: 'Strong institutional backing with policy incentives, single-window clearances, and dedicated industrial development subsidies.'
    },
  ];

  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/* 1. HOMEPAGE HERO SECTION — EXACT BROCHURE PAGE 1 ENTRANCE GATE */}
      {/* ============================================================ */}
      <section
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#00292c',
          overflow: 'hidden',
          paddingTop: '4rem',
          paddingBottom: '4.5rem',
        }}
      >
        {/* Background Gate Photograph from Brochure Page 1 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/brochure/hero-gate.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            filter: 'brightness(1.08) contrast(1.05) saturate(1.05)',
            zIndex: 0,
          }}
        />

        {/* Clear, refined gradient overlay that protects text contrast while leaving the gate photo vibrant and clear */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0, 30, 33, 0.85) 0%, rgba(0, 32, 35, 0.68) 45%, rgba(0, 35, 38, 0.22) 75%, rgba(0, 35, 38, 0.04) 100%), linear-gradient(180deg, rgba(0, 25, 28, 0.3) 0%, rgba(0, 0, 0, 0) 35%, rgba(10, 20, 22, 0.45) 100%)',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="gold-badge" style={{ fontSize: '0.85rem', letterSpacing: '0.04em' }}>
                <Shield size={14} /> Om Swastik Buildhomes Pvt. Ltd. • CIN: U41000UW2026PTC256814
              </span>
            </div>

            <div style={{ color: 'var(--gold-light)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              India&apos;s 1st Greenfield Smart City • Dholera SIR
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.12,
                marginBottom: '0.75rem',
                textShadow: '0 2px 14px rgba(0,0,0,0.4)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              OM SWASTIK RIDDHI
              <span style={{ display: 'block', color: 'var(--gold)', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)', marginTop: '0.25rem' }}>
                Premium Plots | Prime Plots
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#f1f5f9',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '720px',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              A flagship plotted residency at <strong>Kamiyala, Dholera SIR</strong>. Positioned strategically within the Delhi–Mumbai Industrial Corridor (DMIC) with seamless access to the 250m Expressway, Dholera International Airport, and Ahmedabad-Dholera Vande Metro.
            </p>

            {/* Key Value Badges */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(228, 170, 60, 0.4)', color: '#ffffff', fontSize: '0.85rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gold)' }} />
                <span>Verified Clear-Title Land</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(228, 170, 60, 0.4)', color: '#ffffff', fontSize: '0.85rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gold)' }} />
                <span>Immediate Registry Ready</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(228, 170, 60, 0.4)', color: '#ffffff', fontSize: '0.85rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--gold)' }} />
                <span>Plots from ₹11.25 Lakh</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/projects/riddhi" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}>
                Explore Riddhi
                <ArrowRight size={18} />
              </Link>
              <Link href="#inventory" className="btn-secondary" style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}>
                View Available Plots
              </Link>
              <button
                type="button"
                data-action="open-visit"
                id="hero-book-sitevisit-btn"
                className="btn-outline-gold"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.85rem', cursor: 'pointer', background: 'transparent' }}
              >
                <Calendar size={18} style={{ marginRight: '0.4rem' }} />
                Book a Site Visit
              </button>
              <button
                type="button"
                data-action="download-brochure"
                id="hero-download-brochure-btn"
                className="btn-outline"
                style={{
                  fontSize: '1rem',
                  padding: '0.9rem 1.6rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.4)',
                  background: 'transparent',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Download size={16} />
                <span>Download Brochure</span>
              </button>
              <button
                type="button"
                data-action="download-masterplan"
                id="hero-download-masterplan-btn"
                className="btn-outline"
                style={{
                  fontSize: '1rem',
                  padding: '0.9rem 1.6rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                  borderColor: 'rgba(228, 170, 60, 0.75)',
                  backgroundColor: 'rgba(0, 54, 58, 0.45)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Download size={16} style={{ color: 'var(--gold)' }} />
                <span>Download Master Plan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MACRO DHOLERA SIR MASTER PLAN STATS BAR */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: 'var(--primary-dark)', borderBottom: '1px solid rgba(228, 170, 60, 0.25)', padding: '2.5rem 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                920 <span style={{ fontSize: '1.4rem' }}>Sq. Km</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Total Planned Area
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dholera Special Investment Region</div>
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
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Planned smart city capacity</div>
            </div>

            <div>
              <div style={{ fontSize: '2.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
                0.8 <span style={{ fontSize: '1.4rem' }}>Million</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Estimated Employment
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Manufacturing, tech &amp; logistics jobs</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BROCHURE PAGE 2: WHERE VISION MEETS OPPORTUNITY */}
      {/* ============================================================ */}
      <section
        style={{
          position: 'relative',
          padding: '5.5rem 0',
          backgroundColor: '#00363a',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* Backdrop Visual from Brochure Page 2 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/brochure/vision-skyline.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>
              Why Investors Are Choosing Dholera
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', color: '#ffffff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              WHERE VISION MEETS OPPORTUNITY
            </h2>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Dholera is India&apos;s first planned Greenfield Smart City, developed under the Delhi–Mumbai Industrial Corridor (DMIC). Spread across <strong>920 sq km</strong>, it is engineered to become a global hub for manufacturing, technology, and logistics.
            </p>
          </div>

          {/* SIR Act 2009 Subsection Card */}
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto 3.5rem',
              backgroundColor: 'rgba(0, 41, 44, 0.85)',
              border: '1px solid rgba(228, 170, 60, 0.4)',
              borderRadius: '16px',
              padding: '2rem 2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                <Scale size={26} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--gold)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    Special Investment Region (SIR) Act, 2009
                  </h3>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(228, 170, 60, 0.25)', color: 'var(--gold-light)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                    Government of Gujarat
                  </span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
                  The Special Investment Region (SIR) Act, enacted in 2009 by the Government of Gujarat, establishes the statutory framework for developing large-scale investment zones with world-class infrastructure, efficient governance, single-window statutory clearances, and fast-track industrial growth.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid from Brochure Page 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(228, 170, 60, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(6px)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                Strategic Connectivity (MMTS)
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Seamless access via the 250m wide Ahmedabad–Dholera Expressway, upcoming international airport, and major multi-modal freight corridors.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(228, 170, 60, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                Government Backed Project
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Integral part of the Delhi–Mumbai Industrial Corridor (DMIC), backed by central and Gujarat state policies, master-planned by statutory bodies.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(228, 170, 60, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                <Zap size={24} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Smart Infrastructure
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Master-Planned by Halcrow (UK)
              </span>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Planned urban ecosystem with ICT-monitored underground utilities, sustainable stormwater systems, and 24x7 smart mobility networks.
              </p>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(228, 170, 60, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228, 170, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                <Globe2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                Tourism (LADA &amp; Black Buck)
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                National Maritime Heritage Complex (NMHC) at Lothal and nearby coastal eco-tourism reserves transforming Dholera into a premier tourist hub.
              </p>
            </div>
          </div>

          {/* Slogan Banner from Brochure Page 2 */}
          <div
            style={{
              textAlign: 'center',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(90deg, rgba(228, 170, 60, 0.1), rgba(228, 170, 60, 0.25), rgba(228, 170, 60, 0.1))',
              borderRadius: '12px',
              border: '1px solid rgba(228, 170, 60, 0.4)',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '1.35rem', color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}>
              &ldquo;The Early Investor Gains the Advantage.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. BROCHURE PAGE 3: THE NEXT MAJOR ECONOMIC HUB */}
      {/* ============================================================ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', position: 'relative' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
              Dholera — India&apos;s 1st Greenfield Smart City
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', color: 'var(--primary-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              The Next Major Economic Hub
            </h2>
            <div style={{ fontSize: '1.25rem', color: 'var(--gold-deep)', fontStyle: 'italic', fontWeight: 500, marginBottom: '1rem' }}>
              A City Designed for Tomorrow&apos;s Growth
            </div>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              From a dedicated 1,426-hectare international cargo and passenger airport to ultra-mega clean energy parks, Dholera SIR is being developed as India&apos;s premier multi-modal trade, aviation, and semiconductor manufacturing center.
            </p>
          </div>

          {/* Aerial Visual Showcase with Key Annotations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '480px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 46, 50, 0.18)',
                  border: '2px solid rgba(228, 170, 60, 0.35)',
                }}
              >
                <Image
                  src="/images/brochure/economic-hub-aerial.webp"
                  alt="Dholera International Airport, Expressway NE-8, and Solar Park Aerial View"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Annotation Overlays matching Brochure Page 3 */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(0, 41, 44, 0.88)',
                  color: '#ffffff',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--gold)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                ✈️ Dholera International Airport
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  background: 'rgba(0, 41, 44, 0.88)',
                  color: '#ffffff',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--gold)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                🛣️ Expressway NE - 8
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  background: 'rgba(0, 41, 44, 0.88)',
                  color: '#ffffff',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--gold)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                ☀️ 4,400 MW Solar Park
              </div>
            </div>

            {/* Growth Drivers Details */}
            <div>
              <div style={{ display: 'inline-block', color: 'var(--gold-deep)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                Key Strategic Catalysts
              </div>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                Dholera SIR Growth Drivers
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Plane size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary-dark)' }}>Dholera International Airport (1,426 Ha)</h4>
                      <span style={{ fontSize: '0.7rem', background: '#dbeafe', color: '#1e40af', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Under Development</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                      A large-scale greenfield international airport enhancing global cargo and passenger connectivity and driving long-term economic expansion.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(228, 170, 60, 0.15)', color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Train size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary-dark)' }}>High-Speed Rail &amp; Vande Metro</h4>
                      <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Under Construction</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                      Fast, efficient transport linking Dholera to Ahmedabad, Gandhinagar, and Mumbai in record transit times.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Anchor size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary-dark)' }}>Seaport Maritime Access</h4>
                      <span style={{ fontSize: '0.7rem', background: '#e0e7ff', color: '#3730a3', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Planned Infrastructure</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                      Strategic maritime trade access through the Gulf of Khambhat enabling seamless global container shipping and export logistics.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(228, 170, 60, 0.15)', color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sun size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary-dark)' }}>4,400 MW Ultra-Mega Solar Park</h4>
                      <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Clean Energy Corridor</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                      One of Asia&apos;s largest planned renewable solar energy parks providing continuous green, zero-carbon electricity to Dholera SIR.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 70, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary-dark)' }}>Logistics &amp; Industrial Corridor (NE-8 &amp; DFC)</h4>
                      <span style={{ fontSize: '0.7rem', background: '#dbeafe', color: '#1e40af', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Operational &amp; Expanding</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                      Integrated connectivity via expressway corridors positioning Dholera as Western India&apos;s central freight and distribution hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan Banner from Brochure Page 3 */}
          <div
            style={{
              textAlign: 'center',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(90deg, #002e32, #00464a, #002e32)',
              borderRadius: '12px',
              border: '1px solid rgba(228, 170, 60, 0.4)',
              color: '#ffffff',
              maxWidth: '780px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ fontSize: '1.35rem', color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}>
              &ldquo;Early Investors Build Generational Wealth.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. BROCHURE PAGE 4: GLOBAL LEADERS INVESTING */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5.5rem 0', color: '#ffffff', position: 'relative' }}>
        <div className="container-custom" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Industrial Ecosystem
            </span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', marginTop: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
              Global Leaders Investing
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
              Major multinational corporations are committing billions of rupees to Dholera&apos;s industrial and semiconductor ecosystem.
            </p>
          </div>

          {/* Corporate Commitments Cards from Brochure Page 4 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3.5rem',
            }}
          >
            {corporateCommitments.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(228, 170, 60, 0.3)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.company}
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--gold)', margin: '0.35rem 0', fontFamily: 'var(--font-heading)' }}>
                    {item.amount}
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#e2e8f0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  {item.focus}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Leading Corporate Conglomerates Active in Dholera Ecosystem
            </div>
          </div>

          {/* Logos Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.25rem 1rem',
                  borderRadius: '14px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100px',
                  border: '1px solid rgba(228, 170, 60, 0.25)',
                }}
              >
                <div style={{ position: 'relative', width: '150px', height: '52px' }}>
                  <Image
                    src={partner.src}
                    alt={`${partner.name} in Dholera`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Legal/Disclaimer Note as per Section 10 of Prompt */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', maxWidth: '800px', margin: '0 auto' }}>
            *Disclaimer: Corporate references and investment figures are presented as part of the broader Dholera SIR industrial ecosystem as referenced in public documentation and master planning records. These represent independent corporate commitments within Dholera SIR.
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BROCHURE PAGE 5: LOCATION ADVANTAGES & INTERNATIONAL BENCHMARK */}
      {/* ============================================================ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="gold-badge">
                <Award size={14} /> IGBC Certified Platinum Rated City
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', color: 'var(--primary-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              Location Advantages (Dholera SIR)
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Dholera SIR occupies an unmatched strategic geography in Western India, connected seamlessly to high-capacity logistics, multi-modal expressways, and global trade waterways.
            </p>
          </div>

          {/* Central Smart Terminal Hub Visual */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '980px',
              height: '380px',
              margin: '0 auto 3.5rem',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 46, 50, 0.15)',
              border: '2px solid rgba(228, 170, 60, 0.3)',
            }}
          >
            <Image
              src="/images/brochure/smart-terminal-hub.webp"
              alt="Dholera Smart City Terminal Hub & Monorail Spine"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 100vw, 980px"
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(0, 41, 44, 0.9)',
                color: 'var(--gold)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(228, 170, 60, 0.4)',
              }}
            >
              Dholera Central Transit Hub &amp; Monorail Spine
            </div>
          </div>

          {/* 8 Circular Photo Cards from Brochure Page 5 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.75rem',
              marginBottom: '5rem',
            }}
          >
            {locationAdvantages.map((item, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '16px',
                  border: '1px solid var(--grey-border)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    boxShadow: '0 8px 20px rgba(0, 70, 74, 0.2)',
                    border: '3px solid var(--gold)',
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="90px"
                  />
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* International Benchmark 12-Item Grid */}
          <div
            style={{
              backgroundColor: 'var(--ivory)',
              borderRadius: '24px',
              padding: '3.5rem 2.5rem',
              border: '1px solid rgba(228, 170, 60, 0.3)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: '#00292c', padding: '0.35rem 1.25rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                International Benchmark
              </div>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                Engineered to Global Smart City Standards
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Benchmarked against international industrial powerhouses like Singapore and Songdo to provide friction-free commercial and residential living.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {internationalBenchmarks.map((bench, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                  }}
                >
                  <div style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--primary-dark)', fontSize: '0.95rem' }}>
                      {bench.title}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.4, marginTop: '0.2rem' }}>
                      {bench.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BROCHURE PAGE 6: DHOLERA SIR — SPECIAL INVESTMENT REGION */}
      {/* ============================================================ */}
      <section
        style={{
          position: 'relative',
          padding: '5.5rem 0',
          backgroundColor: '#00292c',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* Real Photograph of Dholera Boulevard & Canal */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/brochure/dholera-canal-boulevard.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
              Planned Industrial Township
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              DHOLERA SIR
            </h2>
            <div style={{ fontSize: '1.25rem', color: 'var(--gold)', fontStyle: 'italic', fontWeight: 500, marginBottom: '1rem' }}>
              Special Investment Region
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Spanning <strong>920 sq km</strong>, Dholera SIR is one of India&apos;s most ambitious greenfield urban ventures, designed with integrated ICT command centers, dedicated green corridors, and comprehensive industrial zoning.
            </p>
          </div>

          {/* 8 Dimension Cards from Brochure Page 6 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            {dholeraDimensions.map((dim, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(0, 41, 44, 0.75)',
                  border: '1px solid rgba(228, 170, 60, 0.3)',
                  borderRadius: '14px',
                  padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {dim.title}
                  </h3>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(228, 170, 60, 0.2)', color: 'var(--gold-light)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                    {dim.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  {dim.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Other Features & Planned Metrics Callout from Brochure Page 6 */}
          <div className="blueprint-card">
            <div>
              <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                Brochure Infrastructure Blueprint
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', color: '#ffffff', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}>
                Other Features of Dholera SIR
              </h3>

              <div className="blueprint-features-grid">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Central Spine 250m Wide Expressway</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Metro Rail Transit System</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Mono Rail Transit System</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Dedicated Cycle Track Network</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Shaded (Green) Pedestrian Walkways</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Intelligent Traffic Management (ITM)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>24x7 Security &amp; Surveillance Network</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Road Design Based on IBC Standards</span>
                </div>
              </div>
            </div>

            {/* Planned Macro Projections Badge Box */}
            <div className="blueprint-metrics-box">
              <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
                Official Master Plan Metrics
              </div>

              <div className="blueprint-metrics-grid">
                <div>
                  <div className="blueprint-metric-val" style={{ color: '#ffffff' }}>
                    920 <span className="unit">SQ. KM</span>
                  </div>
                  <div className="blueprint-metric-lbl">
                    Total Area
                  </div>
                </div>

                <div>
                  <div className="blueprint-metric-val" style={{ color: '#ffffff' }}>
                    422 <span className="unit">SQ. KM</span>
                  </div>
                  <div className="blueprint-metric-lbl">
                    Developable Area
                  </div>
                </div>

                <div>
                  <div className="blueprint-metric-val" style={{ color: 'var(--gold)' }}>
                    2.0 <span className="unit">MILLION</span>
                  </div>
                  <div className="blueprint-metric-lbl">
                    Projected Population
                  </div>
                </div>

                <div>
                  <div className="blueprint-metric-val" style={{ color: 'var(--gold)' }}>
                    0.8 <span className="unit">MILLION</span>
                  </div>
                  <div className="blueprint-metric-lbl">
                    Estimated Employment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FEATURED PROJECT: RIDDHI PREMIUM PLOTS (KAMIYALA) */}
      {/* ============================================================ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>
                Flagship Plotted Residency • Kamiyala
              </span>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                RIDDHI
                <span style={{ display: 'block', fontSize: '1.35rem', color: 'var(--gold-deep)', fontStyle: 'italic', fontWeight: 500, marginTop: '0.25rem' }}>
                  PREMIUM PLOTS | PRIME PLOTS
                </span>
              </h2>

              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                <strong>Riddhi</strong> is an exclusive plotted community presented by <strong>Om Swastik Buildhomes Pvt. Ltd.</strong>, positioned directly within the economic growth corridor of Dholera SIR at Kamiyala. Created for forward-thinking investors, Riddhi offers verified clear-title residential and commercial plots with comprehensive utility planning.
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
                    Underground electrification, stormwater management, and 24x7 gated security infrastructure
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/projects/riddhi" className="btn-primary">
                  View Master Layout &amp; Project Details
                  <ArrowRight size={16} />
                </Link>
                <Link href="#inventory" className="btn-outline-gold">
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
                  alt="Riddhi Project Layout Kamiyala Dholera"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* ============================================================ */}
      {/* 8. INTERACTIVE PLOT INVENTORY PREVIEW (DATABASE-CONNECTED) */}
      {/* ============================================================ */}
      <section id="inventory" className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Real-Time Availability</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              Available Plot Inventory
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Inspect live availability, facing, dimensions, and allotment status for Riddhi Premium Plots. Every plot is synchronized directly with our booking ledger.
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

      {/* ============================================================ */}
      {/* 9. OFFICIAL PROJECT PRICING & PAYMENT PLAN */}
      {/* ============================================================ */}
      <PricingSection id="pricing" />

      {/* ============================================================ */}
      {/* 10. VIDEO GALLERY SECTION */}
      {/* ============================================================ */}
      <div id="videos">
        <HomeVideoGallery videos={videos} />
      </div>

      {/* ============================================================ */}
      {/* 11. EXECUTIVE TEAM DIRECTORY & ACCOUNTABILITY */}
      {/* ============================================================ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', position: 'relative' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
              <Shield size={13} style={{ marginRight: '0.25rem' }} /> Leadership &amp; Advisory Board
            </span>
            <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', color: 'var(--primary-dark)', marginBottom: '0.75rem', lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>
              Connect Directly with Our Directors
            </h2>
            <p style={{ color: '#5e6d70', fontSize: '1.05rem', lineHeight: 1.7 }}>
              At Om Swastik Buildhomes, we uphold complete transparency. Speak directly with our founding directors for authentic plot allotment, legal title due diligence, and arranged Dholera SIR site inspections.
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
                Arranged VIP Dholera SIR Site Inspections
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. BLOG / MARKET INTELLIGENCE PREVIEW */}
      {/* ============================================================ */}
      {blogPosts.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--ivory)', borderTop: '1px solid var(--grey-border)' }}>
          <div className="container-custom">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span className="gold-badge" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={13} /> Market Intelligence &amp; Research
                </span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', margin: 0, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                  Authoritative Dholera SIR Insights &amp; Guides
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                  Read verified reports on semiconductor ecosystem milestones, expressway progress, and land diligence checklists.
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

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1.35, marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>
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

      {/* ============================================================ */}
      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      {/* ============================================================ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Clear Answers</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'var(--font-heading)' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>
              Common questions about Dholera SIR investment regulations, title registry, and Riddhi plotted layouts.
            </p>
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
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
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

      {/* ============================================================ */}
      {/* 14. STATUTORY TRUST & DISCLAIMER FOOTNOTE (SECTION 22) */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: '#f1f5f9', padding: '2rem 0', borderTop: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b' }}>
        <div className="container-custom" style={{ maxWidth: '1000px', textAlign: 'center', lineHeight: 1.6 }}>
          <strong>Statutory Disclosure &amp; Investment Disclaimer:</strong> The information presented on this website and within the official project brochure is compiled for informational and illustrative purposes only. All infrastructure developments (including the Dholera International Airport, Expressway NE-8, High-Speed Vande Metro, and 4,400 MW Solar Park) represent planned or under-development governmental and public-private partnership initiatives under the Delhi-Mumbai Industrial Corridor (DMIC) and Gujarat SIR Act, 2009. Om Swastik Buildhomes Pvt. Ltd. does not promise guaranteed financial returns, guaranteed market appreciation, or guaranteed completion timelines for third-party public infrastructure. All plot purchases are subject to registered sale agreements, applicable municipal guidelines, and buyer title due diligence.
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
