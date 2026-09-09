import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('osb_session')?.value;
  const session = token ? verifyToken(token) : null;

  // For /admin/login, layout renders children directly without sidebar
  if (!session) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f6' }}>{children}</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f6' }}>
      <AdminSidebar user={session} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
