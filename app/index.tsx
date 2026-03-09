import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.emoji}>📱</Text>
        <Text style={styles.title}>React Native + Convex</Text>
        <Text style={styles.subtitle}>
          Build your mobile app with Convex realtime data and serverless functions.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Frontend</Text>
          <Text style={styles.cardText}>
            Expo, React Native, and Expo Router are prewired. Add screens in{' '}
            <Text style={styles.code}>app/</Text>, components anywhere you like.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Backend (Convex)</Text>
          <Text style={styles.cardText}>
            The Convex client is mounted. Use{' '}
            <Text style={styles.code}>convex/</Text> for your schema and server
            functions, then call them with{' '}
            <Text style={styles.code}>useQuery</Text> /{' '}
            <Text style={styles.code}>useMutation</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f7f4',
    padding: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 60,
    width: '100%',
    maxWidth: 600,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  grid: {
    width: '100%',
    maxWidth: 600,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8e4de',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#7c6af0',
    backgroundColor: '#f0eeff',
    paddingHorizontal: 3,
  },
});
