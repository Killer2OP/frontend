'use client'

import { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
    
    const [form, setForm] = useState({
        emailOrPhone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
   
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
            const body = {
                mobile: form.emailOrPhone,
                password: form.password,
            };
            const res = await fetch(`${apiBase}/api/auth/user-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Login failed');
            // Flag on frontend domain for middleware checks
            document.cookie = `client_auth=1; path=/; max-age=${7 * 24 * 3600}`;
            window.location.href = '/';
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.pageBg}>
            <div className={styles.overlay} />
            <div>
                <video autoPlay muted loop playsInline className={styles.video}>
                    <source src="/189020-884234925_large.mp4" type="video/mp4" />
                </video>

                <form className={styles.card} onSubmit={handleSubmit} noValidate>
                    
                    <div className={styles.header}>
                        <h2 className={styles.title}>Login</h2>
                    </div>

                    {error && <p style={{ color: 'salmon', marginTop: 8 }}>{error}</p>}

                    <label className={styles.field}>
                        <span>Email or Phone</span>
                        <input
                            type="text"
                            name="emailOrPhone"
                            value={form.emailOrPhone}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit" className={styles.nextBtn} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
