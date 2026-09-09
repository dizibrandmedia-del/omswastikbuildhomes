'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Default initial user for static SSR/prerender so dashboard and management tools are rendered completely
  const [user, setUser] = useState<{ name: string; email: string; role: string }>({
    name: 'Super Admin',
    email: 'admin@omswastikbuildhomes.com',
    role: 'SUPER_ADMIN',
  });

  useEffect(() => {
    if (isLoginPage) return;

    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('osb_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          return;
        } catch (e) {}
      }

      // If no local storage user, verify via API or redirect to login
      fetch('/api/auth/me')
        .then((res) => {
          if (!res.ok) throw new Error('Not authenticated');
          return res.json();
        })
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('osb_user', JSON.stringify(data.user));
          } else {
            window.location.replace('/admin/login');
          }
        })
        .catch(() => {
          window.location.replace('/admin/login');
        });
    }
  }, [isLoginPage]);

  if (isLoginPage) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f6' }}>{children}</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f6' }}>
      {/* Immediate Client-Side Guard to redirect unauthenticated visitors without delay */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
              try {
                var u = localStorage.getItem('osb_user');
                var c = document.cookie || '';
                if (!u && !c.includes('osb_session')) {
                  window.location.replace('/admin/login');
                }
              } catch(e) {}
            }
            document.addEventListener('click', function(e) {
              var btn = e.target && (e.target.closest('#admin-logout-btn') || e.target.closest('[title="Sign Out"]'));
              if (btn) {
                try {
                  localStorage.removeItem('osb_user');
                  document.cookie = 'osb_session=; Max-Age=0; path=/;';
                } catch(err) {}
                window.location.href = '/admin/login';
              }
            });
          `,
        }}
      />
      <AdminSidebar user={user} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
