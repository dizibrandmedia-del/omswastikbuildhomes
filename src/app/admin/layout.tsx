'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('osb_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setLoading(false);
          return;
        } catch (e) {}
      }
    }

    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          if (typeof window !== 'undefined') {
            localStorage.setItem('osb_user', JSON.stringify(data.user));
          }
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f6' }}>{children}</div>;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6f6' }}>
        <div style={{ color: '#00464a', fontWeight: 600, fontSize: '1.1rem' }}>Loading Om Swastik Portal...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f6' }}>
      <AdminSidebar user={user} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
