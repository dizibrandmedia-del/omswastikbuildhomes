'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingBtn() {
  const whatsappUrl =
    'https://wa.me/919599213531?text=' +
    encodeURIComponent('Hi Om Swastik Buildhomes team, I am interested in Riddhi Premium Plots in Dholera SIR. Please share project details and available inventory.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        backgroundColor: '#25D366',
        color: '#ffffff',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <MessageCircle size={32} />
    </a>
  );
}
