'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PendingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  function bytesToBase64(bytes) {
    // bytes: array-like (e.g., item.photos[i].data.data)
    let binary = '';
    const arr = Array.isArray(bytes) ? bytes : Array.from(bytes || []);
    const chunkSize = 0x8000;
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
  }

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`${apiBase}/api/admin/pending/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to load');
        setItem(data.item);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function act(action) {
    try {
      const res = await fetch(`${apiBase}/api/admin/pending/${id}/${action}`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Action failed');
      router.push('/admin/pending');
    } catch (e) {
      alert(e.message);
    }
  }

  if (loading) return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 16,
        padding: 32,
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: 18, color: '#6b7280' }}>Loading registration details...</div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '24px'
    }}>
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#dc2626',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '16px',
        borderRadius: 12,
        marginBottom: 24
      }}>{error}</div>
    </div>
  );

  if (!item) return null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: 8
        }}>Review Registration</h1>
        <p style={{ color: '#6b7280', fontSize: 16 }}>
          Review and approve user registration request
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        padding: 32,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 64,
              height: 64,
              background: 'rgba(164, 90, 42, 0.1)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28
            }}>
              👤
            </div>
            <div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
                marginBottom: 4
              }}>
                {item.fullName}
              </h2>
              <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#d97706',
                padding: '4px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                display: 'inline-block'
              }}>
                ⏳ Pending Approval
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Personal Information</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Mobile Number</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>{item.mobile}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Email Address</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>{item.email}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Gender</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>{item.gender}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Professional Information</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Education</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>{item.education}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Profession</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>{item.profession}</div>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Address Information</h3>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Permanent Address</div>
              <div style={{ color: '#374151', fontWeight: 500 }}>
                {item?.permanentAddress?.house}, {item?.permanentAddress?.street}, {item?.permanentAddress?.city} {item?.permanentAddress?.pin}
              </div>
            </div>
          </div>
        </div>

        {Array.isArray(item.photos) && item.photos.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(164, 90, 42, 0.1)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Photos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
              {item.photos.map((p, idx) => (
                <div key={idx} style={{
                  width: '100%',
                  height: 150,
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#f3f4f6',
                  position: 'relative'
                }}>
                  <img
                    src={`data:${p.mimetype};base64,${bytesToBase64(p.data.data)}`}
                    alt={`photo-${idx}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid rgba(164, 90, 42, 0.1)'
        }}>
          <button
            onClick={() => act('approve')}
            style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>✅</span>
            <span>Approve</span>
          </button>
          <button
            onClick={() => act('reject')}
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>❌</span>
            <span>Reject</span>
          </button>
        </div>
      </div>
    </div>
  );
}
