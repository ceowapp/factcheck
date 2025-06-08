import { IVideoPlatform, IVideoMetadata } from '../types/entities';

// Video URL parsing utilities
export const parseVideoUrl = (url: string): { platform: VideoPlatform; id: string } | null => {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      const id = urlObj.hostname.includes('youtu.be')
        ? urlObj.pathname.slice(1)
        : new URLSearchParams(urlObj.search).get('v');
      if (id) return { platform: 'youtube', id };
    }
    
    // TikTok
    if (urlObj.hostname.includes('tiktok.com')) {
      const id = urlObj.pathname.split('/').pop();
      if (id) return { platform: 'tiktok', id };
    }
    
    // Instagram
    if (urlObj.hostname.includes('instagram.com')) {
      const id = urlObj.pathname.split('/').pop();
      if (id) return { platform: 'instagram', id };
    }
    
    // Facebook
    if (urlObj.hostname.includes('facebook.com')) {
      const id = urlObj.pathname.split('/').pop();
      if (id) return { platform: 'facebook', id };
    }
    
    return null;
  } catch {
    return null;
  }
};

// Time formatting utilities
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// File utilities
export const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}; 