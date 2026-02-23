import axios from 'axios';
import { RegisterData, RegisterResponse } from '../types/auth';

import { API_BASE_URL } from '../constants';

// Types moved to src/types/auth.ts for clearer separation of concerns

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email: data.email,
      password: data.password || 'TemporaryPassword123!', 
      name: `${data.firstName} ${data.lastName}`,
      role: data.role.toUpperCase(),
    });

    if (response.data && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      if (response.data.user?.role) {
        localStorage.setItem('gp_user_role', String(response.data.user.role).toLowerCase());
      }
      if (response.data.user?.email) {
        localStorage.setItem('gp_user_email', String(response.data.user.email));
      }
      return { success: true, user: response.data.user, token: response.data.token };
    }
    
    return { success: false, error: 'Invalid response from server' };
  } catch (error: any) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    return { success: false, error: errorMessage };
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
