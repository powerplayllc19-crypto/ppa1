import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');

  const handleLogin = async () => {
    await SecureStore.setItemAsync('userToken', 'demo-token');
    // Navigation will update automatically
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="POWER PLAY Housing Helper" />
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0e6efb',
    marginTop: 10,
  },
});
