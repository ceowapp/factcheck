import { create } from 'zustand';
import { VideoMetadata } from '@factcheck-video-analyzer/shared';

interface VideoState {
  videoMetadata: VideoMetadata | null;
  recentVideos: VideoMetadata[];
  setVideoMetadata: (metadata: VideoMetadata) => void;
  addRecentVideo: (video: VideoMetadata) => void;
  clearRecentVideos: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoMetadata: null,
  recentVideos: [],
  setVideoMetadata: (metadata) => set({ videoMetadata: metadata }),
  addRecentVideo: (video) =>
    set((state) => ({
      recentVideos: [video, ...state.recentVideos.filter((v) => v.id !== video.id)].slice(0, 10),
    })),
  clearRecentVideos: () => set({ recentVideos: [] }),
})); 