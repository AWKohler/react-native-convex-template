import React, { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ParentCommunication } from "@/lib/ParentCommunication";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Forward error to parent IDE
    ParentCommunication.forwardError({
      message: error.message,
      stack: error.stack,
      type: "ReactError",
    });

    console.error("❌ React Error Boundary caught:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.errorBox}>
              <Text style={styles.title}>❌ Runtime Error</Text>

              <View style={styles.messageBox}>
                <Text style={styles.errorMessage}>
                  {error?.message || "Unknown error"}
                </Text>
                {error?.stack && (
                  <Text style={styles.stackTrace}>{error.stack}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={this.handleReset}
              >
                <Text style={styles.buttonText}>Reload App</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center" as const,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  errorBox: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderWidth: 1,
    borderColor: "#ff6b6b",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 16,
  },
  messageBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorMessage: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  stackTrace: {
    color: "#999",
    fontSize: 12,
    fontFamily: "Courier New",
  },
  button: {
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
};
