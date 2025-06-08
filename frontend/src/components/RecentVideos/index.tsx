import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoStore } from '../store/features/videoStore';
import { formatDuration } from '@factcheck-video-analyzer/shared';

export function RecentVideos() {
  const router = useRouter();
  const { recentVideos } = useVideoStore();

  if (recentVideos.length === 0) {
    return null;
  }

  return (
    <View>
      <Text className="text-lg font-semibold mb-2 text-black dark:text-white">
        Recent Videos
      </Text>
      <View className="space-y-4">
        {recentVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            className="flex-row bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
            onPress={() => router.push(`/video/${video.id}`)}
          >
            <Image
              source={{ uri: video.thumbnailUrl }}
              className="w-32 h-24"
              resizeMode="cover"
            />
            <View className="flex-1 p-3">
              <Text
                className="text-black dark:text-white font-semibold"
                numberOfLines={2}
              >
                {video.title}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {video.author}
              </Text>
              <View className="flex-row items-center mt-2">
                <Text className="text-gray-500 dark:text-gray-400 text-xs">
                  {formatDuration(video.duration)}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs mx-2">
                  •
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs capitalize">
                  {video.platform}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 