import {getColor} from '@/constants/styles';
import {View, Text, StyleSheet} from 'react-native';

export default function EmptyTaskMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌤️</Text>
      <Text style={styles.title}>It’s a clear day!</Text>
      <Text style={styles.subtitle}>
        No tasks yet. Tap "Add Task" to begin ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: '35%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: getColor('neutral', 700),
  },
  subtitle: {
    fontSize: 16,
    color: getColor('neutral', 700),
    textAlign: 'center',
    marginTop: 4,
  },
});
