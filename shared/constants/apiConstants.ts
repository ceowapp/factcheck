// Auth Endpoints
export const AUTH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  GOOGLE_LOGIN: '/auth/google',
  FACEBOOK_LOGIN: '/auth/facebook',
  APPLE_LOGIN: '/auth/apple',
  CHANGE_PASSWORD: '/auth/change-password',
  UPDATE_PROFILE: '/auth/profile',
  DELETE_ACCOUNT: '/auth/account',
};

// User Endpoints
export const USER = {
  PROFILE: '/users/profile',
  SETTINGS: '/users/settings',
  PREFERENCES: '/users/preferences',
  ACTIVITY: '/users/activity',
  VERIFICATION: '/users/verification',
  SOCIAL_LINKS: '/users/social-links',
  NOTIFICATIONS: '/users/notifications',
  STATS: '/users/stats',
};

// Video Endpoints
export const VIDEO = {
  LIST: '/videos',
  DETAIL: (id: string) => `/videos/${id}`,
  CREATE: '/videos',
  UPDATE: (id: string) => `/videos/${id}`,
  DELETE: (id: string) => `/videos/${id}`,
  UPLOAD: '/videos/upload',
  PROCESS: (id: string) => `/videos/${id}/process`,
  TRANSCRIPT: (id: string) => `/videos/${id}/transcript`,
  SEGMENTS: (id: string) => `/videos/${id}/segments`,
  ANALYTICS: (id: string) => `/videos/${id}/analytics`,
  COMMENTS: (id: string) => `/videos/${id}/comments`,
  LIKE: (id: string) => `/videos/${id}/like`,
  SHARE: (id: string) => `/videos/${id}/share`,
  REPORT: (id: string) => `/videos/${id}/report`,
};

// FactCheck Endpoints
export const FACTCHECK = {
  LIST: '/factchecks',
  DETAIL: (id: string) => `/factchecks/${id}`,
  CREATE: '/factchecks',
  UPDATE: (id: string) => `/factchecks/${id}`,
  DELETE: (id: string) => `/factchecks/${id}`,
  PUBLISH: (id: string) => `/factchecks/${id}/publish`,
  UNPUBLISH: (id: string) => `/factchecks/${id}/unpublish`,
  VERIFY: (id: string) => `/factchecks/${id}/verify`,
  REJECT: (id: string) => `/factchecks/${id}/reject`,
  COMMENTS: (id: string) => `/factchecks/${id}/comments`,
  LIKE: (id: string) => `/factchecks/${id}/like`,
  SHARE: (id: string) => `/factchecks/${id}/share`,
  REPORT: (id: string) => `/factchecks/${id}/report`,
  STATS: (id: string) => `/factchecks/${id}/stats`,
  VERSIONS: (id: string) => `/factchecks/${id}/versions`,
};

// Subscription Endpoints
export const SUBSCRIPTION = {
  PLANS: '/subscriptions/plans',
  CURRENT: '/subscriptions/current',
  SUBSCRIBE: '/subscriptions/subscribe',
  CANCEL: '/subscriptions/cancel',
  UPGRADE: '/subscriptions/upgrade',
  DOWNGRADE: '/subscriptions/downgrade',
  PAYMENT_METHODS: '/subscriptions/payment-methods',
  ADD_PAYMENT_METHOD: '/subscriptions/payment-methods',
  REMOVE_PAYMENT_METHOD: (id: string) => `/subscriptions/payment-methods/${id}`,
  INVOICES: '/subscriptions/invoices',
  INVOICE_DETAIL: (id: string) => `/subscriptions/invoices/${id}`,
  USAGE: '/subscriptions/usage',
  FEATURES: '/subscriptions/features',
};

// Comment Endpoints
export const COMMENT = {
  LIST: (entityId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments`,
  CREATE: (entityId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments`,
  UPDATE: (entityId: string, commentId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments/${commentId}`,
  DELETE: (entityId: string, commentId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments/${commentId}`,
  LIKE: (entityId: string, commentId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments/${commentId}/like`,
  REPLY: (entityId: string, commentId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments/${commentId}/replies`,
  REPORT: (entityId: string, commentId: string, entityType: 'video' | 'factcheck') => 
    `/${entityType}s/${entityId}/comments/${commentId}/report`,
};

// Notification Endpoints
export const NOTIFICATION = {
  LIST: '/notifications',
  MARK_READ: (id: string) => `/notifications/${id}/read`,
  MARK_ALL_READ: '/notifications/read-all',
  PREFERENCES: '/notifications/preferences',
  UNSUBSCRIBE: (id: string) => `/notifications/${id}/unsubscribe`,
};

// Search Endpoints
export const SEARCH = {
  GLOBAL: '/search',
  VIDEOS: '/search/videos',
  FACTCHECKS: '/search/factchecks',
  USERS: '/search/users',
  SUGGESTIONS: '/search/suggestions',
};

// Analytics Endpoints
export const ANALYTICS = {
  OVERVIEW: '/analytics/overview',
  VIDEOS: '/analytics/videos',
  FACTCHECKS: '/analytics/factchecks',
  USERS: '/analytics/users',
  ENGAGEMENT: '/analytics/engagement',
  REVENUE: '/analytics/revenue',
  EXPORT: '/analytics/export',
};

// Admin Endpoints
export const ADMIN = {
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  USER_DETAIL: (id: string) => `/admin/users/${id}`,
  VIDEOS: '/admin/videos',
  VIDEO_DETAIL: (id: string) => `/admin/videos/${id}`,
  FACTCHECKS: '/admin/factchecks',
  FACTCHECK_DETAIL: (id: string) => `/admin/factchecks/${id}`,
  SUBSCRIPTIONS: '/admin/subscriptions',
  REPORTS: '/admin/reports',
  SETTINGS: '/admin/settings',
  ROLES: '/admin/roles',
  PERMISSIONS: '/admin/permissions',
  LOGS: '/admin/logs',
}; 