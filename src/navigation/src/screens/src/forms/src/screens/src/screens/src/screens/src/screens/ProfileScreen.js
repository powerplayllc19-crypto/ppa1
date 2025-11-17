import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Your Profile" />
        <Card.Content>
          <Text style={styles.text}>
            Account settings and preferences
          </Text>
          <Text style={styles.text}>
            Coming soon: Profile management
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
