import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import PlotInventoryViewer from '@/components/PlotInventoryViewer';
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  FileText,
  ShieldCheck,
  Compass,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      plots: {
        orderBy: { plotNumber: 'asc' },
      },
    },
  });

  if (!project) {
    notFound();
  }

  // Parse JSON data safely
  let highlights: string[] = [];
  try {
    if (project.highlights) highlights = JSON.parse(project.highlights);
  } catch {}

  let amenities: string[] = [];
  try {
    if (project.amenitiesList) amenities = JSON.parse(project.amenitiesList);
  } catch {}

  let landmarks: Array<{ name: string; distance: string }> = [];
  try {
    if (project.nearbyLandmarks) landmarks = JSON.parse(project.nearbyLandmarks);
  } catch {}

  let connectivity: string[] = [];
  try {
    if (project.connectivity) connectivity = JSON.parse(project.connectivity);
  } catch {}

  const availableCount = project.plots.filter((p) => p.status === 'AVAILABLE').length;

  return (
    <>
      <Navbar />

      {/* Project Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0',
          backgroundColor: '#002e32',
          backgroundImage: 'linear-gradient(rgba(0, 46, 50, 0.85), rgba(16, 26, 29, 0.95))',
          color: '#ffffff',
          borderBottom: '2px solid var(--gold)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${project.heroImage || '/images/hero-dholera.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="gold-badge">
                <ShieldCheck size={14} /> Developer Direct Allotment
              </span>
              <span style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                {project.reraNumber || 'Verified Clear Title'}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff', marginBottom: '0.5rem' }}>
              {project.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              <MapPin size={18} style={{ color: 'var(--gold)' }} />
              <span>{project.fullAddress || project.location}</span>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '2rem' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#inventory" className="btn-primary">
                View Available Plots ({availableCount} Open)
                <ArrowRight size={16} />
              </a>
              <a href="#site-layout" className="btn-secondary">
                Inspect Site Layout
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Master Specs */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            {/* Highlights */}
            <div>
              <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Investment Pillars</span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Project Highlights</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--gold-deep)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts Card */}
            <div>
              <div className="luxury-card" style={{ padding: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.75rem' }}>
                  Project Overview &amp; Specifications
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.925rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Project Type</span>
                    <strong style={{ color: 'var(--dark)' }}>{project.projectType.replace('_', ' ')}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Total Development Area</span>
                    <strong style={{ color: 'var(--dark)' }}>{project.totalProjectArea || '50 Acres'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Total Plots Planned</span>
                    <strong style={{ color: 'var(--dark)' }}>{project.totalPlots} Units</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Plot Dimensions Range</span>
                    <strong style={{ color: 'var(--dark)' }}>150 to 500 Sq. Yd.</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Internal Road Widths</span>
                    <strong style={{ color: 'var(--dark)' }}>30 Ft. &amp; 40 Ft. Paved</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Booking Advance</span>
                    <strong style={{ color: 'var(--primary)' }}>₹51,000 Only</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASTER SITE LAYOUT PLAN */}
      <section id="site-layout" className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Demarcated Master Plan</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Master Site Layout Plan
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Inspect the planned layout of Riddhi Premium Plots, highlighting demarcated blocks, wide paved roads, landscaped parks, and direct expressway feeder routes.
            </p>
          </div>

          <div
            className="luxury-card"
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '12px', overflow: 'hidden' }}>
              <Image
                src={project.siteLayoutImage || '/images/riddhi-project.jpg'}
                alt="Master Site Layout Plan - Riddhi"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Note: Plot boundaries are accurately mapped according to approved town planning standards.
              </span>
              <a
                href={project.siteLayoutImage || '/images/riddhi-project.jpg'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
              >
                Open Full Resolution Layout
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLOT INVENTORY COMPONENT */}
      <section id="inventory" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Direct Allotment Grid</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Live Plot Inventory for {project.name}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
              Filter by plot size, facing direction, corner status, or price. Submit your reservation request directly.
            </p>
          </div>

          <PlotInventoryViewer plots={project.plots as any} projectName={project.name} projectId={project.id} />
        </div>
      </section>

      {/* AMENITIES & INFRASTRUCTURE */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-dark)', color: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Planned Infrastructure</span>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Amenities &amp; Project Features
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>
              Built to the highest greenfield infrastructure benchmarks for high-value living and sustainable capital growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {amenities.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '1.75rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--gold)' }} />
                <span style={{ fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY LANDMARKS & CONNECTIVITY */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>Strategic Hub</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Connectivity &amp; Proximity
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {landmarks.map((lm, i) => (
              <div key={i} className="luxury-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-deep)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Nearby Catalyst
                </div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: '0.5rem 0' }}>
                  {lm.name}
                </h4>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {lm.distance}
                </div>
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
