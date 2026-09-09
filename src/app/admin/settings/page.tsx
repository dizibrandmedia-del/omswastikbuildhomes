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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data: any) => {
        if (data && data.setting) setSettings(data.setting);
      })
      .catch(() => {});
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

  return (
    <div style={{ maxWidth: '850px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>Corporate System Settings</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Configure company contact information, director helplines, WhatsApp routing, and MCA registration details dynamically.
        </p>
      </div>

      <div
        id="settings-success-alert"
        style={{
          display: success ? 'flex' : 'none',
          padding: '0.85rem 1rem',
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          color: '#166534',
          marginBottom: '1.5rem',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <CheckCircle2 size={18} />
        <span>Settings saved successfully. Public website and headers have been updated.</span>
      </div>

      <div className="luxury-card" style={{ padding: '2rem' }}>
        <form id="corporate-settings-form" onSubmit={handleSave}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} style={{ color: 'var(--gold)' }} />
            Corporate Identity &amp; Legal Credentials
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Registered Legal Entity Name</label>
              <input
                id="setting-companyName"
                name="companyName"
                type="text"
                className="form-input"
                value={settings.companyName || ''}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Corporate Identification Number (CIN)</label>
              <input
                id="setting-cin"
                name="cin"
                type="text"
                className="form-input"
                value={settings.cin || ''}
                onChange={(e) => setSettings({ ...settings, cin: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Tagline / Vision</label>
              <input
                id="setting-tagline"
                name="tagline"
                type="text"
                className="form-input"
                value={settings.tagline || ''}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Helpline Routing (Format: 919599213531)</label>
              <input
                id="setting-whatsappNumber"
                name="whatsappNumber"
                type="text"
                className="form-input"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label className="form-label">Head Office Address</label>
            <textarea
              id="setting-officeAddress"
              name="officeAddress"
              rows={2}
              className="form-textarea"
              value={settings.officeAddress || ''}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
            />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0' }} />

          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={18} style={{ color: 'var(--primary)' }} />
            Director &amp; Sales Helplines
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Primary Executive Line</label>
              <input
                id="setting-primaryPhone"
                name="primaryPhone"
                type="text"
                className="form-input"
                value={settings.primaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Secondary Helpline</label>
              <input
                id="setting-secondaryPhone"
                name="secondaryPhone"
                type="text"
                className="form-input"
                value={settings.secondaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alternate Director Line</label>
              <input
                id="setting-altPhone"
                name="altPhone"
                type="text"
                className="form-input"
                value={settings.altPhone || ''}
                onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Official Email</label>
              <input
                id="setting-primaryEmail"
                name="primaryEmail"
                type="email"
                className="form-input"
                value={settings.primaryEmail || ''}
                onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-save-settings"
            disabled={saving}
            className="btn-primary"
            style={{ marginTop: '1.5rem', padding: '0.85rem 2rem' }}
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

      {/* Bulletproof DOM Fallback for saving settings without React chunks */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initSettings() {
                var form = document.getElementById('corporate-settings-form');
                if (!form || form.getAttribute('data-bound') === 'true') return;
                form.setAttribute('data-bound', 'true');

                form.addEventListener('submit', function(e) {
                  e.preventDefault();
                  var btn = document.getElementById('btn-save-settings');
                  var alertBox = document.getElementById('settings-success-alert');

                  var payload = {
                    companyName: (document.getElementById('setting-companyName') || {}).value,
                    cin: (document.getElementById('setting-cin') || {}).value,
                    tagline: (document.getElementById('setting-tagline') || {}).value,
                    whatsappNumber: (document.getElementById('setting-whatsappNumber') || {}).value,
                    officeAddress: (document.getElementById('setting-officeAddress') || {}).value,
                    primaryPhone: (document.getElementById('setting-primaryPhone') || {}).value,
                    secondaryPhone: (document.getElementById('setting-secondaryPhone') || {}).value,
                    altPhone: (document.getElementById('setting-altPhone') || {}).value,
                    primaryEmail: (document.getElementById('setting-primaryEmail') || {}).value
                  };

                  if (btn) btn.innerText = 'Saving Changes...';

                  fetch('/api/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  })
                  .then(function(res) {
                    if (res.ok) {
                      if (alertBox) {
                        alertBox.style.display = 'flex';
                        setTimeout(function() { alertBox.style.display = 'none'; }, 4000);
                      }
                    }
                  })
                  .catch(function(err) {
                    console.error('Settings save error:', err);
                  })
                  .finally(function() {
                    if (btn) btn.innerText = 'Save Corporate Settings';
                  });
                });
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initSettings);
              } else {
                initSettings();
              }
            })();
          `,
        }}
      />
    </div>
  );
}
