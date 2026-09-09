import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import { BookOpen, Calendar, Clock, ArrowRight, Shield, User, ChevronRight } from 'lucide-react';

export const revalidate = 60; // ISR cache

export const metadata = {
  title: 'Blog & Dholera SIR Market Intelligence | Om Swastik Buildhomes',
  description: 'Authoritative analysis, semiconductor mega fab updates, Ahmedabad-Dholera expressway timeline, and legal due diligence checklists for land investors.',
};

export default async function BlogListingPage() {
  const blogPosts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [
      { publishedAt: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#00292c',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(228, 170, 60, 0.15), transparent 40%), linear-gradient(180deg, rgba(0, 54, 58, 0.8) 0%, rgba(16, 26, 29, 0.98) 100%)',
          padding: '5rem 0 4rem',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-dholera.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="gold-badge">
              <BookOpen size={13} /> Market Intelligence &amp; Research
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: '#ffffff',
            }}
          >
            Dholera SIR Insights &amp; Investor Guides
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.6, margin: '0 auto' }}>
            Authoritative research papers, infrastructure timelines, semiconductor ecosystem analyses, and legal checklists curated by the leadership of Om Swastik Buildhomes.
          </p>
        </div>
      </section>

      {/* Main Blog Archive */}
      <section className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          {blogPosts.length === 0 ? (
            <div className="luxury-card" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <BookOpen size={48} style={{ color: 'var(--gold)', margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Articles Publishing Soon</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Our research desk is preparing detailed reports on Dholera industrial phases and expressway milestones.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2.5rem',
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
                    transition: 'all 0.3s ease',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {/* Article Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '220px',
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
                        top: '14px',
                        left: '14px',
                        backgroundColor: 'rgba(0, 37, 40, 0.9)',
                        color: 'var(--gold)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.8rem',
                        borderRadius: '4px',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(228, 170, 60, 0.3)',
                      }}
                    >
                      {post.category}
                    </span>
                  </Link>

                  {/* Article Body */}
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {post.publishedAt && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={13} style={{ color: 'var(--gold)' }} />
                          {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {post.readTime && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={13} style={{ color: 'var(--gold)' }} />
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: 'var(--primary-dark)',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p
                      style={{
                        fontSize: '0.925rem',
                        color: '#475569',
                        lineHeight: 1.6,
                        margin: '0 0 1.5rem 0',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1rem',
                        borderTop: '1px solid #f1f5f9',
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                        By {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <span>Read Article</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advisory Banner */}
      <section style={{ backgroundColor: '#002528', color: '#ffffff', padding: '4rem 0' }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <span className="gold-badge" style={{ marginBottom: '0.75rem' }}>Personalized Guidance</span>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Want Expert Guidance on Dholera Land Allotments?
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0 }}>
              Speak directly with our directors Rahul Bisht, Praful Singh, or Santosh Gupta for clear title plot verification and site visits.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/plots" className="btn-gold">
              Explore Available Plots
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Leadership Desk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
