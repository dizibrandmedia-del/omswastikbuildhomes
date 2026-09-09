'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Trash2, Edit3, Eye, CheckCircle2, AlertCircle, X, ExternalLink, RefreshCw } from 'lucide-react';

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  excerpt: string;
  content: string;
  category: string;
  readTime: string | null;
  author: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

const INITIAL_BLOGS = [
  {
    id: 'cmtu3tbpn0029v1lcw97k3v3d',
    title: 'Legal Due Diligence Checklist for Buying Plots in Dholera Gujarat',
    slug: 'legal-due-diligence-checklist-buying-plots-dholera-gujarat',
    featuredImage: '/images/investment-bg.jpg',
    excerpt: 'Essential verification steps every prudent investor must know before purchasing land in Dholera SIR, including 7/12 extracts, zoning status, and clear title deed verification.',
    author: 'Legal & Regulatory Affairs',
    category: 'Investor Guide',
    readTime: '7 min read',
    publishedAt: '2026-03-05T09:15:00.000Z',
    status: 'PUBLISHED',
  },
  {
    id: 'cmtu3tbpe0028v1lcpzjgf07t',
    title: 'Ahmedabad-Dholera Expressway & International Airport: 2026 Milestones',
    slug: 'ahmedabad-dholera-expressway-international-airport-2026-milestones',
    featuredImage: '/images/about-dholera.jpg',
    excerpt: 'A comprehensive progress update on connectivity milestones: 109 km expressway operational status, international cargo runways, and regional logistics networks.',
    author: 'Infrastructure Advisory Desk',
    category: 'Infrastructure',
    readTime: '5 min read',
    publishedAt: '2026-03-01T11:30:00.000Z',
    status: 'PUBLISHED',
  },
  {
    id: 'cmtu3tbp60027v1lc61cw47sp',
    title: "Why Dholera SIR is India's Most Lucrative Land Investment in 2026",
    slug: 'why-dholera-sir-is-indias-most-lucrative-land-investment-2026',
    featuredImage: '/images/hero-dholera.jpg',
    excerpt: 'Discover how planned greenfield infrastructure, direct expressway access, and multi-billion dollar industrial investments make Dholera SIR an unbeatable wealth-creation corridor.',
    author: 'Om Swastik Research Team',
    category: 'Market Intelligence',
    readTime: '6 min read',
    publishedAt: '2026-02-15T10:00:00.000Z',
    status: 'PUBLISHED',
  },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>(INITIAL_BLOGS);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featuredImage: '/images/hero-dholera.jpg',
    excerpt: '',
    content: '',
    category: 'Market Intelligence',
    readTime: '5 min read',
    author: 'Om Swastik Research Team',
    status: 'PUBLISHED',
  });

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?all=true');
      if (res.ok) {
        const data = await res.json();
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogs(data.blogs);
        }
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      featuredImage: '/images/hero-dholera.jpg',
      excerpt: '',
      content: '',
      category: 'Market Intelligence',
      readTime: '5 min read',
      author: 'Om Swastik Research Team',
      status: 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const openEditModal = (blog: BlogPostItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      featuredImage: blog.featuredImage || '/images/hero-dholera.jpg',
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      readTime: blog.readTime || '5 min read',
      author: blog.author,
      status: blog.status,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !editingBlog
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({
          type: 'success',
          text: editingBlog ? 'Blog article updated successfully.' : 'New blog article published.',
        });
        setModalOpen(false);
        fetchBlogs();
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
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Blog article deleted.' });
        fetchBlogs();
      } else {
        const result = await res.json();
        setMessage({ type: 'error', text: result.error || 'Failed to delete blog' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublish = async (blog: BlogPostItem) => {
    const newStatus = blog.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen style={{ color: 'var(--gold)' }} />
            Blog &amp; Market Intelligence Manager
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Publish authoritative Dholera SIR investment reports, legal checklists, and infrastructure milestones.
          </p>
        </div>

        <button
          id="add-blog-btn"
          onClick={openAddModal}
          className="btn-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
        >
          <Plus size={18} />
          <span>New Article</span>
        </button>
      </div>

      {/* Notifications */}
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

      {/* Articles Table */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
          <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto 1rem', color: 'var(--gold)' }} />
          <p>Loading published articles...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="luxury-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <BookOpen size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>No articles published yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Write and publish your first real estate market guide or infrastructure report.
          </p>
          <button onClick={openAddModal} className="btn-gold">
            Create Article
          </button>
        </div>
      ) : (
        <div className="luxury-card" style={{ overflow: 'hidden', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--primary-dark)', color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Article Title &amp; Category</th>
                <th style={{ padding: '1rem 1.25rem' }}>Author</th>
                <th style={{ padding: '1rem 1.25rem' }}>Read Time</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem' }}>Published</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b, idx) => (
                <tr
                  key={b.id}
                  id={`blog-row-${b.id}`}
                  className="blog-row-item"
                  data-blog-id={b.id}
                  data-blog-title={b.title}
                  data-blog-slug={b.slug}
                  data-blog-category={b.category}
                  data-blog-author={b.author}
                  data-blog-readtime={b.readTime || '5 min read'}
                  data-blog-image={b.featuredImage || '/images/hero-dholera.jpg'}
                  data-blog-status={b.status}
                  data-blog-excerpt={b.excerpt}
                  data-blog-content={b.content || ''}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                    fontSize: '0.9rem',
                  }}
                >
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                      {b.title}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(0, 70, 74, 0.08)',
                          color: 'var(--primary)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        {b.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/{b.slug}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', color: '#475569' }}>{b.author}</td>
                  <td style={{ padding: '1.25rem', color: '#64748b' }}>{b.readTime || '5 min'}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        backgroundColor: b.status === 'PUBLISHED' ? '#dcfce7' : '#f1f5f9',
                        color: b.status === 'PUBLISHED' ? '#166534' : '#64748b',
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem', color: '#64748b', fontSize: '0.85rem' }}>
                    {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button
                        className="blog-toggle-btn"
                        data-id={b.id}
                        data-status={b.status}
                        onClick={() => handleTogglePublish(b)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: b.status === 'PUBLISHED' ? '#dc2626' : '#16a34a',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        {b.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                      </button>

                      {b.status === 'PUBLISHED' && (
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          style={{
                            padding: '0.45rem',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="View Live Article"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      )}

                      <button
                        className="blog-edit-btn"
                        data-id={b.id}
                        onClick={() => openEditModal(b)}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                        }}
                        title="Edit Article"
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        className="blog-delete-btn"
                        data-id={b.id}
                        data-title={b.title}
                        onClick={() => handleDelete(b.id, b.title)}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '4px',
                          border: '1px solid #fee2e2',
                          background: '#fef2f2',
                          color: '#ef4444',
                          cursor: 'pointer',
                        }}
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Article Modal */}
      <div
        id="blog-editor-modal"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
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
            <h3 id="blog-modal-title" style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} style={{ color: 'var(--gold)' }} />
              <span>{editingBlog ? 'Edit Blog Article' : 'Compose New Article'}</span>
            </h3>
            <button
              id="blog-editor-close-btn"
              type="button"
              onClick={() => setModalOpen(false)}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <form id="blog-editor-form" onSubmit={handleSubmit} style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
            <input type="hidden" id="blog-input-id" name="id" value={editingBlog?.id || ''} />

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Article Title *</label>
              <input
                type="text"
                id="blog-input-title"
                name="title"
                required
                placeholder="e.g. Why Dholera SIR is India's Top Land Investment"
                className="form-input"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>URL Slug *</label>
                <input
                  type="text"
                  id="blog-input-slug"
                  name="slug"
                  required
                  placeholder="why-dholera-sir-is-indias-top-land-investment"
                  className="form-input"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Category</label>
                <select
                  id="blog-input-category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Market Intelligence">Market Intelligence</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Investor Guide">Investor Guide</option>
                  <option value="Project Updates">Project Updates</option>
                  <option value="Legal & Regulatory">Legal &amp; Regulatory</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Read Time</label>
                <input
                  type="text"
                  id="blog-input-readtime"
                  name="readTime"
                  placeholder="e.g. 6 min read"
                  className="form-input"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Author</label>
                <input
                  type="text"
                  id="blog-input-author"
                  name="author"
                  placeholder="Om Swastik Research Team"
                  className="form-input"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Publication Status</label>
                <select
                  id="blog-input-status"
                  name="status"
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Featured Cover Image URL</label>
              <input
                type="text"
                id="blog-input-image"
                name="featuredImage"
                placeholder="/images/hero-dholera.jpg"
                className="form-input"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Short Excerpt *</label>
              <textarea
                rows={2}
                id="blog-input-excerpt"
                name="excerpt"
                required
                placeholder="2-3 sentence executive summary displayed on cards and search results..."
                className="form-input"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Full Article Content (Markdown or HTML) *</label>
              <textarea
                rows={10}
                id="blog-input-content"
                name="content"
                required
                placeholder="Write full article here. Supports markdown headings (###), bullet points, and paragraphs..."
                className="form-input"
                style={{ fontFamily: 'monospace', fontSize: '0.88rem' }}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <button
                id="blog-editor-cancel-btn"
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
                id="blog-editor-submit-btn"
                type="submit"
                disabled={saving}
                className="btn-gold"
                style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {saving ? <RefreshCw className="animate-spin" size={16} /> : null}
                <span id="blog-editor-btn-text">{editingBlog ? 'Update Article' : 'Publish Article'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Fallback Pure Vanilla DOM Controller */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  function initBlogDOM() {
    var addBtn = document.getElementById('add-blog-btn');
    var modal = document.getElementById('blog-editor-modal');
    var form = document.getElementById('blog-editor-form');
    var closeBtn = document.getElementById('blog-editor-close-btn');
    var cancelBtn = document.getElementById('blog-editor-cancel-btn');

    if (addBtn && modal) {
      addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('blog-input-id').value = '';
        document.getElementById('blog-input-title').value = '';
        document.getElementById('blog-input-slug').value = '';
        document.getElementById('blog-input-excerpt').value = '';
        document.getElementById('blog-input-content').value = '';
        document.getElementById('blog-input-readtime').value = '5 min read';
        document.getElementById('blog-modal-title').innerText = 'Compose New Article';
        document.getElementById('blog-editor-btn-text').innerText = 'Publish Article';
        modal.style.display = 'flex';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function() { modal.style.display = 'none'; });
    }
    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', function() { modal.style.display = 'none'; });
    }

    document.addEventListener('click', function(e) {
      // Edit blog
      var editBtn = e.target.closest('.blog-edit-btn');
      if (editBtn && modal) {
        e.preventDefault();
        var row = editBtn.closest('.blog-row-item');
        if (row) {
          document.getElementById('blog-input-id').value = row.getAttribute('data-blog-id') || '';
          document.getElementById('blog-input-title').value = row.getAttribute('data-blog-title') || '';
          document.getElementById('blog-input-slug').value = row.getAttribute('data-blog-slug') || '';
          document.getElementById('blog-input-category').value = row.getAttribute('data-blog-category') || 'Market Intelligence';
          document.getElementById('blog-input-author').value = row.getAttribute('data-blog-author') || 'Om Swastik Research Team';
          document.getElementById('blog-input-readtime').value = row.getAttribute('data-blog-readtime') || '5 min read';
          document.getElementById('blog-input-status').value = row.getAttribute('data-blog-status') || 'PUBLISHED';
          document.getElementById('blog-input-image').value = row.getAttribute('data-blog-image') || '/images/hero-dholera.jpg';
          document.getElementById('blog-input-excerpt').value = row.getAttribute('data-blog-excerpt') || '';
          document.getElementById('blog-input-content').value = row.getAttribute('data-blog-content') || '';
          document.getElementById('blog-modal-title').innerText = 'Edit Blog Article';
          document.getElementById('blog-editor-btn-text').innerText = 'Update Article';
          modal.style.display = 'flex';
        }
        return;
      }

      // Delete blog
      var delBtn = e.target.closest('.blog-delete-btn');
      if (delBtn) {
        e.preventDefault();
        var id = delBtn.getAttribute('data-id');
        var title = delBtn.getAttribute('data-title');
        if (confirm('Are you sure you want to delete "' + title + '"?')) {
          fetch('/api/blogs/' + id, { method: 'DELETE' })
            .then(function() {
              var row = document.getElementById('blog-row-' + id);
              if (row) row.remove();
            })
            .catch(function(err) { alert('Delete failed: ' + err.message); });
        }
        return;
      }

      // Toggle publish
      var toggleBtn = e.target.closest('.blog-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        var id = toggleBtn.getAttribute('data-id');
        var currentStatus = toggleBtn.getAttribute('data-status');
        var newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        fetch('/api/blogs/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }).then(function(res) {
          if (res.ok) {
            toggleBtn.setAttribute('data-status', newStatus);
            toggleBtn.innerText = newStatus === 'PUBLISHED' ? 'Unpublish' : 'Publish';
            toggleBtn.style.color = newStatus === 'PUBLISHED' ? '#dc2626' : '#16a34a';
          }
        });
        return;
      }
    });

    // Form submit
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var id = document.getElementById('blog-input-id').value;
        var payload = {
          id: id,
          title: document.getElementById('blog-input-title').value,
          slug: document.getElementById('blog-input-slug').value,
          category: document.getElementById('blog-input-category').value,
          readTime: document.getElementById('blog-input-readtime').value,
          author: document.getElementById('blog-input-author').value,
          status: document.getElementById('blog-input-status').value,
          featuredImage: document.getElementById('blog-input-image').value,
          excerpt: document.getElementById('blog-input-excerpt').value,
          content: document.getElementById('blog-input-content').value
        };
        var url = id ? '/api/blogs/' + id : '/api/blogs';
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
            return res.json().then(function(d) { alert(d.error || 'Failed to save blog'); });
          }
        }).catch(function(err) {
          alert('Network error: ' + err.message);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogDOM);
  } else {
    initBlogDOM();
  }
})();
          `
        }}
      />
    </div>
  );
}
