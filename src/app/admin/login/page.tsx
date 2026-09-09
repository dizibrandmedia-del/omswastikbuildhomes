'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('Admin@12345');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#002528',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(228, 170, 60, 0.12), transparent 60%)',
        padding: '1.5rem',
      }}
    >
      <div
        className="luxury-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '180px', height: '50px', margin: '0 auto 1rem' }}>
            <Image src="/images/logo.png" alt="Om Swastik Buildhomes" fill style={{ objectFit: 'contain' }} priority />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', margin: 0 }}>
            Staff &amp; CRM Portal
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Om Swastik Buildhomes Management Console
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Work Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                required
                placeholder="name@omswastikbuildhomes.com"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.75rem' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Quick Role Fillers for Review & Verification */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} style={{ color: 'var(--gold-deep)' }} />
            <span>Select Staff Role to Auto-Fill:</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
            <button
              type="button"
              onClick={() => fillCredentials('admin@omswastikbuildhomes.com')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <strong style={{ color: 'var(--primary)' }}>Super Admin</strong>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Full System Access</div>
            </button>

            <button
              type="button"
              onClick={() => fillCredentials('rahulbisht@omswastikbuildhomes.com')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <strong style={{ color: 'var(--primary)' }}>Rahul Bisht</strong>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Director / Admin</div>
            </button>

            <button
              type="button"
              onClick={() => fillCredentials('prafulsingh@omswastikbuildhomes.com')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <strong style={{ color: 'var(--primary)' }}>Praful Singh</strong>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Sales Manager</div>
            </button>

            <button
              type="button"
              onClick={() => fillCredentials('santoshgupta@omswastikbuildhomes.com')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <strong style={{ color: 'var(--primary)' }}>Santosh Gupta</strong>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Sales Executive</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
