import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Claim } from '@factcheck-video-analyzer/shared';
import { useAuth } from '../hooks/useAuth';

interface FactCheckPanelProps {
  videoId: string;
  startTime: number;
  endTime: number;
}

export function FactCheckPanel({ videoId, startTime, endTime }: FactCheckPanelProps) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFactCheck = async () => {
    if (!user) {
      setError('Please sign in to use fact-checking');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/factcheck/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          startTime,
          endTime,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setClaims(data.data.claims);
      } else {
        setError(data.error || 'Failed to analyze claims');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRebuttal = async () => {
    if (!claims.length) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/factcheck/rebuttal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claims }),
      });

      const data = await response.json();
      if (data.success) {
        // Handle rebuttal (e.g., show in modal, copy to clipboard)
        console.log(data.data.rebuttal);
      }
    } catch (err) {
      setError('Failed to generate rebuttal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <Text className="text-lg font-semibold mb-4 text-black dark:text-white">
        Fact Check Results
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500 mb-4">{error}</Text>
      ) : claims.length > 0 ? (
        <View>
          {claims.map((claim) => (
            <View key={claim.id} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <Text className="text-black dark:text-white mb-2">{claim.text}</Text>
              <View className="flex-row items-center mb-2">
                <Text
                  className={`font-semibold ${
                    claim.verdict === 'true'
                      ? 'text-green-500'
                      : claim.verdict === 'false'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {claim.verdict.toUpperCase()}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 ml-2">
                  ({Math.round(claim.confidence * 100)}% confidence)
                </Text>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 mb-2">
                {claim.explanation}
              </Text>
              {claim.sources.length > 0 && (
                <View>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Sources:
                  </Text>
                  {claim.sources.map((source, index) => (
                    <Text
                      key={index}
                      className="text-sm text-blue-500 dark:text-blue-400"
                    >
                      {source}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg mt-4"
            onPress={handleGenerateRebuttal}
          >
            <Text className="text-white text-center font-semibold">
              Generate Rebuttal
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleFactCheck}
        >
          <Text className="text-white text-center font-semibold">
            Analyze Claims
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 