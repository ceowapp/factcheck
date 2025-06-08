import { FirebaseAuthTypes } from '@react-native-firebase/auth-types';
import { SubscriptionTier } from './Subscription';

export type UserRole = 'USER' | 'FACT_CHECKER' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'INACTIVE';

export interface IUser {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  metadata: {
    phoneNumber?: string;
    country?: string;
    language?: string;
    timezone?: string;
    bio?: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      facebook?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newsletterSubscription: boolean;
    theme: 'LIGHT' | 'DARK' | 'SYSTEM';
  };
  stats: {
    factChecksCreated: number;
    factChecksPublished: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
  };
  subscription?: {
    tier: SubscriptionTier;
    expiresAt?: Date;
  };
}

export interface IUserProfile extends IUser {
  factChecks: {
    published: number;
    drafts: number;
    archived: number;
  };
  activity: {
    lastActive: Date;
    loginCount: number;
    sessionDuration: number;
  };
  verification: {
    isVerified: boolean;
    verifiedAt?: Date;
    verificationMethod?: 'EMAIL' | 'PHONE' | 'ID';
  };
}

export interface IUserSettings {
  userId: string;
  notifications: {
    email: {
      factCheckUpdates: boolean;
      commentReplies: boolean;
      systemUpdates: boolean;
      marketing: boolean;
    };
    push: {
      factCheckUpdates: boolean;
      commentReplies: boolean;
      systemUpdates: boolean;
    };
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showActivity: boolean;
    allowTagging: boolean;
  };
  display: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
  };
}

export const ERROR_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    EXPIRE_TOKEN: 440,
    INTERNAL_SERVER_ERROR: 500,
    INVALID_EMAIL_AUTHORIZE: 369,
  };
  