import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Phone,
  MessageCircle,
  Shield,
  CheckCircle2,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true }
  });
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post) {
    return {
      title: 'Article Not Found | Om Swastik Buildhomes',
    };
  }

  return {
    title: post.seoTitle || `${post.title} | Om Swastik Buildhomes`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || '/images/hero-dholera.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post || (post.status !== 'PUBLISHED')) {
    notFound();
  }

  // Fetch related articles
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      NOT: { id: post.id }
    },
    take: 2,
    orderBy: { publishedAt: 'desc' }
  });

  // Render markdown paragraphs
  const renderFormattedContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: '1.5rem',
              color: 'var(--primary-dark)',
              fontWeight: 700,
              marginTop: '2rem',
              marginBottom: '0.75rem',
              lineHeight: 1.3,
            }}
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            style={{
              fontSize: '1.85rem',
              color: 'var(--primary-dark)',
              fontWeight: 700,
              marginTop: '2.5rem',
              marginBottom: '1rem',
              lineHeight: 1.25,
            }}
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('---')) {
        return (
          <hr
            key={idx}
            style={{
              border: 'none',
              borderTop: '1px solid #e2e8f0',
              margin: '2rem 0',
            }}
          />
        );
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((line) => line.replace(/^[\*\-]\s+/, '').trim());
        return (
          <ul
            key={idx}
            style={{
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              color: '#334155',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            {items.map((item, itemIdx) => {
              // Format bold **text**
              const parts = item.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={itemIdx}>
                  {parts.map((p, pIdx) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return <strong key={pIdx} style={{ color: 'var(--primary-dark)' }}>{p.slice(2, -2)}</strong>;
                    }
                    return p;
                  })}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard paragraph
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p
          key={idx}
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.8,
            color: '#334155',
            marginBottom: '1.5rem',
          }}
        >
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={pIdx} style={{ color: 'var(--primary-dark)' }}>{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <>
      <Navbar />

      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#002528', color: '#cbd5e1', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--gold)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
            {post.title}
          </span>
        </div>
      </div>

      {/* Article Container */}
      <article className="section-padding" style={{ backgroundColor: 'var(--ivory)' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '3.5rem', alignItems: 'start' }}>
            {/* Left Content Column */}
            <main>
              {/* Back to articles link */}
              <Link
                href="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={16} /> Back to All Articles
              </Link>

              {/* Title & Metadata */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(0, 70, 74, 0.1)',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.8rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                  }}
                >
                  {post.category}
                </span>

                <h1
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--primary-dark)',
                    lineHeight: 1.2,
                    marginBottom: '1.25rem',
                  }}
                >
                  {post.title}
                </h1>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid var(--grey-border)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#334155' }}>
                    <User size={15} style={{ color: 'var(--gold-deep)' }} />
                    {post.author}
                  </span>
                  {post.publishedAt && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={15} style={{ color: 'var(--gold-deep)' }} />
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                  {post.readTime && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} style={{ color: 'var(--gold-deep)' }} />
                      {post.readTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage || '/images/hero-dholera.jpg'}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Executive Summary Callout */}
              <div
                style={{
                  padding: '1.5rem 1.75rem',
                  backgroundColor: 'rgba(0, 70, 74, 0.05)',
                  borderLeft: '4px solid var(--gold)',
                  borderRadius: '0 12px 12px 0',
                  marginBottom: '2.5rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-deep)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  Executive Summary
                </div>
                <p style={{ margin: 0, fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--primary-dark)', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Rendered Body */}
              <div className="article-body" style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--grey-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                {renderFormattedContent(post.content)}
              </div>

              {/* Author & Assurance Footer */}
              <div
                className="luxury-card"
                style={{
                  marginTop: '2.5rem',
                  padding: '2rem',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}
                >
                  <Shield size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                    Published by Om Swastik Buildhomes Pvt. Ltd.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    Our research publications are verified by on-ground site engineering teams, DSIRDA statutory master plans, and legal experts to provide institutional-grade transparency to plot buyers.
                  </p>
                </div>
              </div>
            </main>

            {/* Right Sidebar Column */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '90px' }}>
              {/* Direct Leadership Card */}
              <div className="luxury-card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
                <span className="gold-badge" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>Leadership &amp; Advisory</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  Speak with Our Directors
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Get tailored advice on plot availability, pricing, and expressway connectivity directly from the promoters.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a
                    href="tel:+919810484742"
                    className="btn-teal"
                    style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    <Phone size={14} /> Call Rahul Bisht (+91 9810484742)
                  </a>
                  <a
                    href="https://wa.me/919599213531?text=Hi%2C%20I%20read%20your%20article%20on%20Dholera%20SIR%20and%20want%20to%20consult%20regarding%20plots."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '0.65rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp Advisory Desk
                  </a>
                </div>
              </div>

              {/* Riddhi Inventory Widget */}
              <div
                style={{
                  backgroundColor: '#002528',
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  border: '1px solid rgba(228, 170, 60, 0.3)',
                }}
              >
                <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Flagship Development
                </div>
                <h4 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                  Riddhi Premium Plots
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Clear-title residential &amp; prime investment plots in Dholera SIR with 30ft/40ft wide roads, direct expressway connectivity, and boundary demarcation.
                </p>
                <Link
                  href="/plots"
                  className="btn-gold"
                  style={{ width: '100%', textAlign: 'center', display: 'block', padding: '0.75rem' }}
                >
                  View Interactive Plots &rarr;
                </Link>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="luxury-card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 700 }}>
                    More Insights
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {relatedPosts.map((r) => (
                      <Link
                        key={r.id}
                        href={`/blog/${r.slug}`}
                        style={{
                          textDecoration: 'none',
                          display: 'block',
                          borderBottom: '1px solid #f1f5f9',
                          paddingBottom: '0.75rem',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-deep)', fontWeight: 600 }}>
                          {r.category}
                        </span>
                        <h5 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                          {r.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
