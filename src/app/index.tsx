import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useConvex } from "react-native-convex";

export default function HomeScreen() {
  const convex = useConvex();
  const isReady = !!convex;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          React Native + Convex Template
        </Text>
        <Text style={styles.subtitle}>
          Build your mobile app with Convex realtime data and serverless
          functions.
        </Text>

        <View style={styles.grid}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📱 Frontend</Text>
            <Text style={styles.sectionText}>
              React Native, Expo, TypeScript with full type safety. Add screens,
              components, and state management as usual.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Backend (Convex)</Text>
            <Text style={styles.sectionText}>
              {isReady
                ? "✅ Convex client is connected! Use `convex/` for your schema and server functions, then call them with `useQuery` / `useMutation`."
                : "⏳ Initializing Convex..."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔍 Parent Communication</Text>
            <Text style={styles.sectionText}>
              Console logs, errors, and app metrics are automatically forwarded
              to the parent IDE window for debugging and monitoring.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛡️ Error Handling</Text>
            <Text style={styles.sectionText}>
              React Error Boundary catches runtime errors and sends them to the
              parent for visibility.
            </Text>
          </View>
        </View>

        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>Next Steps:</Text>
          <Text style={styles.nextStepsItem}>
            1. Update `convex/schema.ts` with your data model
          </Text>
          <Text style={styles.nextStepsItem}>
            2. Create Convex functions in `convex/`
          </Text>
          <Text style={styles.nextStepsItem}>
            3. Add screens in `src/app/` using Expo Router
          </Text>
          <Text style={styles.nextStepsItem}>
            4. Use `useQuery` and `useMutation` hooks from Convex
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  card: {
    marginVertical: 16,
    marginHorizontal: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    lineHeight: 20,
  },
  grid: {
    gap: 16,
    marginBottom: 24,
  },
  section: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 19,
  },
  nextSteps: {
    backgroundColor: "#f0f7ff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: 12,
  },
  nextStepsItem: {
    fontSize: 13,
    color: "#1e40af",
    marginBottom: 8,
    lineHeight: 18,
  },
});
