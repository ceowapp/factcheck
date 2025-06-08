import { TouchableOpacity, Text, View } from 'react-native';
import { VideoPlatform } from '@factcheck-video-analyzer/shared';
import { Ionicons } from '@expo/vector-icons';

interface PlatformCardProps {
  platform: VideoPlatform;
  onPress: () => void;
}

const platformIcons: Record<VideoPlatform, string> = {
  youtube: 'logo-youtube',
  tiktok: 'logo-tiktok',
  instagram: 'logo-instagram',
  facebook: 'logo-facebook',
};

const platformColors: Record<VideoPlatform, string> = {
  youtube: 'bg-red-500',
  tiktok: 'bg-black',
  instagram: 'bg-pink-500',
  facebook: 'bg-blue-600',
};

export function PlatformCard({ platform, onPress }: PlatformCardProps) {
  return (
    <TouchableOpacity
      className={`w-[48%] mb-4 rounded-lg overflow-hidden ${platformColors[platform]}`}
      onPress={onPress}
    >
      <View className="p-4 items-center">
        <Ionicons name={platformIcons[platform]} size={32} color="white" />
        <Text className="text-white font-semibold mt-2 capitalize">
          {platform}
        </Text>
      </View>
    </TouchableOpacity>
  );
} 