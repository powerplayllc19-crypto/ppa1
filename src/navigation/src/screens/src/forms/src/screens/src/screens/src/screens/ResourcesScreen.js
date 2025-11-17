import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function ResourcesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Resources & Guides" />
        <Card.Content>
          <Text style={styles.text}>
            • State-specific eligibility guides
          </Text>
          <Text style={styles.text}>
            • Credit report dispute toolkit
          </Text>
          <Text style={styles.text}>
            • METRO 2 compliance standards
          </Text>
          <Text style={styles.text}>
            • Housing resources and support
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
