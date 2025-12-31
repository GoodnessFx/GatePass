export type UserRole = 'attendee' | 'organizer';

export interface RegisterData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  country: string;
  role: UserRole;
  passwordHash?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
  message?: string;
}

