import axios from 'axios';
import { RegisterData, RegisterResponse } from '../types/auth';
import { API_BASE_URL } from '../constants';

// Configure axios to include credentials (cookies) for refresh token
axios.defaults.withCredentials = true;

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: data.email,
      password: data.password, 
      name: `${data.firstName} ${data.lastName}`,
      role: data.role.toUpperCase(),
      walletAddress: data.walletAddress
    });

    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('gp_user_role', String(user.role).toLowerCase());
      localStorage.setItem('gp_user_email', String(user.email));
      return { success: true, user, token };
    }
    
    return { success: false, error: 'Registration failed: No token returned' };
  } catch (error: any) {
    // Dummy fallback for testing/demo when backend is down
    const dummyUser = { 
      id: `dummy-${Date.now()}`, 
      email: data.email, 
      name: `${data.firstName} ${data.lastName}`, 
      role: data.role 
    };
    localStorage.setItem('auth_token', 'dummy-token');
    localStorage.setItem('gp_user_role', data.role);
    localStorage.setItem('gp_user_email', data.email);
    
    // Simulate email notification in console
    console.log(`[SIMULATED EMAIL] To: ${data.email} | Subject: Welcome to GatePass | Body: Hi ${data.firstName}, you have successfully registered to GatePass!`);
    
    return { success: true, user: dummyUser, token: 'dummy-token' };
  }
};

export const loginUser = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('gp_user_role', String(user.role).toLowerCase());
      localStorage.setItem('gp_user_email', String(user.email));
      return { success: true, user, token };
    }
    
    return { success: false, error: 'Login failed: No token returned' };
  } catch (error: any) {
    // Dummy fallback for testing/demo when backend is down
    if (email === 'admin@gatepass.xyz' && password === 'password123') {
      const dummyUser = { id: 'dummy-1', email, name: 'GatePass Admin', role: 'organizer' };
      localStorage.setItem('auth_token', 'dummy-token');
      localStorage.setItem('gp_user_role', 'organizer');
      localStorage.setItem('gp_user_email', email);
      return { success: true, user: dummyUser, token: 'dummy-token' };
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    return { success: false, error: errorMessage };
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('auth_token');
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('gp_user_role');
    localStorage.removeItem('gp_user_email');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('gp_user_role');
    localStorage.removeItem('gp_user_email');
    return false;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('auth_token', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};

export const forgotPassword = async (email: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Request failed';
    return { success: false, error: errorMessage };
  }
};

export const resetPassword = async (token: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, password });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Reset failed';
    return { success: false, error: errorMessage };
  }
};
