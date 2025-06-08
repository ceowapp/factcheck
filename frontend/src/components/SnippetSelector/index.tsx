import { useState, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import { formatDuration } from '@factcheck-video-analyzer/shared';

interface SnippetSelectorProps {
  duration: number;
  onSelect: (startTime: number, endTime: number) => void;
}

export function SnippetSelector({ duration, onSelect }: SnippetSelectorProps) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const startMarker = new Animated.Value(0);
  const endMarker = new Animated.Value(60);

  const panResponderStart = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(0, Math.min(duration - 60, startTime + gestureState.dx));
      startMarker.setValue(newPosition);
      setStartTime(newPosition);
      setEndTime(newPosition + 60);
    },
    onPanResponderRelease: () => {
      onSelect(startTime, endTime);
    },
  });

  const panResponderEnd = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(startTime + 60, Math.min(duration, endTime + gestureState.dx));
      endMarker.setValue(newPosition);
      setEndTime(newPosition);
    },
    onPanResponderRelease: () => {
      onSelect(startTime, endTime);
    },
  });

  return (
    <View className="p-4 bg-gray-100 dark:bg-gray-800">
      <View className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
        {/* Timeline background */}
        <View className="absolute inset-0 flex-row">
          {Array.from({ length: Math.ceil(duration / 60) }).map((_, i) => (
            <View
              key={i}
              className="flex-1 border-r border-gray-300 dark:border-gray-600"
            />
          ))}
        </View>

        {/* Start marker */}
        <Animated.View
          {...panResponderStart.panHandlers}
          className="absolute h-full w-1 bg-blue-500"
          style={{
            left: startMarker.interpolate({
              inputRange: [0, duration],
              outputRange: ['0%', '100%'],
            }),
          }}
        >
          <View className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {formatDuration(startTime)}
            </Text>
          </View>
        </Animated.View>

        {/* End marker */}
        <Animated.View
          {...panResponderEnd.panHandlers}
          className="absolute h-full w-1 bg-red-500"
          style={{
            left: endMarker.interpolate({
              inputRange: [0, duration],
              outputRange: ['0%', '100%'],
            }),
          }}
        >
          <View className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {formatDuration(endTime)}
            </Text>
          </View>
        </Animated.View>

        {/* Selection highlight */}
        <Animated.View
          className="absolute h-full bg-blue-200 dark:bg-blue-900 opacity-30"
          style={{
            left: startMarker.interpolate({
              inputRange: [0, duration],
              outputRange: ['0%', '100%'],
            }),
            width: endMarker.interpolate({
              inputRange: [0, duration],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
    </View>
  );
} 