import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ConvexProvider } from "react-native-convex";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { convexClient } from "@/lib/convexClient";
import {
  setupConsoleForwarding,
  setupErrorHandlers,
  ParentCommunication,
} from "@/lib/ParentCommunication";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootLayoutContent() {
  useEffect(() => {
    // Initialize communication with parent IDE
    setupConsoleForwarding();
    setupErrorHandlers();

    // Signal app is ready
    ParentCommunication.signalReady();

    // Report initial metrics
    ParentCommunication.reportMetrics({
      platform: "react-native",
      convexUrl: process.env.EXPO_PUBLIC_CONVEX_URL,
    });

    console.log("✅ Convex Mobile Template initialized");
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Convex Mobile",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ConvexProvider client={convexClient}>
        <RootLayoutContent />
      </ConvexProvider>
    </ErrorBoundary>
  );
}
