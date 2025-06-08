export type IStatus = {
    
  };

  export interface IResponseType<T> {
    
  }
  export type IReqUser = {
  };
  
  
  export type IAccount = {
  };
  
export type SubscriptionTier = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING' | 'FAILED';
export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export interface ISubscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  autoRenew: boolean;
  paymentMethodId?: string;
  features: {
    maxFactChecks: number;
    maxTeamMembers?: number;
    prioritySupport: boolean;
    customBranding?: boolean;
    apiAccess?: boolean;
  };
  metadata: {
    trialEndsAt?: Date;
    lastBillingDate?: Date;
    nextBillingDate?: Date;
    cancellationReason?: string;
  };
}

export interface ISubscriptionHistory {
  id: string;
  subscriptionId: string;
  action: 'CREATED' | 'UPDATED' | 'CANCELLED' | 'RENEWED' | 'FAILED';
  timestamp: Date;
  details: {
    previousTier?: SubscriptionTier;
    newTier?: SubscriptionTier;
    previousStatus?: SubscriptionStatus;
    newStatus?: SubscriptionStatus;
    reason?: string;
  };
}

export interface ISubscriptionUsage {
  id: string;
  subscriptionId: string;
  period: 'DAILY' | 'MONTHLY' | 'YEARLY';
  startDate: Date;
  endDate: Date;
  metrics: {
    factChecksCreated: number;
    factChecksPublished: number;
    apiCalls: number;
    storageUsed: number;
    teamMembersAdded: number;
  };
  limits: {
    maxFactChecks: number;
    maxApiCalls: number;
    maxStorage: number;
    maxTeamMembers: number;
  };
}  