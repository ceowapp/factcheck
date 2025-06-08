import { z } from 'zod';
import { VideoFormat, VideoQuality, VideoStatus } from '../types/entities/Video';

// Video Platform Types
export const VideoPlatform = z.enum(['youtube', 'tiktok', 'instagram', 'facebook']);
export type VideoPlatform = z.infer<typeof VideoPlatform>;

// Video Metadata Types
export const VideoMetadata = z.object({
  id: z.string(),
  platform: VideoPlatform,
  title: z.string(),
  thumbnailUrl: z.string(),
  duration: z.number(),
  author: z.string(),
  url: z.string(),
  createdAt: z.date(),
});

export type VideoMetadata = z.infer<typeof VideoMetadata>;

// Snippet Types
export const Snippet = z.object({
    id: z.string(),
    videoId: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    transcript: z.string(),
    audioUrl: z.string().optional(),
    createdAt: z.date(),
  });
  
  export type Snippet = z.infer<typeof Snippet>;

export const videoFormatSchema = z.enum(['MP4', 'WEBM', 'MOV', 'AVI'] as const);
export const videoQualitySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'ORIGINAL'] as const);
export const videoStatusSchema = z.enum(['PROCESSING', 'READY', 'FAILED', 'DELETED'] as const);

export const videoPlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['YOUTUBE', 'VIMEO', 'CUSTOM']),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  baseUrl: z.string().url(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  metadata: z.object({
    maxFileSize: z.number().optional(),
    supportedFormats: z.array(videoFormatSchema),
    supportedQualities: z.array(videoQualitySchema),
    webhookUrl: z.string().url().optional(),
  }),
});

export const videoMetadataSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()),
  category: z.string().optional(),
  language: z.string(),
  duration: z.number().positive(),
  thumbnailUrl: z.string().url(),
  captions: z.array(z.object({
    language: z.string(),
    url: z.string().url(),
    format: z.enum(['SRT', 'VTT', 'TXT']),
  })).optional(),
  chapters: z.array(z.object({
    title: z.string(),
    startTime: z.number().min(0),
    endTime: z.number().positive(),
  })).optional(),
  customFields: z.record(z.unknown()).optional(),
});

export const videoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
  duration: z.number().positive(),
  size: z.number().positive(),
  format: videoFormatSchema,
  quality: videoQualitySchema,
  status: videoStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  uploadedBy: z.string(),
  metadata: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    fps: z.number().positive(),
    bitrate: z.number().positive(),
    codec: z.string(),
    language: z.string().optional(),
    subtitles: z.array(z.object({
      language: z.string(),
      url: z.string().url(),
    })).optional(),
  }),
  processing: z.object({
    progress: z.number().min(0).max(100),
    error: z.string().optional(),
    startedAt: z.date().optional(),
    completedAt: z.date().optional(),
  }),
  access: z.object({
    isPublic: z.boolean(),
    allowedUsers: z.array(z.string()).optional(),
    allowedRoles: z.array(z.string()).optional(),
    password: z.string().optional(),
  }),
});

export const videoTranscodingSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  quality: videoQualitySchema,
  format: videoFormatSchema,
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']),
  progress: z.number().min(0).max(100),
  outputUrl: z.string().url().optional(),
  error: z.string().optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  metadata: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    bitrate: z.number().positive(),
    duration: z.number().positive(),
  }),
});

export const videoAnalyticsSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
  date: z.date(),
  metrics: z.object({
    views: z.number().min(0),
    uniqueViews: z.number().min(0),
    watchTime: z.number().min(0),
    averageWatchTime: z.number().min(0),
    completionRate: z.number().min(0).max(100),
    likes: z.number().min(0),
    shares: z.number().min(0),
    comments: z.number().min(0),
  }),
  audience: z.object({
    countries: z.record(z.number().min(0)),
    devices: z.record(z.number().min(0)),
    platforms: z.record(z.number().min(0)),
  }),
  engagement: z.object({
    likes: z.number().min(0),
    shares: z.number().min(0),
    comments: z.number().min(0),
    bookmarks: z.number().min(0),
  }),
});