import { toast } from 'sonner';

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 chars, 1 letter, 1 number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  // Min 2 chars, letters only (and spaces/hyphens)
  const nameRegex = /^[a-zA-Z\s-]{2,}$/;
  return nameRegex.test(name);
};

// Simple client-side rate limit check (in-memory)
const actionTimestamps: Record<string, number[]> = {};

export const checkRateLimit = (action: string, limit: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  if (!actionTimestamps[action]) {
    actionTimestamps[action] = [];
  }
  
  // Filter out old timestamps
  actionTimestamps[action] = actionTimestamps[action].filter(ts => now - ts < windowMs);
  
  if (actionTimestamps[action].length >= limit) {
    return false;
  }
  
  actionTimestamps[action].push(now);
  return true;
};

export const hashPassword = async (password: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};
