'use client'

import { useState } from 'react';
import styles from './AdminLogin.module.css';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
      const res = await fetch(`${apiBase}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      const data = await res.json();
      console.log('Response data:', data); 
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      console.log('Cookies after login:', document.cookie); 
      if (!res.ok) throw new Error(data?.error || 'Login failed');

      // Add small delay to ensure cookie is set
      console.log('Redirecting to /admin...');
      setTimeout(() => {
        // Redirect to admin dashboard without any query parameters
        window.location.replace('/admin');
      }, 100);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◆</span>
            <span className={styles.logoText}>Admin Panel</span>
          </div>
          <p className={styles.subtitle}>Secure Admin Access</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>⟳</span>
            ) : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.footerText}>
          <p>Protected administrative access only</p>
        </div>
      </div>
    </div>
  );
}
