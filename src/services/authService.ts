import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface RegisterData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  country: string;
  role: 'attendee' | 'organizer';
  passwordHash?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
  message?: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: data.email,
      password: data.password || 'TemporaryPassword123!', // Fallback if not provided, but should be
      name: `${data.firstName} ${data.lastName}`,
      role: data.role.toUpperCase(),
    });

    if (response.data && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
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
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Request failed';
    return { success: false, error: errorMessage };
  }
};

export const resetPassword = async (token: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Reset failed';
    return { success: false, error: errorMessage };
  }
};
