import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.heroCard}>
        <Card.Content>
          <Text style={styles.heroTitle}>Welcome to POWER PLAY</Text>
          <Text style={styles.heroSubtitle}>
            Housing Helper App
          </Text>
          <Text style={styles.heroText}>
            Get a free eligibility check, generate dispute PDFs, verify METRO 2 compliance, and build a tenant-advantage profile.
          </Text>
          <Button
            mode="contained"
            style={styles.heroButton}
            onPress={() => navigation.navigate('Forms')}
          >
            Start Creating Forms
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.featureCard}>
        <Card.Title title="Available Forms" />
        <Card.Content>
          <Text style={styles.featureText}>✓ Equifax Housing Dispute</Text>
          <Text style={styles.featureText}>✓ Experian Screening Dispute</Text>
          <Text style={styles.featureText}>✓ TransUnion Dispute</Text>
          <Text style={styles.featureText}>✓ METRO 2 Compliance</Text>
          <Text style={styles.featureText}>✓ Tenant Advantage Profile</Text>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Title title="How It Works" />
        <Card.Content>
          <Text style={styles.infoStep}>1. Choose a form</Text>
          <Text style={styles.infoStep}>2. Fill in your information</Text>
          <Text style={styles.infoStep}>3. Review the details</Text>
          <Text style={styles.infoStep}>4. Generate PDF</Text>
          <Text style={styles.infoStep}>5. Share or download</Text>
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
  heroCard: {
    marginBottom: 15,
    backgroundColor: '#eef4ff',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0e6efb',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1945a5',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 14,
    color: '#5b6473',
    lineHeight: 20,
    marginBottom: 15,
  },
  heroButton: {
    backgroundColor: '#0e6efb',
    marginTop: 10,
  },
  featureCard: {
    marginBottom: 15,
  },
  featureText: {
    fontSize: 14,
    color: '#0e1726',
    marginBottom: 8,
    fontWeight: '500',
  },
  infoCard: {
    marginBottom: 15,
  },
  infoStep: {
    fontSize: 13,
    color: '#5b6473',
    marginBottom: 10,
    lineHeight: 18,
  },
});
