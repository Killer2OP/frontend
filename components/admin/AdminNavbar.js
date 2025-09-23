'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AdminNavbar.module.css';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
        const res = await fetch(`${apiBase}/api/admin/stats`, { credentials: 'include' });
        const data = await res.json();
        if (res.ok && typeof data?.pending === 'number') setPendingCount(data.pending);
      } catch (_) {

      }
    }
    load();
  }, []);

  async function logout() {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
      await fetch(`${apiBase}/api/auth/admin-logout`, { method: 'POST', credentials: 'include' });
      // Clear any client hint cookie
      document.cookie = 'admin_client=; Path=/; Max-Age=0';
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  }

  // Hide navbar on admin login page
  if (pathname?.startsWith('/admin/login')) return null;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/pending', label: 'Pending', icon: '⏳', badge: pendingCount },
    { href: '/admin/history', label: 'History', icon: '📋' }
  ];

  // Function to check if a nav item should be active
  const isActive = (href) => {
    if (href === '/admin') {
      // Dashboard is only active on exact match or /admin/ but not sub-paths
      return pathname === '/admin' || pathname === '/admin/';
    }
    // Other items are active on exact match or sub-paths
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={styles.mobileMenuButton}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.brand}>
            <Link href="/admin" className={styles.logo}>
              <span className={styles.logoMark}>◆</span>
              <span className={styles.logoText}>Admin Panel</span>
            </Link>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  isActive(item.href) ? styles.active : ''
                }`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge > 0 && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <button onClick={logout} className={styles.logoutBtn}>
              <span className={styles.navIcon}>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
