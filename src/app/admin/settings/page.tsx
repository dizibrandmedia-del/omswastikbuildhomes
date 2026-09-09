'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Shield, Phone, Mail, MapPin, Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    companyName: 'Om Swastik Buildhomes Pvt. Ltd.',
    tagline: 'Building Trust. Creating Spaces.',
    cin: 'U41000UW2026PTC256814',
    officeAddress: 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318',
    primaryPhone: '+919599213531',
    secondaryPhone: '+919810484742',
    altPhone: '+919990842233',
    primaryEmail: 'rahulbisht@omswastikbuildhomes.com',
    whatsappNumber: '919599213531',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.setting) setSettings(data.setting);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading corporate settings...</div>;
  }

  return (
    <div style={{ maxWidth: '850px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Corporate System Settings</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Configure company contact information, director helplines, WhatsApp routing, and MCA registration details dynamically.
        </p>
      </div>

      {success && (
        <div style={{ padding: '0.85rem 1rem', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} />
          <span>Settings saved successfully. Public website and headers have been updated.</span>
        </div>
      )}

      <div className="luxury-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Legal Company Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">MCA Registration CIN</label>
              <input
                type="text"
                required
                className="form-input"
                value={settings.cin}
                onChange={(e) => setSettings({ ...settings, cin: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company Tagline</label>
            <input
              type="text"
              className="form-input"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Registered Headquarters Address</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={settings.officeAddress}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Primary Phone (Praful Singh)</label>
              <input
                type="text"
                className="form-input"
                value={settings.primaryPhone}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Secondary Phone (Rahul Bisht)</label>
              <input
                type="text"
                className="form-input"
                value={settings.secondaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">WhatsApp Helpline (Without +)</label>
              <input
                type="text"
                className="form-input"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Official Email</label>
              <input
                type="email"
                className="form-input"
                value={settings.primaryEmail}
                onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ marginTop: '1rem', padding: '0.85rem 2rem' }}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={16} /> Save Corporate Settings
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
