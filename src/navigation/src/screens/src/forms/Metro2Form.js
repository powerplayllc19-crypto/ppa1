import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Checkbox,
  RadioButton,
  HelperText,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

const Metro2Form = ({ onBack, onGenerate }) => {
  const [disputedFields, setDisputedFields] = useState([]);
  const [fieldToAdd, setFieldToAdd] = useState({
    fieldName: '',
    reportedValue: '',
    correctValue: '',
    issue: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      // Consumer Information
      firstName: '',
      lastName: '',
      ssn: '',
      dob: '',
      currentAddress: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      email: '',

      // Reporting Institution
      institutionName: '',
      institutionContact: '',
      institutionPhone: '',
      institutionEmail: '',
      metro2Code: '',

      // Account Information
      accountNumber: '',
      accountStatus: '',
      accountType: '',
      openDate: '',
      closeDate: '',

      // Reporting Details
      reportFrequency: 'monthly',
      lastReportDate: '',
      frequencyOfReporting: '',

      // Data Accuracy
      accuracyConcern: '',
      descriptionOfIssue: '',
      dateOfDiscovery: '',

      // Supporting Documentation
      hasAccountStatement: false,
      hasContractDocuments: false,
      hasCommunication: false,
      hasPaymentRecords: false,

      // METRO 2 Specific
      blockErrorFlag: false,
      recordInheritanceIndicator: false,
      consumerStatementPresent: false,

      // Resolution Request
      desiredResolution: '',
      timelineForCorrection: '',

      // Compliance Statement
      agreeToCompliance: false,
    },
  });

  const addDisputedField = () => {
    if (
      fieldToAdd.fieldName &&
      fieldToAdd.reportedValue &&
      fieldToAdd.correctValue
    ) {
      setDisputedFields([...disputedFields, fieldToAdd]);
      setFieldToAdd({
        fieldName: '',
        reportedValue: '',
        correctValue: '',
        issue: '',
      });
      Alert.alert('Success', 'Field added to dispute list');
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const removeDisputedField = (index) => {
    setDisputedFields(disputedFields.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (disputedFields.length === 0) {
      Alert.alert(
        'No Disputed Fields',
        'Please add at least one disputed field before generating the form.'
      );
      return;
    }

    if (!data.agreeToCompliance) {
      Alert.alert(
        'Compliance Agreement Required',
        'You must agree to the compliance statement to proceed.'
      );
      return;
    }

    const formData = {
      ...data,
      disputedFields,
      formType: 'METRO 2 Compliance Verification',
      generatedDate: new Date().toISOString(),
    };

    onGenerate(formData, 'metro2');
  };

  const metro2FieldOptions = [
    'Payment Status',
    'Account Balance',
    'Credit Limit',
    'Payment History',
    'Account Status Code',
    'Delinquency Status',
    'Account Opening Date',
    'Account Closing Date',
    'Last Payment Date',
    'Account Type',
    'Creditor Classification',
    'High Balance Amount',
    'Terms and Conditions',
    'Consumer Statement',
    'Subscriber Name',
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        {/* Header */}
        <Card style={styles.header}>
          <Card.Content>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.title}>
                  METRO 2 Compliance Verification
                </Text>
                <Text style={styles.subtitle}>
                  Verify accuracy of credit reporting
                </Text>
              </View>
              <Button onPress={onBack}>Back</Button>
            </View>
          </Card.Content>
        </Card>

        {/* What is METRO 2? */}
        <Card style={styles.infoCard}>
          <Card.Title title="What is METRO 2?" />
          <Card.Content>
            <Text style={styles.infoText}>
              METRO 2 is the standard format used by credit reporting agencies to exchange consumer credit information. It ensures accurate, consistent reporting across all bureaus. This form verifies that your account data is reported correctly according to METRO 2 standards.
            </Text>
          </Card.Content>
        </Card>

        {/* Consumer Information */}
        <Card style={styles.section}>
          <Card.Title title="Consumer Information" />
          <Card.Content>
            <View style={styles.row}>
              <Controller
                control={control}
                rules={{ required: 'First name is required' }}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="First Name *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    error={!!errors.firstName}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: 'Last name is required' }}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Last Name *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    error={!!errors.lastName}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              rules={{
                required: 'SSN is required',
                pattern: {
                  value: /^\d{3}-\d{2}-\d{4}$/,
                  message: 'Format: XXX-XX-XXXX',
                },
              }}
              name="ssn"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Social Security Number *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="XXX-XX-XXXX"
                  style={styles.input}
                  error={!!errors.ssn}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Date of Birth"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="MM/DD/YYYY"
                  style={styles.input}
                />
              )}
            />

            <Controller
              control={control}
              rules={{ required: 'Address is required' }}
              name="currentAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Current Address *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  error={!!errors.currentAddress}
                />
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                rules={{ required: 'City is required' }}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="City *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    error={!!errors.city}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: 'State is required' }}
                name="state"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="State *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.quarterInput}
                    maxLength={2}
                    autoCapitalize="characters"
                    error={!!errors.state}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: 'ZIP is required' }}
                name="zip"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="ZIP *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.quarterInput}
                    keyboardType="numeric"
                    error={!!errors.zip}
                  />
                )}
              />
            </View>

            <View style={styles.row}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Phone Number"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    keyboardType="phone-pad"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email Address"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    keyboardType="email-address"
                  />
                )}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Reporting Institution */}
        <Card style={styles.section}>
          <Card.Title title="Reporting Institution" />
          <Card.Content>
            <Controller
              control={control}
              rules={{ required: 'Institution name is required' }}
              name="institutionName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Institution Name *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Bank, Credit Card Company, etc."
                  error={!!errors.institutionName}
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: 'METRO 2 Code is required',
                minLength: {
                  value: 1,
                  message: 'Please enter a valid code',
                },
              }}
              name="metro2Code"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="METRO 2 Subscriber Code *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Your reporting institution code"
                  error={!!errors.metro2Code}
                />
              )}
            />

            <Controller
              control={control}
              name="reportFrequency"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.label}>Report Frequency</Text>
                  <RadioButton.Group onValueChange={onChange} value={value}>
                    <View style={styles.radioItem}>
                      <RadioButton value="monthly" />
                      <Text>Monthly</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="quarterly" />
                      <Text>Quarterly</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="biannually" />
                      <Text>Bi-Annually</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="annually" />
                      <Text>Annually</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        {/* Account Information */}
        <Card style={styles.section}>
          <Card.Title title="Account Information" />
          <Card.Content>
            <Controller
              control={control}
              rules={{ required: 'Account number is required' }}
              name="accountNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Account Number *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  error={!!errors.accountNumber}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="accountType"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Account Type"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Credit Card, Mortgage, Auto Loan, etc."
                />
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                name="openDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Open Date"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    placeholder="MM/DD/YYYY"
                  />
                )}
              />

              <Controller
                control={control}
                name="closeDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Close Date (if closed)"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.halfInput}
                    placeholder="MM/DD/YYYY"
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              rules={{ required: 'Account status is required' }}
              name="accountStatus"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.label}>Account Status *</Text>
                  <RadioButton.Group onValueChange={onChange} value={value}>
                    <View style={styles.radioItem}>
                      <RadioButton value="open" />
                      <Text>Open</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="closed_by_consumer" />
                      <Text>Closed by Consumer</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="closed_by_creditor" />
                      <Text>Closed by Creditor</Text>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="delinquent" />
                      <Text>Delinquent</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        {/* Data Accuracy Concerns */}
        <Card style={styles.section}>
          <Card.Title title="Data Accuracy Concerns" />
          <Card.Content>
            <Controller
              control={control}
              rules={{ required: 'Please describe your accuracy concern' }}
              name="accuracyConcern"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Accuracy Concern *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  placeholder="What data is inaccurate or missing?"
                  error={!!errors.accuracyConcern}
                />
              )}
            />

            <Controller
              control={control}
              name="descriptionOfIssue"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Detailed Description of Issue"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  placeholder="Provide specific details..."
                />
              )}
            />

            <Controller
              control={control}
              name="dateOfDiscovery"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Date You Discovered the Issue"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Disputed Fields Section */}
        <Card style={styles.section}>
          <Card.Title title="Disputed Fields" />
          <Card.Content>
            <Text style={styles.label}>Add fields you believe are inaccurate:</Text>

            <View style={styles.fieldInputContainer}>
              <TextInput
                label="Field Name"
                value={fieldToAdd.fieldName}
                onChangeText={(text) =>
                  setFieldToAdd({ ...fieldToAdd, fieldName: text })
                }
                style={styles.input}
                placeholder="Select from METRO 2 fields"
              />

              <TextInput
                label="Reported Value"
                value={fieldToAdd.reportedValue}
                onChangeText={(text) =>
                  setFieldToAdd({ ...fieldToAdd, reportedValue: text })
                }
                style={styles.input}
                placeholder="What is currently reported"
              />

              <TextInput
                label="Correct Value"
                value={fieldToAdd.correctValue}
                onChangeText={(text) =>
                  setFieldToAdd({ ...fieldToAdd, correctValue: text })
                }
                style={styles.input}
                placeholder="What it should be"
              />

              <TextInput
                label="Issue Description (optional)"
                value={fieldToAdd.issue}
                onChangeText={(text) =>
                  setFieldToAdd({ ...fieldToAdd, issue: text })
                }
                style={styles.input}
                placeholder="Why this is inaccurate"
              />

              <Button
                mode="contained"
                onPress={addDisputedField}
                style={styles.addButton}
              >
                Add Disputed Field
              </Button>
            </View>

            {disputedFields.length > 0 && (
              <View style={styles.disputeList}>
                <Text style={styles.listTitle}>
                  Fields Added: {disputedFields.length}
                </Text>
                {disputedFields.map((field, index) => (
                  <View key={index} style={styles.disputeItem}>
                    <View style={styles.disputeItemContent}>
                      <Text style={styles.disputeItemField}>
                        <Text style={styles.bold}>{field.fieldName}</Text>
                      </Text>
                      <Text style={styles.disputeItemText}>
                        Reported: {field.reportedValue}
                      </Text>
                      <Text style={styles.disputeItemText}>
                        Correct: {field.correctValue}
                      </Text>
                      {field.issue && (
                        <Text style={styles.disputeItemText}>
                          Issue: {field.issue}
                        </Text>
                      )}
                    </View>
                    <Button
                      icon="close"
                      compact
                      onPress={() => removeDisputedField(index)}
                    >
                      Remove
                    </Button>
                  </View>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Supporting Documentation */}
        <Card style={styles.section}>
          <Card.Title title="Supporting Documentation" />
          <Card.Content>
            <Text style={styles.label}>Select documents you will include:</Text>

            <Checkbox.Item
              label="Account Statement"
              status={watch('hasAccountStatement') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('hasAccountStatement', !watch('hasAccountStatement'))
              }
            />

            <Checkbox.Item
              label="Loan/Credit Agreement"
              status={watch('hasContractDocuments') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('hasContractDocuments', !watch('hasContractDocuments'))
              }
            />

            <Checkbox.Item
              label="Communications with Institution"
              status={watch('hasCommunication') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('hasCommunication', !watch('hasCommunication'))
              }
            />

            <Checkbox.Item
              label="Payment Records"
              status={watch('hasPaymentRecords') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('hasPaymentRecords', !watch('hasPaymentRecords'))
              }
            />
          </Card.Content>
        </Card>

        {/* METRO 2 Specific Indicators */}
        <Card style={styles.section}>
          <Card.Title title="METRO 2 Indicators" />
          <Card.Content>
            <Text style={styles.label}>
              Check if any of these apply to your account:
            </Text>

            <Checkbox.Item
              label="Block Error Flag Present"
              status={watch('blockErrorFlag') ? 'checked' : 'unchecked'}
              onPress={() => setValue('blockErrorFlag', !watch('blockErrorFlag'))}
            />

            <Checkbox.Item
              label="Record Inheritance Indicator Present"
              status={
                watch('recordInheritanceIndicator') ? 'checked' : 'unchecked'
              }
              onPress={() =>
                setValue(
                  'recordInheritanceIndicator',
                  !watch('recordInheritanceIndicator')
                )
              }
            />

            <Checkbox.Item
              label="Consumer Statement Present"
              status={watch('consumerStatementPresent') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue(
                  'consumerStatementPresent',
                  !watch('consumerStatementPresent')
                )
              }
            />
          </Card.Content>
        </Card>

        {/* Desired Resolution */}
        <Card style={styles.section}>
          <Card.Title title="Resolution Request" />
          <Card.Content>
            <Controller
              control={control}
              name="desiredResolution"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="What resolution do you seek?"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  placeholder="Correction, deletion, or update of specific fields"
                />
              )}
            />

            <Controller
              control={control}
              name="timelineForCorrection"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Desired Timeline for Correction"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="ASAP, 30 days, specific date, etc."
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Compliance Statement */}
        <Card style={styles.section}>
          <Card.Title title="Compliance Agreement" />
          <Card.Content>
            <Text style={styles.complianceText}>
              I certify that I am the account owner or authorized representative
              and request verification of the accuracy of information reported
              according to METRO 2 standards. I understand that the reporting
              institution has 30-45 days to investigate and respond to this
              verification request under the Fair Credit Reporting Act (FCRA).
            </Text>

            <Checkbox.Item
              label="I agree to this compliance statement *"
              status={watch('agreeToCompliance') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('agreeToCompliance', !watch('agreeToCompliance'))
              }
            />

            {!watch('agreeToCompliance') && (
              <HelperText type="error">
                You must agree to proceed
              </HelperText>
            )}
          </Card.Content>
        </Card>

        {/* Legal Notice */}
        <Card style={styles.section}>
          <Card.Title title="Legal Notice" />
          <Card.Content>
            <Text style={styles.legalText}>
              This METRO 2 Compliance Verification request is provided under the
              Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq. The
              reporting institution must verify the accuracy of information
              within 30-45 business days. False statements may result in civil
              liability.
            </Text>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={onBack}
            style={styles.button}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, styles.primaryButton]}
          >
            Generate PDF
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    margin: 15,
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e1726',
  },
  subtitle: {
    fontSize: 14,
    color: '#5b6473',
    marginTop: 5,
  },
  infoCard: {
    margin: 15,
    backgroundColor: '#e8f4fd',
    borderLeftWidth: 4,
    borderLeftColor: '#0e6efb',
  },
  infoText: {
    fontSize: 14,
    color: '#0e1726',
    lineHeight: 20,
  },
  section: {
    margin: 15,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0e1726',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  quarterInput: {
    width: '23%',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  fieldInputContainer: {
    backgroundColor: '#f7f9fc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#0e6efb',
  },
  disputeList: {
    marginTop: 20,
    backgroundColor: '#eef4ff',
    padding: 15,
    borderRadius: 12,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1945a5',
    marginBottom: 10,
  },
  disputeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0e6efb',
  },
  disputeItemContent: {
    flex: 1,
  },
  disputeItemField: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0e1726',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  disputeItemText: {
    fontSize: 12,
    color: '#5b6473',
    marginBottom: 3,
  },
  complianceText: {
    fontSize: 14,
    color: '#0e1726',
    lineHeight: 20,
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f7f9fc',
    borderRadius: 8,
  },
  legalText: {
    fontSize: 13,
    color: '#0e1726',
    lineHeight: 20,
    backgroundColor: '#fff6e6',
    padding: 12,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '48%',
  },
  primaryButton: {
    backgroundColor: '#0e6efb',
  },
});

export default Metro2Form;
