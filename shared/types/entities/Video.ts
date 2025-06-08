export type VideoStatus = 'PROCESSING' | 'READY' | 'FAILED' | 'DELETED';
export type VideoQuality = 'LOW' | 'MEDIUM' | 'HIGH' | 'ORIGINAL';
export type VideoFormat = 'MP4' | 'WEBM' | 'MOV' | 'AVI';

export interface IVideoPlatform {
  id: string;
  name: string;
  type: 'YOUTUBE' | 'VIMEO' | 'CUSTOM';
  apiKey?: string;
  apiSecret?: string;
  baseUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  metadata: {
    maxFileSize?: number;
    supportedFormats: VideoFormat[];
    supportedQualities: VideoQuality[];
    webhookUrl?: string;
  };
}

export interface IVideoMetadata {
  id: string;
  videoId: string;
  title: string;
  description?: string;
  tags: string[];
  category?: string;
  language: string;
  duration: number;
  thumbnailUrl: string;
  captions?: {
    language: string;
    url: string;
    format: 'SRT' | 'VTT' | 'TXT';
  }[];
  chapters?: {
    title: string;
    startTime: number;
    endTime: number;
  }[];
  customFields?: Record<string, unknown>;
}

export interface IVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  size: number;
  format: VideoFormat;
  quality: VideoQuality;
  status: VideoStatus;
  createdAt: Date;
  updatedAt: Date;
  uploadedBy: string; // user ID
  metadata: {
    width: number;
    height: number;
    fps: number;
    bitrate: number;
    codec: string;
    language?: string;
    subtitles?: {
      language: string;
      url: string;
    }[];
  };
  processing: {
    progress: number;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
  };
  access: {
    isPublic: boolean;
    allowedUsers?: string[];
    allowedRoles?: string[];
    password?: string;
  };
}

export interface IVideoTranscoding {
  id: string;
  videoId: string;
  quality: VideoQuality;
  format: VideoFormat;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  outputUrl?: string;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  metadata: {
    width: number;
    height: number;
    bitrate: number;
    duration: number;
  };
}

export interface IVideoAnalytics {
  id: string;
  videoId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  date: Date;
  metrics: {
    views: number;
    uniqueViews: number;
    watchTime: number;
    averageWatchTime: number;
    completionRate: number;
    likes: number;
    shares: number;
    comments: number;
  };
  audience: {
    countries: Record<string, number>;
    devices: Record<string, number>;
    platforms: Record<string, number>;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    bookmarks: number;
  };
}
