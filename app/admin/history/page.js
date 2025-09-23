'use client'

import { useEffect, useState } from 'react';

export default function AdminHistoryPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('approved');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    { key: 'approved', label: 'Approved', icon: '✅', color: '#16a34a', bgColor: 'rgba(22, 163, 74, 0.1)' },
    { key: 'rejected', label: 'Rejected', icon: '❌', color: '#dc2626', bgColor: 'rgba(220, 38, 38, 0.1)' },
    { key: 'own-decision', label: 'Own Decision', icon: '🤝', color: '#0891b2', bgColor: 'rgba(8, 145, 178, 0.1)' },
    { key: 'marriage-bureau', label: 'Marriage Bureau', icon: '💒', color: '#7c3aed', bgColor: 'rgba(124, 58, 237, 0.1)' }
  ];

  async function load(s) {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
    setLoading(true);
    setError('');
    try {
      const qs = s ? `?status=${encodeURIComponent(s)}` : '';
      const res = await fetch(`${apiBase}/api/admin/history${qs}`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load history');
      setItems(data.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(status);
  }, [status]);

  function changeTab(s) {
    setStatus(s);
    setSearchTerm('');
  }

  const filteredItems = items.filter(item =>
    item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile?.includes(searchTerm) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusInfo = (itemStatus) => {
    return statusOptions.find(opt => opt.key === itemStatus) || statusOptions[0];
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: 8
        }}>Registration History</h1>
        <p style={{ color: '#6b7280', fontSize: 16 }}>
          View and manage all user registration records
        </p>
      </div>

      {/* Status Tabs */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {statusOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => changeTab(option.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                background: status === option.key ? option.bgColor : 'transparent',
                color: status === option.key ? option.color : '#6b7280',
                border: `1px solid ${status === option.key ? option.color : 'rgba(107, 114, 128, 0.2)'}`,
                borderRadius: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: 14
              }}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="Search by name, mobile, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '12px 16px',
              border: '1px solid rgba(107, 114, 128, 0.2)',
              borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.5)',
              color: '#374151',
              fontSize: 14
            }}
          />
        </div>
      </div>

      {/* Error Message */}
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

      {/* Loading State */}
      {loading ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: 18, color: '#6b7280' }}>Loading registration history...</div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: 24, marginBottom: 16 }}>📋</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>
            No {statusOptions.find(opt => opt.key === status)?.label.toLowerCase()} registrations
          </div>
          <div style={{ color: '#6b7280' }}>
            No records found for the selected status.
          </div>
        </div>
      ) : (
        /* History Cards */
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredItems.map((item) => {
            const statusInfo = getStatusInfo(item.status);
            return (
              <div key={item._id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 16,
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
                  background: `linear-gradient(90deg, ${statusInfo.color}, ${statusInfo.color}dd)`
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        background: statusInfo.bgColor,
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
                        <div style={{
                          background: statusInfo.bgColor,
                          color: statusInfo.color,
                          padding: '4px 12px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <span>{statusInfo.icon}</span>
                          <span>{statusInfo.label}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Mobile Number</div>
                        <div style={{ color: '#374151', fontWeight: 500 }}>{item.mobile}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Email Address</div>
                        <div style={{ color: '#374151', fontWeight: 500 }}>{item.email}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Registration Date</div>
                        <div style={{ color: '#374151', fontWeight: 500 }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Stats */}
      {!loading && filteredItems.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
          padding: 20,
          marginTop: 24,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                Showing {filteredItems.length} {statusOptions.find(opt => opt.key === status)?.label.toLowerCase()} registration{filteredItems.length !== 1 ? 's' : ''}
              </div>
              <div style={{ color: '#374151', fontWeight: 600 }}>
                Total: {items.length} registration{items.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {statusOptions.map((option) => {
                const count = items.filter(item => item.status === option.key).length;
                return (
                  <div key={option.key} style={{
                    textAlign: 'center',
                    padding: '8px 12px',
                    background: option.bgColor,
                    borderRadius: 8,
                    minWidth: 60
                  }}>
                    <div style={{ fontSize: 12, color: option.color, marginBottom: 2 }}>
                      {option.icon}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: option.color }}>
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
