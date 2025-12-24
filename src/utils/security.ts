
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function sanitizeInput(input: string): string {
  // Basic sanitization to prevent simple XSS in display
  return input.replace(/[<>]/g, '');
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  // Min 8 chars, at least one letter and one number
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
}

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  try {
    const now = Date.now();
    const storageKey = `gp_ratelimit_${key}`;
    const stored = localStorage.getItem(storageKey);
    
    let attempts: number[] = [];
    if (stored) {
      attempts = JSON.parse(stored);
    }
    
    // Filter out old attempts
    const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (recentAttempts.length >= limit) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(recentAttempts));
    return true;
  } catch (e) {
    console.error("Rate limit error", e);
    return true; // Fail open if storage fails
  }
}
