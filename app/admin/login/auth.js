// Utility for API calls with authentication
export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('admin_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add token to headers if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Keep for cookie compatibility
  };

  try {
    const response = await fetch(url, config);

    // If unauthorized, redirect to login
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
      return;
    }

    return response;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Logout utility
export const logout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
  window.location.href = '/admin/login';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('admin_token');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('admin_user');
  return userStr ? JSON.parse(userStr) : null;
};
