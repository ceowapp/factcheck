import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function VideoDetail() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoPlaceholderText}>Video Player</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Video Title</Text>
        <Text style={styles.description}>
          This is a detailed description of the video content. It includes information about the video's subject matter, key points, and any relevant context.
        </Text>
        <View style={styles.metadata}>
          <Text style={styles.metadataText}>Uploaded: January 1, 2024</Text>
          <Text style={styles.metadataText}>Duration: 10:30</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    color: '#999',
    fontSize: 14,
  },
}); 