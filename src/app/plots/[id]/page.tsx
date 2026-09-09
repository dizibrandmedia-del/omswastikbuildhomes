import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import { formatCurrency, getPlotStatusBadgeClass } from '@/lib/utils';
import {
  Compass,
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  MapPin
} from 'lucide-react';
import PlotDetailActions from './PlotDetailActions';

interface PlotDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const plots = await prisma.plot.findMany({ select: { id: true } });
  return plots.map((p) => ({ id: p.id }));
}

export default async function PlotDetailPage({ params }: PlotDetailPageProps) {
  const { id } = await params;

  const plot = await prisma.plot.findUnique({
    where: { id },
    include: { project: true },
  });

  if (!plot) {
    notFound();
  }

  const isAvailable = plot.status === 'AVAILABLE';
  const isHold = plot.status === 'HOLD';

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '3.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Link
              href="/plots"
              style={{
                color: '#cbd5e1',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <ArrowLeft size={16} /> Back to Plot Inventory
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>Plot #{plot.plotNumber}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', color: '#ffffff', margin: 0 }}>
                  Plot #{plot.plotNumber}
                </h1>
                <span className={getPlotStatusBadgeClass(plot.status)} style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
                  {plot.status}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
                {plot.project.name} &bull; {plot.project.location}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Property Value</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-body)', letterSpacing: '-0.02em' }}>
                {formatCurrency(plot.priceTotal)}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                ₹{plot.pricePerUnit.toLocaleString('en-IN')} / Sq. Yd.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {/* Plot Technical Specifications */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Plot Specifications</h2>

              <div className="luxury-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.95rem' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Plot Area (Sq. Yd.)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>
                      {plot.sizeSqYd} Sq. Yd.
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({plot.sizeSqFt} Sq. Ft.)</div>
                  </div>

                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Facing Direction</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>
                      {plot.facing.replace('_', ' ')} Facing
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>Vastu Compliant</div>
                  </div>

                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Front Road Width</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>
                      {plot.roadWidthFt} Feet
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Paved internal road</div>
                  </div>

                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Booking Amount</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {formatCurrency(plot.bookingAmount)}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Allotment token</div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {plot.isCorner && (
                    <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      Corner Plot (Dual Frontage)
                    </span>
                  )}
                  {plot.isParkFacing && (
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      Direct Park View Facing
                    </span>
                  )}
                  {plot.isMainRoadFacing && (
                    <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      Direct Access from Main Sector Road
                    </span>
                  )}
                </div>
              </div>

              {/* Master Project Context */}
              <div className="luxury-card" style={{ padding: '2rem', background: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                  Project: {plot.project.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {plot.project.description.slice(0, 220)}...
                </p>
                <Link
                  href={`/projects/${plot.project.slug}`}
                  style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  View full project specifications <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                </Link>
              </div>
            </div>

            {/* Interactive Client Actions Box */}
            <div>
              <PlotDetailActions
                plot={plot as any}
                projectName={plot.project.name}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
