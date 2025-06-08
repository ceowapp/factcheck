import { FirebaseAuthTypes } from '@react-native-firebase/auth-types';
import { ERROR_CODES } from '../api/errors';

export type AuthErrorCode = keyof typeof ERROR_CODES;

export interface IAuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: IAuthError | null;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials extends ISignInCredentials {
  name: string;
}

export interface IAuthResponse {
  user: FirebaseAuthTypes.User;
  token: string;
}

export interface IGoogleSignInResponse {
  idToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    photo?: string;
  };
}

export interface IAuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export interface IAuthConfig {
  googleWebClientId: string;
  googleIosClientId?: string;
}

export type AuthProvider = 'email' | 'google';

export interface IAuthProviderConfig {
  provider: AuthProvider;
  enabled: boolean;
}

// Re-export request and response types
export * from './requests';
export * from './responses'; 