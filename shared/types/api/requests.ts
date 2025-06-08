import { IAuthError } from '../auth';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdateProfileRequest {
  displayName?: string;
  photoURL?: string;
}

export interface IGoogleSignInRequest {
  idToken: string;
}

export interface IAuthRequest<T = unknown> {
  data: T;
  headers?: Record<string, string>;
}

export interface IAuthRequestError extends IAuthError {
  requestId?: string;
  timestamp: number;
} 