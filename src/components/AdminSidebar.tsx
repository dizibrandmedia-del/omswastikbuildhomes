'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Grid,
  Users,
  PhoneCall,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Building,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('osb_user');
    }
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_EXECUTIVE'] },
    { label: 'Plot Inventory', href: '/admin/inventory', icon: <Grid size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_EXECUTIVE'] },
    { label: 'Leads Pipeline', href: '/admin/leads', icon: <Users size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_EXECUTIVE'] },
    { label: 'Follow-ups Queue', href: '/admin/follow-ups', icon: <PhoneCall size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_EXECUTIVE'] },
    { label: 'Site Visits', href: '/admin/site-visits', icon: <Calendar size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_EXECUTIVE'] },
    { label: 'Bookings Ledger', href: '/admin/bookings', icon: <FileText size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'] },
    { label: 'Reports & Export', href: '/admin/reports', icon: <BarChart3 size={18} />, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'] },
    { label: 'System Settings', href: '/admin/settings', icon: <Settings size={18} />, roles: ['SUPER_ADMIN', 'ADMIN'] },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#002528',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid rgba(228, 170, 60, 0.2)',
        flexShrink: 0,
      }}
    >
      {/* Brand Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Link href="/" style={{ display: 'block', position: 'relative', width: '160px', height: '44px', marginBottom: '0.75rem' }}>
          <Image src="/images/logo.png" alt="Om Swastik Logo" fill style={{ objectFit: 'contain' }} />
        </Link>
        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.05em' }}>
          INTERNAL CRM &amp; INVENTORY
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ color: isActive ? 'var(--gold)' : 'inherit' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout Footer */}
      <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>{user.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
            {user.role.replace('_', ' ')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.45rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#cbd5e1',
            }}
          >
            Live Site &rarr;
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.45rem 0.75rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
            title="Sign Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
