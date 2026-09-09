'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Film, Play, X, Compass, ExternalLink } from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  youtubeId: string | null;
  thumbnailUrl: string | null;
  category: string;
}

interface HomeVideoGalleryProps {
  videos: VideoData[];
}

export default function HomeVideoGallery({ videos }: HomeVideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!videos || videos.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  return (
    <section id="videos" className="section-padding" style={{ backgroundColor: '#002528', color: '#ffffff' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span className="gold-badge" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Film size={14} /> Ground Visuals &amp; Aerial Footage
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            Experience Dholera SIR &amp; Riddhi on Video
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Watch actual drone surveys, ground expressway connectivity, master plan developments, and real-time plot boundary demarcation at Riddhi.
          </p>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div
              id="video-category-pills"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1.75rem',
              }}
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    data-category-filter={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="video-cat-pill"
                    style={{
                      padding: '0.45rem 1.15rem',
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: isSelected ? 'var(--gold)' : 'rgba(255, 255, 255, 0.05)',
                      color: isSelected ? '#002528' : '#e2e8f0',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Video Cards Grid */}
        <div
          id="video-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {videos.map((vid) => {
            const thumbSrc =
              vid.thumbnailUrl ||
              (vid.youtubeId
                ? `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`
                : '/images/hero-dholera.jpg');

            const embedUrl = vid.youtubeId
              ? `https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`
              : vid.videoUrl;

            return (
              <div
                key={vid.id}
                data-action="play-video"
                data-video-id={vid.id}
                data-video-title={vid.title}
                data-video-category={vid.category}
                data-video-embed={embedUrl}
                data-video-desc={vid.description || ''}
                data-card-category={vid.category}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(228, 170, 60, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                className="video-gallery-card"
              >
                {/* Video Thumbnail Viewport */}
                <div style={{ position: 'relative', width: '100%', height: '210px', backgroundColor: '#000000', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbSrc}
                    alt={vid.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    className="video-thumb-img"
                  />

                  {/* Dark gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,37,40,0.7) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Play Button Icon */}
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                        transition: 'transform 0.2s ease',
                      }}
                      className="play-btn-circle"
                    >
                      <Play size={24} fill="#002528" color="#002528" style={{ marginLeft: '3px' }} />
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0, 54, 58, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--gold)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(228, 170, 60, 0.3)',
                    }}
                  >
                    {vid.category}
                  </div>
                </div>

                {/* Video Info Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {vid.title}
                  </h3>

                  {vid.description && (
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        lineHeight: 1.5,
                        margin: 0,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {vid.description}
                    </p>
                  )}

                  <div
                    style={{
                      marginTop: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--gold)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>Watch Full Video</span>
                    <Play size={13} fill="currentColor" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Playback Modal - ALWAYS in DOM */}
        <div
          id="omswastik-video-modal"
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#002528',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(228, 170, 60, 0.4)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                <span
                  id="video-modal-cat"
                  style={{
                    backgroundColor: 'rgba(228, 170, 60, 0.15)',
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  Video
                </span>
                <span id="video-modal-title" style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Video Player
                </span>
              </div>
              <button
                type="button"
                data-action="close-video"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                }}
                title="Close Video"
              >
                &times;
              </button>
            </div>

            {/* Responsive Video Frame */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#000000' }}>
              <iframe
                id="video-modal-iframe"
                src=""
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>

            <div id="video-modal-desc" style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, display: 'none' }} />
          </div>
        </div>
      </div>

      {/* Vanilla JS Controller for 100% Reliable Video Playback & Category Filtering */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initVideoGallery() {
                var modal = document.getElementById('omswastik-video-modal');
                var iframe = document.getElementById('video-modal-iframe');
                var titleEl = document.getElementById('video-modal-title');
                var catEl = document.getElementById('video-modal-cat');
                var descEl = document.getElementById('video-modal-desc');

                function closeVideo() {
                  if (modal) modal.style.display = 'none';
                  if (iframe) iframe.src = '';
                  document.body.style.overflow = '';
                }

                function openVideo(card) {
                  if (!modal || !iframe) return;
                  var embed = card.getAttribute('data-video-embed') || '';
                  var title = card.getAttribute('data-video-title') || '';
                  var cat = card.getAttribute('data-video-category') || '';
                  var desc = card.getAttribute('data-video-desc') || '';

                  if (titleEl) titleEl.innerText = title;
                  if (catEl) catEl.innerText = cat;
                  if (descEl) {
                    if (desc) {
                      descEl.innerText = desc;
                      descEl.style.display = 'block';
                    } else {
                      descEl.style.display = 'none';
                    }
                  }

                  iframe.src = embed;
                  modal.style.display = 'flex';
                  document.body.style.overflow = 'hidden';
                }

                document.addEventListener('click', function(e) {
                  var playTrigger = e.target.closest('[data-action="play-video"]');
                  if (playTrigger) {
                    e.preventDefault();
                    openVideo(playTrigger);
                    return;
                  }

                  var closeTrigger = e.target.closest('[data-action="close-video"]');
                  if (closeTrigger) {
                    e.preventDefault();
                    closeVideo();
                    return;
                  }

                  if (e.target === modal) {
                    closeVideo();
                    return;
                  }

                  // Category pill filter
                  var catPill = e.target.closest('[data-category-filter]');
                  if (catPill) {
                    var chosenCat = catPill.getAttribute('data-category-filter');
                    var pills = document.querySelectorAll('.video-cat-pill');
                    pills.forEach(function(p) {
                      var isCurrent = p.getAttribute('data-category-filter') === chosenCat;
                      p.style.backgroundColor = isCurrent ? 'var(--gold)' : 'rgba(255, 255, 255, 0.05)';
                      p.style.color = isCurrent ? '#002528' : '#e2e8f0';
                      p.style.borderColor = isCurrent ? 'var(--gold)' : 'rgba(255, 255, 255, 0.15)';
                    });

                    var cards = document.querySelectorAll('.video-gallery-card');
                    cards.forEach(function(c) {
                      var cardCat = c.getAttribute('data-card-category');
                      if (chosenCat === 'All' || cardCat === chosenCat) {
                        c.style.display = 'flex';
                      } else {
                        c.style.display = 'none';
                      }
                    });
                  }
                });

                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                    closeVideo();
                  }
                });
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initVideoGallery);
              } else {
                initVideoGallery();
              }
            })();
          `,
        }}
      />
    </section>
  );
}
