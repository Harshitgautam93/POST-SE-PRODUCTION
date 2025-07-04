import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:3001/api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'influencer';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // Set token
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  // Remove token
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const token = auth.getToken();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode(token) as User;
      return decoded;
    } catch {
      auth.removeToken();
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null;
  },

  // Check if user has specific role
  hasRole: (role: string): boolean => {
    const user = auth.getCurrentUser();
    return user?.role === role;
  },

  // Login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    auth.setToken(data.token);
    return data;
  },

  // Register
  register: async (email: string, password: string, name: string, role: string = 'customer'): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    auth.setToken(data.token);
    return data;
  },

  // Logout
  logout: (): void => {
    auth.removeToken();
    window.location.href = '/';
  },

  // Get auth headers for API requests
  getAuthHeaders: (): HeadersInit => {
    const token = auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }
}; 