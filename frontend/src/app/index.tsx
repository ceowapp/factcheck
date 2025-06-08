import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Page() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section with Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          <View style={styles.iconContainer}>
            <FontAwesome name="eye" size={48} color="#fff" />
          </View>
          
          <Text style={styles.heroTitle}>FactCheck AI</Text>
          <Text style={styles.heroSubtitle}>
            Instant video fact-checking powered by AI
          </Text>
          
          <View style={styles.ctaContainer}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Start Analyzing</Text>
                <FontAwesome name="arrow-right" size={16} color="#fff" style={styles.buttonIcon} />
              </TouchableOpacity>
            </Link>
          </View>
          
          <Text style={styles.trustText}>
            Trusted by 10,000+ creators worldwide
          </Text>
        </View>
      </LinearGradient>

      {/* Simple Value Proposition */}
      <View style={styles.valueSection}>
        <View style={styles.valueCard}>
          <FontAwesome name="bolt" size={24} color="#667eea" />
          <Text style={styles.valueTitle}>Lightning Fast</Text>
          <Text style={styles.valueDescription}>Get results in seconds</Text>
        </View>
        
        <View style={styles.valueCard}>
          <FontAwesome name="shield" size={24} color="#667eea" />
          <Text style={styles.valueTitle}>100% Accurate</Text>
          <Text style={styles.valueDescription}>AI-powered verification</Text>
        </View>
        
        <View style={styles.valueCard}>
          <FontAwesome name="globe" size={24} color="#667eea" />
          <Text style={styles.valueTitle}>Any Language</Text>
          <Text style={styles.valueDescription}>Global content support</Text>
        </View>
      </View>

      {/* CTA Footer */}
      <View style={styles.footerCta}>
        <Text style={styles.footerTitle}>Ready to verify truth?</Text>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Try Free Now</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbfc",
  },
  hero: {
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    backdropFilter: "blur(10px)",
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 20,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginBottom: 40,
    maxWidth: 400,
    lineHeight: 28,
  },
  ctaContainer: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonIcon: {
    marginLeft: 4,
  },
  trustText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  valueSection: {
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 60,
    gap: 20,
    justifyContent: "center",
  },
  valueCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 12,
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerCta: {
    backgroundColor: "#1a1a1a",
    padding: 48,
    alignItems: "center",
    marginVertical: 40,
  },
  footerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  footerButton: {
    backgroundColor: "#667eea",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});