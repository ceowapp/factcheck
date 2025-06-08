import { z } from 'zod';

// Fact Check Types
export const Claim = z.object({
  id: z.string(),
  snippetId: z.string(),
  text: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  verdict: z.enum(['true', 'false', 'mixed']),
  confidence: z.number(),
  sources: z.array(z.string()),
  explanation: z.string(),
});

export type Claim = z.infer<typeof Claim>;

// Note Types
export const Note = z.object({
  id: z.string(),
  userId: z.string(),
  snippetId: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  folderId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Note = z.infer<typeof Note>;

// Folder Types
export const Folder = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Folder = z.infer<typeof Folder>;

export const factCheckVerdictSchema = z.enum(['TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'] as const);
export const factCheckStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const);

export const factCheckSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  claim: z.string().min(1),
  verdict: factCheckVerdictSchema,
  explanation: z.string().min(1),
  sources: z.array(z.string().url()),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  status: factCheckStatusSchema,
  views: z.number().min(0),
  likes: z.number().min(0),
  shares: z.number().min(0),
  comments: z.number().min(0),
  mediaUrls: z.object({
    images: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
  }),
  metadata: z.object({
    language: z.string(),
    region: z.string().optional(),
    category: z.string(),
    subcategory: z.string().optional(),
  }),
});

export const factCheckCommentSchema = z.object({
  id: z.string(),
  factCheckId: z.string(),
  userId: z.string(),
  content: z.string().min(1).max(1000),
  createdAt: z.date(),
  updatedAt: z.date(),
  likes: z.number().min(0),
  replies: z.number().min(0),
  parentId: z.string().optional(),
  status: z.enum(['ACTIVE', 'DELETED', 'FLAGGED'] as const),
});

export const factCheckReportSchema = z.object({
  id: z.string(),
  factCheckId: z.string(),
  reportedBy: z.string(),
  reason: z.string().min(1),
  status: z.enum(['PENDING', 'REVIEWED', 'RESOLVED'] as const),
  createdAt: z.date(),
  updatedAt: z.date(),
  reviewedBy: z.string().optional(),
  resolution: z.string().optional(),
});

export const factCheckStatsSchema = z.object({
  totalViews: z.number().min(0),
  totalLikes: z.number().min(0),
  totalShares: z.number().min(0),
  totalComments: z.number().min(0),
  averageRating: z.number().min(0).max(5),
  engagementRate: z.number().min(0).max(100),
  reach: z.number().min(0),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const),
  date: z.date(),
});