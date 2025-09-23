'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingApproval: 0,
    registeredUsers: 0,
    rejectedUsers: 0,
    ownDecisionUsers: 0,
    marriageBureauUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          window.location.href = '/admin/login';
          return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
        const res = await fetch(`${apiBase}/api/admin/dashboard-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to load stats');
        setStats(data);
      } catch (e) {
        console.error('Error loading dashboard:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: 8
        }}>Admin Dashboard</h1>
        <p style={{ color: '#6b7280', fontSize: 16 }}>
          Monitor and manage user registrations and approvals
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#dc2626',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '12px 16px',
          borderRadius: 12,
          marginBottom: 24
        }}>{error}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
        <StatCard
          label="Total request pending for Approval"
          value={stats.pendingApproval}
          href="/admin/pending"
          accent="#A45A2A"
          icon="⏳"
        />
        <StatCard
          label="Total registered users (approved only)"
          value={stats.registeredUsers}
          href="/admin/history?tab=approved"
          accent="#16a34a"
          icon="✅"
        />
        <StatCard
          label="Total users (rejected by admin)"
          value={stats.rejectedUsers}
          href="/admin/history?tab=rejected"
          accent="#dc2626"
          icon="❌"
        />
        <StatCard
          label="Total users who opted for own decision"
          value={stats.ownDecisionUsers}
          href="/admin/history?tab=own-decision"
          accent="#0891b2"
          icon="🤝"
        />
        <StatCard
          label="Total users who opted for marriage bureau"
          value={stats.marriageBureauUsers}
          href="/admin/history?tab=marriage-bureau"
          accent="#7c3aed"
          icon="💒"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, href, accent, icon }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${accent}, ${accent}dd)`
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            background: `${accent}15`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24
          }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#1f2937' }}>{value}</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: accent,
          fontSize: 14,
          fontWeight: 500
        }}>
          <span>View Details</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
