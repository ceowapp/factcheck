import { z } from 'zod';
import { SubscriptionTier } from '../types/entities/Subscription';

export const subscriptionTierSchema = z.enum(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'] as const);
export const subscriptionStatusSchema = z.enum(['ACTIVE', 'CANCELLED', 'EXPIRED', 'PENDING'] as const);
export const paymentStatusSchema = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'] as const);
export const paymentMethodSchema = z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'CRYPTO'] as const);

export const subscriptionFeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isEnabled: z.boolean(),
  limit: z.number().optional(),
  usage: z.number().optional(),
});

export const subscriptionPlanSchema = z.object({
  id: z.string(),
  tier: subscriptionTierSchema,
  name: z.string(),
  description: z.string(),
  price: z.object({
    amount: z.number().min(0),
    currency: z.string(),
    interval: z.enum(['MONTHLY', 'YEARLY'] as const),
  }),
  features: z.array(subscriptionFeatureSchema),
  limits: z.object({
    factChecksPerMonth: z.number().min(0),
    videosPerMonth: z.number().min(0),
    storageGB: z.number().min(0),
    teamMembers: z.number().min(0),
    apiCallsPerMonth: z.number().min(0),
  }),
  metadata: z.object({
    isPopular: z.boolean(),
    isRecommended: z.boolean(),
    trialDays: z.number().min(0),
    setupFee: z.number().min(0).optional(),
  }),
});

export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  plan: subscriptionPlanSchema,
  status: subscriptionStatusSchema,
  startDate: z.date(),
  endDate: z.date(),
  autoRenew: z.boolean(),
  paymentMethod: paymentMethodSchema,
  billingCycle: z.enum(['MONTHLY', 'YEARLY'] as const),
  price: z.object({
    amount: z.number().min(0),
    currency: z.string(),
    nextBillingDate: z.date(),
  }),
  usage: z.object({
    factChecksUsed: z.number().min(0),
    videosUsed: z.number().min(0),
    storageUsed: z.number().min(0),
    apiCallsUsed: z.number().min(0),
  }),
  history: z.array(z.object({
    date: z.date(),
    action: z.enum(['ACTIVATED', 'CANCELLED', 'RENEWED', 'UPGRADED', 'DOWNGRADED'] as const),
    details: z.string(),
  })),
});

export const paymentSchema = z.object({
  id: z.string(),
  subscriptionId: z.string(),
  userId: z.string(),
  amount: z.number().min(0),
  currency: z.string(),
  status: paymentStatusSchema,
  method: paymentMethodSchema,
  date: z.date(),
  receipt: z.object({
    number: z.string(),
    url: z.string().url(),
  }),
  metadata: z.object({
    transactionId: z.string(),
    gateway: z.string(),
    last4: z.string().optional(),
    cardType: z.string().optional(),
  }),
});

export type IStatus = {
    
  };

  export interface IResponseType<T> {
    
  }
  export type IReqUser = {
  };
  
  
  export type IAccount = {
  };
  