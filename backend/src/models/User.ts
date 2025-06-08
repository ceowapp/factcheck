export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'moderator' | 'admin';
  reputation: number;
  createdAt: Date;
  lastLogin: Date;
  emailVerified: boolean;
  isActive: boolean;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
  stats: {
    claimsSubmitted: number;
    claimsVerified: number;
    evidenceProvided: number;
    commentsCount: number;
    likesReceived: number;
  };
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  subscription?: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate?: Date;
    features: string[];
  };
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface UserStats {
  claimsSubmitted: number;
  claimsVerified: number;
  evidenceProvided: number;
  commentsCount: number;
  likesReceived: number;
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  website?: string;
}

export interface Subscription {
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  features: string[];
} 