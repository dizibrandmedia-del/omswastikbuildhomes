'use client';

import React, { useState, useEffect } from 'react';
import { Film, Plus, Trash2, Edit3, Eye, CheckCircle2, AlertCircle, Play, X, ExternalLink, RefreshCw } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  youtubeId: string | null;
  thumbnailUrl: string | null;
  category: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'cmtu3tbod0023v1lcf5h3deg0',
    title: 'Dholera SIR Mega Master Plan & Drone Aerial Tour 2026',
    description: 'Exclusive aerial perspective of the 250m multi-modal transport corridor, administrative building (ABCD), and central activation area in Dholera SIR.',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    youtubeId: 'ScMzIvxBSi4',
    thumbnailUrl: '/images/hero-dholera.jpg',
    category: 'Dholera SIR',
    displayOrder: 1,
    isActive: true,
    createdAt: '2026-09-09T12:58:10.141Z',
  },
  {
    id: 'cmtu3tbok0024v1lcsfs1vh15',
    title: 'Riddhi Premium Plots: On-Site Demarcation & Road Work',
    description: 'Comprehensive site walkthrough showing wide 30ft & 40ft asphalt roads, boundary stones, and underground utility pipelines in Riddhi.',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnailUrl: '/images/riddhi-project.jpg',
    category: 'Site Tour',
    displayOrder: 2,
    isActive: true,
    createdAt: '2026-09-09T12:58:10.148Z',
  },
  {
    id: 'cmtu3tbor0025v1lc9r3955tf',
    title: 'Ahmedabad-Dholera Expressway Ground Speedrun & Connectivity',
    description: 'Drive through the 109 km high-speed expressway connecting SG Highway Ahmedabad to Dholera in under 45 minutes.',
    videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    youtubeId: 'L_LUpnjgPso',
    thumbnailUrl: '/images/about-dholera.jpg',
    category: 'Development',
    displayOrder: 3,
    isActive: true,
    createdAt: '2026-09-09T12:58:10.155Z',
  },
  {
    id: 'cmtu3tboz0026v1lchx06c089',
    title: 'Tata Electronics Semiconductor Fab & Industrial Boom',
    description: "Inside India's premier semiconductor manufacturing ecosystem in Dholera SIR and its multiplier impact on property valuations.",
    videoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    youtubeId: '21X5lGlDOfg',
    thumbnailUrl: '/images/investment-bg.jpg',
    category: 'Industrial',
    displayOrder: 4,
    isActive: true,
    createdAt: '2026-09-09T12:58:10.163Z',
  },
];

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    category: 'Site Tour',
    displayOrder: 0,
    isActive: true,
  });

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos?all=true');
      if (res.ok) {
        const data = await res.json();
        if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos);
        }
      }
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      category: 'Site Tour',
      displayOrder: videos.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (video: VideoItem) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
      category: video.category,
      displayOrder: video.displayOrder,
      isActive: video.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = editingVideo ? `/api/videos/${editingVideo.id}` : '/api/videos';
      const method = editingVideo ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({
          type: 'success',
          text: editingVideo ? 'Video updated successfully.' : 'New video added to gallery.',
        });
        setModalOpen(false);
        fetchVideos();
      } else {
        setMessage({ type: 'error', text: result.error || 'Operation failed' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Network error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the video gallery?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Video removed from gallery.' });
        fetchVideos();
      } else {
        const result = await res.json();
        setMessage({ type: 'error', text: result.error || 'Failed to delete video' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (video: VideoItem) => {
    try {
      const res = await fetch(`/api/videos/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !video.isActive }),
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((v) => (v.id === video.id ? { ...v, isActive: !v.isActive } : v))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Film style={{ color: 'var(--gold)' }} />
            Video Gallery Manager
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Manage YouTube site tours, development updates, and Dholera SIR project videos displayed on the homepage.
          </p>
        </div>

        <button
          id="add-video-btn"
          onClick={openAddModal}
          className="btn-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
        >
          <Plus size={18} />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Status Notifications */}
      {message && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fca5a5'}`,
            color: message.type === 'success' ? '#166534' : '#991b1b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
          <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto 1rem', color: 'var(--gold)' }} />
          <p>Loading video library...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="luxury-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Film size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>No videos in gallery yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Click &quot;Add New Video&quot; above to add your first YouTube or project drone video.
          </p>
          <button onClick={openAddModal} className="btn-gold">
            Add Video
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {videos.map((video) => (
            <div
              key={video.id}
              id={`video-card-${video.id}`}
              className="luxury-card video-card-item"
              data-video-id={video.id}
              data-video-title={video.title}
              data-video-url={video.videoUrl}
              data-video-category={video.category}
              data-video-order={video.displayOrder}
              data-video-thumbnail={video.thumbnailUrl || ''}
              data-video-desc={video.description || ''}
              data-video-active={video.isActive ? '1' : '0'}
              data-video-youtube={video.youtubeId || ''}
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                opacity: video.isActive ? 1 : 0.65,
                transition: 'all 0.2s ease',
              }}
            >
              {/* Thumbnail Container */}
              <div
                className="video-preview-trigger"
                data-youtube={video.youtubeId || ''}
                data-url={video.videoUrl}
                data-title={video.title}
                data-desc={video.description || ''}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '190px',
                  backgroundColor: '#0f172a',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => setPreviewVideo(video)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    video.thumbnailUrl ||
                    (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : '/images/hero-dholera.jpg')
                  }
                  alt={video.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(228, 170, 60, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#002528',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Play size={20} fill="#002528" style={{ marginLeft: '3px' }} />
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(0, 37, 40, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(228, 170, 60, 0.3)',
                  }}
                >
                  {video.category}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: video.isActive ? 'rgba(22, 101, 52, 0.9)' : 'rgba(100, 116, 139, 0.9)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                  }}
                >
                  {video.isActive ? 'ACTIVE' : 'HIDDEN'}
                </div>
              </div>

              {/* Card Details */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--primary-dark)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.4,
                  }}
                >
                  {video.title}
                </h3>
                {video.description && (
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#64748b',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1,
                    }}
                  >
                    {video.description}
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <button
                    className="video-toggle-btn"
                    data-id={video.id}
                    data-active={video.isActive ? '1' : '0'}
                    onClick={() => handleToggleStatus(video)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      border: `1px solid ${video.isActive ? '#cbd5e1' : '#bbf7d0'}`,
                      background: video.isActive ? '#ffffff' : '#dcfce7',
                      color: video.isActive ? '#64748b' : '#166534',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    {video.isActive ? 'Hide Video' : 'Show on Site'}
                  </button>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="video-preview-trigger"
                      data-youtube={video.youtubeId || ''}
                      data-url={video.videoUrl}
                      data-title={video.title}
                      data-desc={video.description || ''}
                      onClick={() => setPreviewVideo(video)}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#475569',
                        cursor: 'pointer',
                      }}
                      title="Preview Video"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="video-edit-btn"
                      data-id={video.id}
                      onClick={() => openEditModal(video)}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                      }}
                      title="Edit Video"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      className="video-delete-btn"
                      data-id={video.id}
                      data-title={video.title}
                      onClick={() => handleDelete(video.id, video.title)}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '6px',
                        border: '1px solid #fee2e2',
                        background: '#fef2f2',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                      title="Delete Video"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Video Modal */}
      <div
        id="video-editor-modal"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: modalOpen ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
        }}
      >
        <div
          className="luxury-card"
          style={{
            width: '100%',
            maxWidth: '560px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--primary-dark)',
              color: '#ffffff',
            }}
          >
            <h3 id="video-modal-title" style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Film size={18} style={{ color: 'var(--gold)' }} />
              <span>{editingVideo ? 'Edit Gallery Video' : 'Add New Video'}</span>
            </h3>
            <button
              id="video-editor-close-btn"
              type="button"
              onClick={() => setModalOpen(false)}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <form id="video-editor-form" onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <input type="hidden" id="video-input-id" name="id" value={editingVideo?.id || ''} />

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Video Title *</label>
              <input
                type="text"
                id="video-input-title"
                name="title"
                required
                placeholder="e.g. Dholera SIR 2026 Drone Master Plan"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>YouTube or Video URL *</label>
              <input
                type="text"
                id="video-input-url"
                name="videoUrl"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="form-input"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                Paste any standard YouTube watch or share URL. YouTube ID is automatically detected.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Category</label>
                <select
                  id="video-input-category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Site Tour">Site Tour</option>
                  <option value="Dholera SIR">Dholera SIR</option>
                  <option value="Development">Development</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Customer Stories">Customer Stories</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Display Sequence</label>
                <input
                  type="number"
                  id="video-input-order"
                  name="displayOrder"
                  className="form-input"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Custom Thumbnail URL (Optional)</label>
              <input
                type="text"
                id="video-input-thumbnail"
                name="thumbnailUrl"
                placeholder="Auto-extracted from YouTube if empty (e.g. /images/hero-dholera.jpg)"
                className="form-input"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Description</label>
              <textarea
                rows={3}
                id="video-input-desc"
                name="description"
                placeholder="Brief highlights or notes about this footage..."
                className="form-input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="isActiveToggle"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="isActiveToggle" style={{ fontSize: '0.9rem', color: '#1e293b', cursor: 'pointer', fontWeight: 500 }}>
                Publish video to public gallery and homepage
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                id="video-editor-cancel-btn"
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                id="video-editor-submit-btn"
                type="submit"
                disabled={saving}
                className="btn-gold"
                style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {saving ? <RefreshCw className="animate-spin" size={16} /> : null}
                <span id="video-editor-btn-text">{editingVideo ? 'Update Video' : 'Add to Gallery'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Video Preview Modal */}
      <div
        id="video-preview-modal"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(6px)',
          display: previewVideo ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1rem',
        }}
        onClick={() => setPreviewVideo(null)}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '850px',
            backgroundColor: '#002528',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(228, 170, 60, 0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Film size={18} style={{ color: 'var(--gold)' }} />
              <span id="video-preview-title" style={{ fontWeight: 600, fontSize: '1rem' }}>{previewVideo?.title || 'Video Player'}</span>
            </div>
            <button
              id="video-preview-close-btn"
              type="button"
              onClick={() => setPreviewVideo(null)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#000000' }}>
            <iframe
              id="video-preview-iframe"
              src={
                previewVideo?.youtubeId
                  ? `https://www.youtube.com/embed/${previewVideo.youtubeId}?autoplay=1`
                  : (previewVideo?.videoUrl || '')
              }
              title={previewVideo?.title || 'Preview'}
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

          <div id="video-preview-desc" style={{ padding: '1rem 1.25rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
            {previewVideo?.description || ''}
          </div>
        </div>
      </div>

      {/* Fallback Pure Vanilla DOM Controller */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  function initVideoDOM() {
    var addBtn = document.getElementById('add-video-btn');
    var modal = document.getElementById('video-editor-modal');
    var form = document.getElementById('video-editor-form');
    var closeBtn = document.getElementById('video-editor-close-btn');
    var cancelBtn = document.getElementById('video-editor-cancel-btn');
    var previewModal = document.getElementById('video-preview-modal');
    var previewCloseBtn = document.getElementById('video-preview-close-btn');
    var previewIframe = document.getElementById('video-preview-iframe');
    var previewTitle = document.getElementById('video-preview-title');
    var previewDesc = document.getElementById('video-preview-desc');

    if (addBtn && modal) {
      addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('video-input-id').value = '';
        document.getElementById('video-input-title').value = '';
        document.getElementById('video-input-url').value = '';
        document.getElementById('video-input-desc').value = '';
        document.getElementById('video-input-thumbnail').value = '';
        document.getElementById('video-modal-title').innerText = 'Add New Video';
        document.getElementById('video-editor-btn-text').innerText = 'Add to Gallery';
        modal.style.display = 'flex';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function() { modal.style.display = 'none'; });
    }
    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', function() { modal.style.display = 'none'; });
    }

    // Preview close
    if (previewCloseBtn && previewModal) {
      previewCloseBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
        if (previewIframe) previewIframe.src = '';
      });
    }
    if (previewModal) {
      previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
          previewModal.style.display = 'none';
          if (previewIframe) previewIframe.src = '';
        }
      });
    }

    // Global document listeners
    document.addEventListener('click', function(e) {
      // Preview trigger
      var prevTrigger = e.target.closest('.video-preview-trigger');
      if (prevTrigger && previewModal) {
        var yt = prevTrigger.getAttribute('data-youtube');
        var url = prevTrigger.getAttribute('data-url');
        var title = prevTrigger.getAttribute('data-title');
        var desc = prevTrigger.getAttribute('data-desc');
        if (previewTitle) previewTitle.innerText = title || 'Video Player';
        if (previewDesc) previewDesc.innerText = desc || '';
        if (previewIframe) {
          previewIframe.src = yt ? 'https://www.youtube.com/embed/' + yt + '?autoplay=1' : url;
        }
        previewModal.style.display = 'flex';
        return;
      }

      // Edit trigger
      var editBtn = e.target.closest('.video-edit-btn');
      if (editBtn && modal) {
        e.preventDefault();
        var card = editBtn.closest('.video-card-item');
        if (card) {
          document.getElementById('video-input-id').value = card.getAttribute('data-video-id') || '';
          document.getElementById('video-input-title').value = card.getAttribute('data-video-title') || '';
          document.getElementById('video-input-url').value = card.getAttribute('data-video-url') || '';
          document.getElementById('video-input-category').value = card.getAttribute('data-video-category') || 'Site Tour';
          document.getElementById('video-input-order').value = card.getAttribute('data-video-order') || '1';
          document.getElementById('video-input-thumbnail').value = card.getAttribute('data-video-thumbnail') || '';
          document.getElementById('video-input-desc').value = card.getAttribute('data-video-desc') || '';
          document.getElementById('isActiveToggle').checked = card.getAttribute('data-video-active') === '1';
          document.getElementById('video-modal-title').innerText = 'Edit Gallery Video';
          document.getElementById('video-editor-btn-text').innerText = 'Update Video';
          modal.style.display = 'flex';
        }
        return;
      }

      // Delete trigger
      var delBtn = e.target.closest('.video-delete-btn');
      if (delBtn) {
        e.preventDefault();
        var id = delBtn.getAttribute('data-id');
        var title = delBtn.getAttribute('data-title');
        if (confirm('Are you sure you want to remove "' + title + '" from the video gallery?')) {
          fetch('/api/videos/' + id, { method: 'DELETE' })
            .then(function() {
              var card = document.getElementById('video-card-' + id);
              if (card) card.remove();
            })
            .catch(function(err) { alert('Delete failed: ' + err.message); });
        }
        return;
      }

      // Toggle status trigger
      var toggleBtn = e.target.closest('.video-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        var id = toggleBtn.getAttribute('data-id');
        var active = toggleBtn.getAttribute('data-active') === '1';
        fetch('/api/videos/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: !active })
        }).then(function(res) {
          if (res.ok) {
            toggleBtn.setAttribute('data-active', active ? '0' : '1');
            toggleBtn.innerText = active ? 'Show on Site' : 'Hide Video';
            var card = document.getElementById('video-card-' + id);
            if (card) card.style.opacity = active ? '0.65' : '1';
          }
        });
        return;
      }
    });

    // Form submit
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var id = document.getElementById('video-input-id').value;
        var payload = {
          id: id,
          title: document.getElementById('video-input-title').value,
          videoUrl: document.getElementById('video-input-url').value,
          category: document.getElementById('video-input-category').value,
          displayOrder: parseInt(document.getElementById('video-input-order').value, 10) || 1,
          thumbnailUrl: document.getElementById('video-input-thumbnail').value,
          description: document.getElementById('video-input-desc').value,
          isActive: document.getElementById('isActiveToggle').checked
        };
        var url = id ? '/api/videos/' + id : '/api/videos';
        var method = id ? 'PUT' : 'POST';

        fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function(res) {
          if (res.ok) {
            modal.style.display = 'none';
            window.location.reload();
          } else {
            return res.json().then(function(d) { alert(d.error || 'Failed to save video'); });
          }
        }).catch(function(err) {
          alert('Network error: ' + err.message);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoDOM);
  } else {
    initVideoDOM();
  }
})();
          `
        }}
      />
    </div>
  );
}
