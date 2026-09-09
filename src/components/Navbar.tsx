'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, X, ArrowRight, Shield } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Corporate Bar - Hidden on mobile screens */}
      <div className="top-corporate-bar">
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
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
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/projects/riddhi" className="nav-link" style={{ color: 'var(--gold)', fontWeight: 600 }}>
              Riddhi (Dholera)
            </Link>
            <Link href="/pricing" className="nav-link">Price List</Link>
            <Link href="/plots" className="nav-link">Available Plots</Link>
            <Link href="/#videos" className="nav-link">Videos</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/locations/dholera" className="nav-link">Dholera SIR</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="desktop-cta">
            <button
              type="button"
              data-action="open-enquiry"
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              Enquire Now
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-btn"
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-nav-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-drawer"
          className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
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
          <Link href="/projects/riddhi" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--gold)', fontSize: '1.1rem', padding: '0.5rem 0', fontWeight: 600 }}>
            Riddhi (Dholera)
          </Link>
          <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Official Price List &amp; Plans
          </Link>
          <Link href="/plots" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Live Plot Inventory
          </Link>
          <Link href="/#videos" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Video Gallery
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Blog &amp; Market Insights
          </Link>
          <Link href="/locations/dholera" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Dholera SIR Guide
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.1rem', padding: '0.5rem 0' }}>
            Contact Us
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              type="button"
              data-action="open-enquiry"
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
      </header>

      {/* Vanilla JS fallback for static HTML export on Hostinger */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initNav() {
                var btn = document.getElementById('mobile-menu-btn');
                var drawer = document.getElementById('mobile-drawer');
                if (btn && drawer && !btn.dataset.initialized) {
                  btn.dataset.initialized = 'true';
                  btn.addEventListener('click', function(e) {
                    var isOpen = drawer.classList.contains('is-open') || drawer.style.display === 'flex';
                    if (isOpen) {
                      drawer.classList.remove('is-open');
                      drawer.style.display = 'none';
                    } else {
                      drawer.classList.add('is-open');
                      drawer.style.display = 'flex';
                    }
                  });
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initNav);
              } else {
                initNav();
              }
            })();
          `,
        }}
      />
    </>
  );
}
