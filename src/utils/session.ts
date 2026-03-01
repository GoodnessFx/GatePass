export type SessionData = {
  token?: string;
  role?: string | null;
  email?: string | null;
};

const ROLE_KEY = 'gp_user_role';
const EMAIL_KEY = 'gp_user_email';
const COOKIE_NAME = 'gp_session_token';

export function setSession(data: SessionData) {
  if (data.token) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(data.token)}; path=/; max-age=86400; sameSite=Lax`;
  }
  if (data.role) {
    document.cookie = `${ROLE_KEY}=${encodeURIComponent(data.role)}; path=/; max-age=86400; sameSite=Lax`;
    localStorage.setItem(ROLE_KEY, data.role); // Keep for legacy if needed, but cookie is primary
  }
  if (data.email) {
    document.cookie = `${EMAIL_KEY}=${encodeURIComponent(data.email)}; path=/; max-age=86400; sameSite=Lax`;
    localStorage.setItem(EMAIL_KEY, data.email);
  }
}

export function clearSession() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax`;
  document.cookie = `${ROLE_KEY}=; path=/; max-age=0; sameSite=Lax`;
  document.cookie = `${EMAIL_KEY}=; path=/; max-age=0; sameSite=Lax`;
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getSession(): SessionData {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  
  const getCookie = (name: string) => {
    const c = cookies.find((row) => row.startsWith(`${name}=`));
    return c ? decodeURIComponent(c.split('=')[1] || '') : null;
  };

  const token = getCookie(COOKIE_NAME);
  const role = getCookie(ROLE_KEY) || localStorage.getItem(ROLE_KEY);
  const email = getCookie(EMAIL_KEY) || localStorage.getItem(EMAIL_KEY);

  return {
    token: token || undefined,
    role,
    email
  };
}
