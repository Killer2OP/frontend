'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PendingListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
    async function load() {
      try {
        const res = await fetch(`${apiBase}/api/admin/pending`, { credentials: 'include' });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to load');
        setItems(data.items || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: 8
        }}>Pending Registrations</h1>
        <p style={{ color: '#6b7280', fontSize: 16 }}>
          Review and approve user registration requests
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#dc2626',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '16px',
          borderRadius: 12,
          marginBottom: 24
        }}>{error}</div>
      )}

      {loading ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          padding: 32,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: 18, color: '#6b7280' }}>Loading pending registrations...</div>
        </div>
      ) : items.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: 24, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>
            No pending registrations
          </div>
          <div style={{ color: '#6b7280' }}>
            All user requests have been processed. Great job!
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {items.map(item => (
            <PendingCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function PendingCard({ item }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 16,
      padding: 20,
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
        background: 'linear-gradient(90deg, #A45A2A, #c77745)'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 48,
              height: 48,
              background: 'rgba(164, 90, 42, 0.1)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20
            }}>
              👤
            </div>
            <div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
                marginBottom: 4
              }}>
                {item.fullName}
              </h3>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Registration pending approval
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Email</div>
              <div style={{ color: '#374151', fontWeight: 500 }}>{item.email}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Mobile</div>
              <div style={{ color: '#374151', fontWeight: 500 }}>{item.mobile}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Status</div>
              <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#d97706',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                display: 'inline-block'
              }}>
                ⏳ Pending
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/admin/pending/${item._id}`}
          style={{
            background: 'linear-gradient(135deg, #A45A2A, #8b4429)',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>Review</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
