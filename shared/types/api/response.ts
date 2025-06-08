import { FirebaseAuthTypes } from '@react-native-firebase/auth-types';
import { IAuthError } from '../auth';

export interface ILoginResponse {
  user: FirebaseAuthTypes.User;
  token: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  user: FirebaseAuthTypes.User;
  token: string;
  refreshToken: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface IUpdateProfileResponse {
  user: FirebaseAuthTypes.User;
}

export interface IGoogleSignInResponse {
  user: FirebaseAuthTypes.User;
  token: string;
  refreshToken: string;
}

export interface IAuthResponse<T = unknown> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export interface IAuthResponseError extends IAuthError {
  responseId?: string;
  timestamp: number;
  status: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
} 