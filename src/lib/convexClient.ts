import { ConvexClient } from "convex/react-native";

/**
 * Convex is provisioned by the platform. We assume CONVEX_URL is injected
 * by the orchestrator before runtime.
 */
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "EXPO_PUBLIC_CONVEX_URL missing. This template expects a platform-injected Convex deployment."
  );
}

export const convexClient = new ConvexClient(convexUrl);
