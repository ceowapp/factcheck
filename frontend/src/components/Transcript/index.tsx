import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { formatDuration } from '@factcheck-video-analyzer/shared';

interface TranscriptSegment {
  startTime: number;
  endTime: number;
  text: string;
}

interface TranscriptProps {
  videoId: string;
  onTimePress: (time: number) => void;
}

export function Transcript({ videoId, onTimePress }: TranscriptProps) {
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTranscript();
  }, [videoId]);

  const fetchTranscript = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:5000/api/video/transcribe/${videoId}`
      );
      const data = await response.json();

      if (data.success) {
        setSegments(data.data.segments);
      } else {
        setError(data.error || 'Failed to fetch transcript');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="p-4">
        <Text className="text-gray-500 dark:text-gray-400">
          Loading transcript...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="max-h-64">
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row p-2 border-b border-gray-200 dark:border-gray-700"
          onPress={() => onTimePress(segment.startTime)}
        >
          <Text className="text-gray-500 dark:text-gray-400 w-16 text-sm">
            {formatDuration(segment.startTime)}
          </Text>
          <Text className="flex-1 text-black dark:text-white">
            {segment.text}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
} 