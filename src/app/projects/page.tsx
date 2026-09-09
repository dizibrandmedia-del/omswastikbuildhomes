import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import { MapPin, ArrowRight, Layers } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      plots: {
        select: { id: true, status: true },
      },
    },
  });

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '4.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Strategic Developments</span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#ffffff', marginBottom: '0.5rem' }}>
            Our Plotted Developments
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px' }}>
            Explore verified plotted real-estate investments across India&apos;s fastest growing economic and industrial corridors.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {projects.map((project) => {
              const totalPlots = project.plots.length;
              const availablePlots = project.plots.filter((p) => p.status === 'AVAILABLE').length;

              return (
                <div key={project.id} className="luxury-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                    <Image
                      src={project.heroImage || '/images/hero-dholera.jpg'}
                      alt={project.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: project.status === 'ACTIVE' ? '#10b981' : '#f59e0b',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {project.status === 'ACTIVE' ? 'READY FOR ALLOTMENT' : project.status}
                    </div>
                  </div>

                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-deep)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      <MapPin size={15} />
                      {project.location}
                    </div>

                    <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                      {project.name}
                    </h3>

                    <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                      {project.description.slice(0, 160)}...
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.85rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Total Plots</div>
                        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{totalPlots} Cataloged</div>
                      </div>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Available</div>
                        <div style={{ fontWeight: 700, color: '#16a34a' }}>{availablePlots} Units Open</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <Link href={`/projects/${project.slug}`} className="btn-primary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>
                        View Details
                        <ArrowRight size={15} />
                      </Link>
                      <Link href={`/plots?project=${project.id}`} className="btn-outline-gold" style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>
                        Plot Inventory
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
