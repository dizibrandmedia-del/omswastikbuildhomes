import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#002528', color: '#e2e8f0', borderTop: '2px solid var(--gold)', paddingTop: '4.5rem', paddingBottom: '2.5rem' }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
          {/* Column 1: Brand & Registration */}
          <div>
            <div style={{ position: 'relative', width: '190px', height: '54px', marginBottom: '1.25rem' }}>
              <Image
                src="/images/logo.png"
                alt="Om Swastik Buildhomes"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>
              Building Trust. Creating Spaces.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Om Swastik Buildhomes Private Limited is committed to delivering world-class plotted infrastructure and real estate investments in India&apos;s most promising growth corridors.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Shield size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                MCA CIN: <strong>U41000UW2026PTC256814</strong>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Quick Links
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '2px', backgroundColor: 'var(--gold)' }} />
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link href="/" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> About Om Swastik
                </Link>
              </li>
              <li>
                <Link href="/projects/riddhi" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> Riddhi Premium Plots (Dholera)
                </Link>
              </li>
              <li>
                <Link href="/plots" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> Live Plot Inventory & Pricing
                </Link>
              </li>
              <li>
                <Link href="/locations/dholera" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> Dholera SIR & DMIC Corridor
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--gold)' }} /> Executive Desk & Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Contacts */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Executive Contacts
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '2px', backgroundColor: 'var(--gold)' }} />
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.875rem' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>Rahul Bisht (Director)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  <Phone size={13} style={{ color: 'var(--gold)' }} />
                  <a href="tel:+919810484742" style={{ color: '#cbd5e1' }}>+91 98104 84742</a>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>Praful Singh (Director)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  <Phone size={13} style={{ color: 'var(--gold)' }} />
                  <a href="tel:+919599213531" style={{ color: '#cbd5e1' }}>+91 95992 13531</a>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>Santosh Gupta (Director)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  <Phone size={13} style={{ color: 'var(--gold)' }} />
                  <a href="tel:+919990842233" style={{ color: '#cbd5e1' }}>+91 99908 42233</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.6rem' }}>
                <Mail size={13} style={{ color: 'var(--gold)' }} />
                <a href="mailto:rahulbisht@omswastikbuildhomes.com" style={{ color: '#cbd5e1' }}>rahulbisht@omswastikbuildhomes.com</a>
              </div>
            </div>
          </div>

          {/* Column 4: Office Headquarters */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Headquarters
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '2px', backgroundColor: 'var(--gold)' }} />
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <MapPin size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, Uttar Pradesh 201318
              </p>
            </div>
            <div style={{ padding: '0.85rem', background: 'rgba(228, 170, 60, 0.08)', border: '1px dashed rgba(228, 170, 60, 0.3)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.25rem' }}>
                Site Office: Dholera SIR, Gujarat
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Minutes from Ahmedabad-Dholera Expressway &amp; Dholera International Airport site.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.825rem', color: '#64748b' }}>
          <div>
            &copy; {new Date().getFullYear()} Om Swastik Buildhomes Pvt. Ltd. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/privacy-policy" style={{ color: '#94a3b8' }}>Privacy Policy</Link>
            <Link href="/disclaimer" style={{ color: '#94a3b8' }}>Legal Disclaimer</Link>
            <Link href="/admin/login" style={{ color: 'var(--gold)' }}>Admin &amp; Sales CRM Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
