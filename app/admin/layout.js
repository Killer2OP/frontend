"use client";

import AdminNavbar from '@/components/admin/AdminNavbar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminRootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !(pathname === '/admin/login' || pathname?.startsWith('/admin/login/'));
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth >= 768) {
        setSidebarWidth(showNavbar ? 280 : 0);
      } else {
        setSidebarWidth(0);
      }
    };

    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [showNavbar]);

  // Add token to headers for API requests
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token && showNavbar) {
      // This will help with authentication checks
      console.log('Admin token found in localStorage');
    }
  }, [showNavbar]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {showNavbar && <AdminNavbar />}
      <main style={{
        flex: 1,
        marginLeft: showNavbar ? sidebarWidth : 0,
        padding: showNavbar ? '24px' : 0,
        background: showNavbar ? 'linear-gradient(135deg, #fff3e0, #f7f3ef)' : 'transparent',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease'
      }}>
        {children}
      </main>
    </div>
  );
}
