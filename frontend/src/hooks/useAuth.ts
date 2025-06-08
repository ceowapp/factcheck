import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { AUTH } from '../../shared/constants/apiConstants';
import { User } from '../../shared/types/entities/User';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../shared/types/auth/requests';
import { api } from '../lib/api';
import { 
  configureGoogleSignIn, 
  signInWithGoogle, 
  signOutFromGoogle,
  getGoogleAccessToken 
} from '../lib/google-auth';

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Configure Google Sign-In
    configureGoogleSignIn();

    // Check for stored token and validate it
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get<AuthResponse>(AUTH.REFRESH_TOKEN);
          setUser(response.data.user);
        } catch (err) {
          clearUser();
          localStorage.removeItem('token');
        }
      }
    };

    validateToken();
  }, []);

  const loginWithCredentials = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>(AUTH.LOGIN, credentials);
      const { user, token } = response.data;
      
      setUser(user);
      localStorage.setItem('token', token);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>(AUTH.REGISTER, userData);
      const { user, token } = response.data;
      
      setUser(user);
      localStorage.setItem('token', token);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post(AUTH.LOGOUT);
      await signOutFromGoogle();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearUser();
      localStorage.removeItem('token');
      router.replace('/login');
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get Google user info
      const googleUser = await signInWithGoogle();
      const accessToken = await getGoogleAccessToken();

      // Send Google credentials to backend
      const response = await api.post<AuthResponse>(AUTH.GOOGLE_LOGIN, {
        idToken: googleUser.idToken,
        accessToken,
        user: {
          email: googleUser.user.email,
          displayName: googleUser.user.name,
          photoURL: googleUser.user.photo,
        },
      });

      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put<AuthResponse>(AUTH.UPDATE_PROFILE, profileData);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password change failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(AUTH.FORGOT_PASSWORD, { email });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset request failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(AUTH.RESET_PASSWORD, {
        token,
        newPassword,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>(AUTH.VERIFY_EMAIL, { token });
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(AUTH.DELETE_ACCOUNT);
      await signOutFromGoogle();
      clearUser();
      localStorage.removeItem('token');
      router.replace('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Account deletion failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    loginWithCredentials,
    register,
    logout,
    loginWithGoogle,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    deleteAccount,
  };
}; 