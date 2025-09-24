'use client'

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // ✅ send/receive cookies
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor (optional)
api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) return Promise.reject(error.response.data || { error: 'Server error' });
    return Promise.reject({ error: 'Network error' });
  }
);

export const loginAdmin = async (form) => {
  try {
    const res = await api.post('/auth/admin-login', form);
    return res.data; // <-- only return the JSON body
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, error: err?.error || err?.message || 'Login failed' };
  }
};

export default api;