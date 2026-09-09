'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, X, Calendar, ArrowRight, Shield } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      {/* Top Corporate Bar */}
      <div style={{ backgroundColor: '#00363a', borderBottom: '1px solid rgba(228, 170, 60, 0.2)' }} className="py-2 text-xs text-white/80">
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={13} style={{ color: 'var(--gold)' }} />
              <span>CIN: <strong>U41000UW2026PTC256814</strong></span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={13} style={{ color: 'var(--gold)' }} />
              <a href="mailto:rahulbisht@omswastikbuildhomes.com" style={{ color: '#ffffff' }}>rahulbisht@omswastikbuildhomes.com</a>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={13} style={{ color: 'var(--gold)' }} />
              <a href="tel:+919599213531" style={{ color: 'var(--gold)', fontWeight: 600 }}>+91 95992 13531</a>
            </span>
            <Link href="/admin/login" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textDecoration: 'underline' }}>
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative', width: '180px', height: '52px' }}>
              <Image
                src="/images/logo.png"
                alt="Om Swastik Buildhomes Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <style jsx>{`
              @media (min-width: 992px) {
                .desktop-nav { display: flex !important; align-items: center; gap: 1.75rem; }
              }
              .nav-link {
                font-size: 0.925rem;
                font-weight: 500;
                color: #ffffff;
                letter-spacing: 0.02em;
                position: relative;
                padding: 0.35rem 0;
              }
              .nav-link:hover {
                color: var(--gold);
              }
            `}</style>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
            <Link href="/projects/riddhi" className="nav-link" style={{ color: 'var(--gold)', fontWeight: 600 }}>
              Riddhi (Dholera)
            </Link>
            <Link href="/plots" className="nav-link">Available Plots</Link>
            <Link href="/locations/dholera" className="nav-link">Dholera SIR</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              Enquire Now
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            className="mobile-btn"
          >
            <style jsx>{`
              @media (min-width: 992px) {
                .mobile-btn { display: none !important; }
              }
            `}</style>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#00363a',
              borderTop: '1px solid rgba(228, 170, 60, 0.2)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              Home
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              About Us
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              All Projects
            </Link>
            <Link href="/projects/riddhi" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 0' }}>
              Riddhi Premium Plots (Dholera)
            </Link>
            <Link href="/plots" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              Live Plot Inventory
            </Link>
            <Link href="/locations/dholera" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              Dholera SIR Guide
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
              Contact Us
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEnquiryOpen(true);
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Send Enquiry
              </button>
              <a
                href="tel:+919599213531"
                className="btn-secondary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Call Office: +91 95992 13531
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Enquiry Modal */}
      {isEnquiryOpen && <EnquiryModal onClose={() => setIsEnquiryOpen(false)} />}
    </>
  );
}
