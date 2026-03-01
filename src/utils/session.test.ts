import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setSession, getSession, clearSession } from './session';

describe('Session Management', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    localStorage.clear();
  });

  it('should set and get session data from cookies and localStorage', () => {
    const data = {
      token: 'test-token',
      role: 'organizer',
      email: 'test@example.com'
    };

    setSession(data);
    const session = getSession();

    expect(session.token).toBe(data.token);
    expect(session.role).toBe(data.role);
    expect(session.email).toBe(data.email);
  });

  it('should clear session data', () => {
    setSession({
      token: 'test-token',
      role: 'organizer',
      email: 'test@example.com'
    });

    clearSession();
    const session = getSession();

    expect(session.token).toBeUndefined();
    expect(session.role).toBeNull();
    expect(session.email).toBeNull();
  });
});
