import { Router } from 'express';
import { google } from 'googleapis';
import { parseVideoUrl, createSuccessResponse, createErrorResponse } from '@factcheck-video-analyzer/shared';
import { VideoMetadata } from '@factcheck-video-analyzer/shared';

const router = Router();
const youtube = google.youtube('v3');

// Get video metadata
router.post('/metadata', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json(createErrorResponse('URL is required'));
    }

    const parsedUrl = parseVideoUrl(url);
    if (!parsedUrl) {
      return res.status(400).json(createErrorResponse('Invalid video URL'));
    }

    const { platform, id } = parsedUrl;

    // Fetch metadata based on platform
    let metadata: VideoMetadata;
    switch (platform) {
      case 'youtube':
        const response = await youtube.videos.list({
          part: ['snippet', 'contentDetails'],
          id: [id],
          key: process.env.YOUTUBE_API_KEY,
        });

        const video = response.data.items?.[0];
        if (!video) {
          return res.status(404).json(createErrorResponse('Video not found'));
        }

        metadata = {
          id,
          platform,
          title: video.snippet?.title || '',
          thumbnailUrl: video.snippet?.thumbnails?.high?.url || '',
          duration: parseDuration(video.contentDetails?.duration || ''),
          author: video.snippet?.channelTitle || '',
          url,
          createdAt: new Date(video.snippet?.publishedAt || ''),
        };
        break;

      // Add other platform handlers here
      default:
        return res.status(400).json(createErrorResponse('Platform not supported'));
    }

    res.json(createSuccessResponse(metadata));
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    res.status(500).json(createErrorResponse('Failed to fetch video metadata'));
  }
});

// Helper function to parse ISO 8601 duration
function parseDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  const hours = (match[1] && parseInt(match[1])) || 0;
  const minutes = (match[2] && parseInt(match[2])) || 0;
  const seconds = (match[3] && parseInt(match[3])) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export const videoRoutes = router; 