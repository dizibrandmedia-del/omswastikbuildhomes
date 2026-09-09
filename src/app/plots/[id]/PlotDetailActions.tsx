'use client';

import React, { useState } from 'react';
import { Calendar, Phone, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import ScheduleVisitModal from '@/components/ScheduleVisitModal';

interface PlotDetailActionsProps {
  plot: {
    id: string;
    plotNumber: string;
    projectId: string;
    status: string;
    priceTotal: number;
    bookingAmount: number;
  };
  projectName: string;
}

export default function PlotDetailActions({ plot, projectName }: PlotDetailActionsProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);

  const isAvailable = plot.status === 'AVAILABLE';
  const isHold = plot.status === 'HOLD';

  const whatsappUrl =
    'https://wa.me/919599213531?text=' +
    encodeURIComponent(
      `Hi Rahul Bisht & Praful Singh, I am interested in Plot #${plot.plotNumber} at ${projectName}, Dholera SIR. Please share payment schedule and site visit details.`
    );

  return (
    <>
      <div
        className="luxury-card"
        style={{
          padding: '2rem',
          position: 'sticky',
          top: '100px',
          border: '1.5px solid var(--gold)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>
          <ShieldCheck size={13} /> Direct Allotment Desk
        </span>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
          Reserve Plot #{plot.plotNumber}
        </h3>

        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Submit an instant reservation enquiry or schedule a physical inspection with our local Dholera team.
        </p>

        {isAvailable ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              Enquire For Allotment
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setIsVisitOpen(true)}
              className="btn-teal"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              <Calendar size={18} /> Schedule Site Visit
            </button>
          </div>
        ) : isHold ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#fef3c7', borderRadius: '8px', color: '#92400e', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              This plot is currently on temporary hold. You may register for the waitlist.
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="btn-outline-gold"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Register Waitlist Interest
            </button>
          </div>
        ) : (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' }}>
            <strong>Allotted / Not Available</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
              This plot is already {plot.status.toLowerCase()}. Please select another plot from our available inventory.
            </p>
          </div>
        )}

        {/* Direct Director Communication */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Direct Contact Options
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <a
              href="tel:+919599213531"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.7rem',
                border: '1px solid var(--grey-border)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--dark)',
                backgroundColor: '#ffffff',
              }}
            >
              <Phone size={15} style={{ color: 'var(--primary)' }} /> Call Desk
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.7rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: '#25D366',
                color: '#ffffff',
              }}
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEnquiryOpen && (
        <EnquiryModal
          onClose={() => setIsEnquiryOpen(false)}
          projectName={projectName}
          projectId={plot.projectId}
          plotNumber={plot.plotNumber}
          plotId={plot.id}
        />
      )}

      {isVisitOpen && (
        <ScheduleVisitModal
          onClose={() => setIsVisitOpen(false)}
          projectName={projectName}
          projectId={plot.projectId}
          plotNumber={plot.plotNumber}
          plotId={plot.id}
        />
      )}
    </>
  );
}
