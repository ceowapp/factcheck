import { z } from 'zod';
import { SubscriptionTier } from '../types/entities/Subscription';

export const userRoleSchema = z.enum(['USER', 'FACT_CHECKER', 'ADMIN', 'SUPER_ADMIN'] as const);
export const userStatusSchema = z.enum(['ACTIVE', 'SUSPENDED', 'BANNED', 'INACTIVE'] as const);

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  photoURL: z.string().url().optional(),
  role: userRoleSchema,
  status: userStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
  metadata: z.object({
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
    bio: z.string().max(500).optional(),
    website: z.string().url().optional(),
    socialLinks: z.object({
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      instagram: z.string().url().optional(),
    }).optional(),
  }),
  preferences: z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    newsletterSubscription: z.boolean(),
    theme: z.enum(['LIGHT', 'DARK', 'SYSTEM'] as const),
  }),
  stats: z.object({
    factChecksCreated: z.number().min(0),
    factChecksPublished: z.number().min(0),
    totalViews: z.number().min(0),
    totalLikes: z.number().min(0),
    totalComments: z.number().min(0),
  }),
  subscription: z.object({
    tier: z.enum(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'] as const),
    expiresAt: z.date().optional(),
  }).optional(),
});

export const userProfileSchema = userSchema.extend({
  factChecks: z.object({
    published: z.number().min(0),
    drafts: z.number().min(0),
    archived: z.number().min(0),
  }),
  activity: z.object({
    lastActive: z.date(),
    loginCount: z.number().min(0),
    sessionDuration: z.number().min(0),
  }),
  verification: z.object({
    isVerified: z.boolean(),
    verifiedAt: z.date().optional(),
    verificationMethod: z.enum(['EMAIL', 'PHONE', 'ID'] as const).optional(),
  }),
});

export const userSettingsSchema = z.object({
  userId: z.string(),
  notifications: z.object({
    email: z.object({
      factCheckUpdates: z.boolean(),
      commentReplies: z.boolean(),
      systemUpdates: z.boolean(),
      marketing: z.boolean(),
    }),
    push: z.object({
      factCheckUpdates: z.boolean(),
      commentReplies: z.boolean(),
      systemUpdates: z.boolean(),
    }),
  }),
  privacy: z.object({
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    showActivity: z.boolean(),
    allowTagging: z.boolean(),
  }),
  display: z.object({
    language: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
    timeFormat: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;

