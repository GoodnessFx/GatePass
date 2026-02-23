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
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(data.token)}; path=/; sameSite=Lax`;
  }
  if (data.role) {
    localStorage.setItem(ROLE_KEY, data.role);
  }
  if (data.email) {
    localStorage.setItem(EMAIL_KEY, data.email);
  }
}

export function clearSession() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax`;
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getSession(): SessionData {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));
  const token = cookie ? decodeURIComponent(cookie.split('=')[1] || '') : '';
  const role = localStorage.getItem(ROLE_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  return {
    token: token || undefined,
    role,
    email
  };
}
