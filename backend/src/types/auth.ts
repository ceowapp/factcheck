import { User } from '../models/User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  photoURL?: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  accessToken: string;
  user: {
    email: string;
    displayName: string;
    photoURL?: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RequestWithUser extends Express.Request {
  user: {
    uid: string;
  };
} 