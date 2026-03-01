import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { loginUser, registerUser, logoutUser } from './authService';
import * as sessionUtils from '../utils/session';

vi.mock('axios');
vi.mock('../utils/session');

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should return success and set session on successful login', async () => {
      const mockUser = { id: '1', email: 'test@example.com', role: 'ORGANIZER' };
      const mockResponse = { data: { token: 'valid-token', user: mockUser } };
      (axios.post as any).mockResolvedValue(mockResponse);

      const result = await loginUser('test@example.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.token).toBe('valid-token');
      expect(sessionUtils.setSession).toHaveBeenCalledWith({
        token: 'valid-token',
        role: 'organizer',
        email: 'test@example.com'
      });
    });

    it('should use fallback and set session on network error', async () => {
      (axios.post as any).mockRejectedValue(new Error('Network Error'));

      const result = await loginUser('test@example.com', 'password123');

      expect(result.success).toBe(true); // Fallback returns success: true
      expect(result.token).toBe('dummy-token');
      expect(sessionUtils.setSession).toHaveBeenCalled();
    });
  });

  describe('logoutUser', () => {
    it('should call clearSession and return true', async () => {
      (axios.post as any).mockResolvedValue({ data: {} });
      (sessionUtils.getSession as any).mockReturnValue({ token: 'test-token' });

      const result = await logoutUser();

      expect(result).toBe(true);
      expect(sessionUtils.clearSession).toHaveBeenCalled();
    });
  });
});
