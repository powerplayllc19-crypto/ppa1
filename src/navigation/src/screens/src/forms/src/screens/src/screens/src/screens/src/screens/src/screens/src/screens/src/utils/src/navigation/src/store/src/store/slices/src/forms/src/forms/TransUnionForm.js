import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

export default function TransUnionForm({ onBack, onGenerate }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = (data) => {
    onGenerate(data, 'transunion');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.header}>
        <Card.Title title="TransUnion Dispute Form" />
        <Card.Content>
          <Text>Rental History Dispute</Text>
          <Button onPress={onBack}>Back</Button>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="First Name"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Last Name"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Generate PDF
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  header: { margin: 15 },
  section: { margin: 15 },
  input: { marginBottom: 15 },
});
