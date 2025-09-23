'use client'

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>Dashboard</h1>
      <p>This is a protected page. If you can see this after logging in, the mandatory registration/login flow works.</p>
    </div>
  );
}
