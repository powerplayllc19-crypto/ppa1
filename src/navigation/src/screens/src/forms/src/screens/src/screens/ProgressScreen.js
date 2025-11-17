import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Your Progress" />
        <Card.Content>
          <Text style={styles.text}>
            Track your forms, disputes, and applications here.
          </Text>
          <Text style={styles.text}>
            Coming soon: Progress tracking dashboard
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 15,
  },
  card: {
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#5b6473',
    marginBottom: 10,
  },
});
