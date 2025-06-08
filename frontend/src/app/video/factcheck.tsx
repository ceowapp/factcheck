import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function FactCheck() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fact Check</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Claim</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter the claim to fact check"
              multiline
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fact Check</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your fact check analysis"
              multiline
              numberOfLines={6}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sources</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your sources (one per line)"
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.verdictContainer}>
            <Text style={styles.label}>Verdict</Text>
            <View style={styles.verdictButtons}>
              <TouchableOpacity style={[styles.verdictButton, styles.trueButton]}>
                <FontAwesome name="check" size={20} color="#fff" />
                <Text style={styles.verdictButtonText}>True</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.verdictButton, styles.falseButton]}>
                <FontAwesome name="times" size={20} color="#fff" />
                <Text style={styles.verdictButtonText}>False</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.verdictButton, styles.mixedButton]}>
                <FontAwesome name="question" size={20} color="#fff" />
                <Text style={styles.verdictButtonText}>Mixed</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Fact Check</Text>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  verdictContainer: {
    gap: 8,
  },
  verdictButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  verdictButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  trueButton: {
    backgroundColor: '#34C759',
  },
  falseButton: {
    backgroundColor: '#FF3B30',
  },
  mixedButton: {
    backgroundColor: '#FF9500',
  },
  verdictButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 