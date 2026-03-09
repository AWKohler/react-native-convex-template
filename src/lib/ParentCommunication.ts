/**
 * Parent Window Communication Module
 *
 * Forwards logs, errors, and app state to parent IDE for monitoring.
 * Adapted from web version to work with React Native.
 *
 * In a React Native WebView or iframe context, this facilitates:
 * - Console log/error forwarding
 * - Error boundary notifications
 * - App lifecycle events
 */

import { NativeModules } from "react-native";

const isInFrame = () => {
  // This will be true if running in an iframe/WebView context
  // In development, this might not apply; in production it depends on deployment
  return (
    typeof window !== "undefined" && (window as any).parent !== window
  );
};

export const ParentCommunication = {
  /**
   * Send a message to parent window
   */
  postMessage: (data: Record<string, any>) => {
    if (isInFrame()) {
      try {
        (window as any).parent.postMessage(data, "*");
      } catch (e) {
        console.error("[ParentComm] Failed to post message:", e);
      }
    }
  },

  /**
   * Forward console.log to parent
   */
  forwardLog: (level: "log" | "warn" | "error", ...args: unknown[]) => {
    try {
      const message = args
        .map((a) =>
          typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
        )
        .join(" ");

      ParentCommunication.postMessage({
        type: "CONSOLE",
        level,
        message,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[ParentComm] Failed to forward log:", e);
    }
  },

  /**
   * Forward an error to parent (from error boundary or uncaught handler)
   */
  forwardError: (error: {
    message: string;
    stack?: string;
    type?: string;
  }) => {
    try {
      ParentCommunication.postMessage({
        type: "ERROR",
        message: error.message,
        stack: error.stack,
        errorType: error.type || "Unknown",
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[ParentComm] Failed to forward error:", e);
    }
  },

  /**
   * Signal app ready (loaded and rendered)
   */
  signalReady: () => {
    try {
      ParentCommunication.postMessage({
        type: "APP_READY",
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[ParentComm] Failed to signal ready:", e);
    }
  },

  /**
   * Report app metrics/state
   */
  reportMetrics: (metrics: Record<string, any>) => {
    try {
      ParentCommunication.postMessage({
        type: "METRICS",
        data: metrics,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[ParentComm] Failed to report metrics:", e);
    }
  },
};

/**
 * Set up console interception
 */
export function setupConsoleForwarding() {
  const originalLog = console.log.bind(console);
  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);

  console.log = (...args) => {
    originalLog(...args);
    ParentCommunication.forwardLog("log", ...args);
  };

  console.warn = (...args) => {
    originalWarn(...args);
    ParentCommunication.forwardLog("warn", ...args);
  };

  console.error = (...args) => {
    originalError(...args);
    ParentCommunication.forwardLog("error", ...args);
  };
}

/**
 * Set up global error handlers
 */
export function setupErrorHandlers() {
  // Handle unhandled promise rejections
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // In development, RN has built-in error handling
    const originalHandler = ErrorUtils.getGlobalHandler?.();
    ErrorUtils.setGlobalHandler((error: Error, isFatal: boolean) => {
      ParentCommunication.forwardError({
        message: error.message,
        stack: error.stack,
        type: isFatal ? "FatalError" : "Error",
      });
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }
}
