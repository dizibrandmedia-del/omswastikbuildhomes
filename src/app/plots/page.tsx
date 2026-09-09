import React from 'react';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import PlotInventoryViewer from '@/components/PlotInventoryViewer';
import { Layers, ShieldCheck } from 'lucide-react';

export const revalidate = 60;

export default async function PlotsInventoryPage() {
  const project = await prisma.project.findUnique({
    where: { slug: 'riddhi' },
  });

  const plots = await prisma.plot.findMany({
    where: { projectId: project?.id || '' },
    orderBy: { plotNumber: 'asc' },
  });

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '4.5rem 0', color: '#ffffff' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="gold-badge">
              <ShieldCheck size={14} /> Live Allotment Register
            </span>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
              Project: {project?.name || 'Riddhi Premium Plots'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#ffffff', marginBottom: '0.5rem' }}>
            Plot Inventory &amp; Availability
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '720px' }}>
            Inspect real-time plot availability, facing directions, dimensions, and total prices. Reserve an allotment or schedule a physical site visit with our developer desk.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <PlotInventoryViewer
            plots={plots as any}
            projectName={project?.name}
            projectId={project?.id}
          />
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
