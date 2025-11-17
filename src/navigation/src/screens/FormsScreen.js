import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import EquifaxForm from '../forms/EquifaxForm';
import ExperianForm from '../forms/ExperianForm';
import TransUnionForm from '../forms/TransUnionForm';
import EdgeStandoutForm from '../forms/EdgeStandoutForm';
import Metro2Form from '../forms/Metro2Form';

const FormsScreen = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const forms = [
    {
      id: 'equifax',
      title: 'Equifax Housing Dispute',
      description: 'Dispute rental & eviction errors with Equifax',
      color: '#FF6B6B',
      component: EquifaxForm,
    },
    {
      id: 'experian',
      title: 'Experian Tenant Screening Dispute',
      description: 'Challenge screening report inaccuracies',
      color: '#4ECDC4',
      component: ExperianForm,
    },
    {
      id: 'transunion',
      title: 'TransUnion Rental History Dispute',
      description: 'Correct rental history with TransUnion',
      color: '#45B7D1',
      component: TransUnionForm,
    },
    {
      id: 'metro2',
      title: 'METRO 2 Compliance',
      description: 'Verify accuracy of credit data reporting',
      color: '#9B59B6',
      component: Metro2Form,
    },
    {
      id: 'edge',
      title: 'Tenant Advantage Profile',
      description: 'Stand out in screening software',
      color: '#0e6efb',
      component: EdgeStandoutForm,
    },
  ];

  const generatePDF = async (formData, formType) => {
    const html = generateFormHTML(formData, formType);
    
    try {
      const { uri } = await Print.printToFileAsync({ html });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Success', 'PDF saved to device');
      }
      
      return uri;
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };

  const generateFormHTML = (data, type) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              line-height: 1.6;
              color: #333;
            }
            h1 { 
              color: #0e6efb; 
              border-bottom: 3px solid #0e6efb;
              padding-bottom: 10px;
            }
            h2 {
              color: #1945a5;
              margin-top: 20px;
            }
            .section { 
              margin-bottom: 20px; 
              page-break-inside: avoid;
            }
            .field { 
              margin: 10px 0; 
              padding: 8px;
              background: #f7f9fc;
              border-radius: 4px;
            }
            .label { 
              font-weight: bold; 
              color: #0e1726;
            }
            .value {
              margin-left: 10px;
              color: #5b6473;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #eef4ff;
              font-weight: bold;
            }
            .legal {
              background: #fff6e6;
              border: 1px solid #ffd9a8;
              padding: 15px;
              border-radius: 4px;
              margin-top: 20px;
              font-size: 12px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h1>${type}</h1>
          <div class="section">
            <h2>Generated: ${new Date().toLocaleDateString()}</h2>
          </div>
          ${generateFormSpecificContent(data, type)}
          <div class="legal">
            <strong>Legal Notice:</strong> This document is provided for informational purposes. Ensure all information is accurate before submission to credit bureaus or other institutions.
          </div>
          <div class="footer">
            <p>POWER PLAY Resource Center | Albuquerque, New Mexico | (505) 595-7861</p>
            <p>© 2025 All rights reserved</p>
          </div>
        </body>
      </html>
    `;
  };

  const generateFormSpecificContent = (data, type) => {
    switch(type) {
      case 'equifax':
        return `
          <div class="section">
            <h2>Personal Information</h2>
            <div class="field"><span class="label">Name:</span> <span class="value">${data.firstName} ${data.lastName}</span></div>
            <div class="field"><span class="label">Address:</span> <span class="value">${data.currentAddress}, ${data.city}, ${data.state} ${data.zip}</span></div>
            <div class="field"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
          </div>
          <div class="section">
            <h2>Dispute Details</h2>
            <div class="field"><span class="label">Dispute Type:</span> <span class="value">${data.disputeType}</span></div>
            <div class="field"><span class="label">Reason:</span> <span class="value">${data.disputeReason}</span></div>
            <div class="field"><span class="label">Explanation:</span> <span class="value">${data.disputeExplanation}</span></div>
          </div>
        `;
      case 'metro2':
        return `
          <div class="section">
            <h2>Reporting Institution Information</h2>
            <div class="field"><span class="label">Institution Name:</span> <span class="value">${data.institutionName}</span></div>
            <div class="field"><span class="label">METRO 2 Code:</span> <span class="value">${data.metro2Code}</span></div>
            <div class="field"><span class="label">Report Frequency:</span> <span class="value">${data.reportFrequency}</span></div>
          </div>
          <div class="section">
            <h2>Compliance Verification Request</h2>
            <div class="field"><span class="label">Account Status:</span> <span class="value">${data.accountStatus}</span></div>
            <div class="field"><span class="label">Account Number:</span> <span class="value">${data.accountNumber}</span></div>
            <div class="field"><span class="label">Data Accuracy Concern:</span> <span class="value">${data.accuracyConcern}</span></div>
          </div>
          <div class="section">
            <h2>Fields Under Dispute</h2>
            <table>
              <tr>
                <th>Field Name</th>
                <th>Reported Value</th>
                <th>Correct Value</th>
                <th>Issue</th>
              </tr>
              ${data.disputedFields && data.disputedFields.map((field, idx) => `
                <tr>
                  <td>${field.fieldName}</td>
                  <td>${field.reportedValue}</td>
                  <td>${field.correctValue}</td>
                  <td>${field.issue}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `;
      default:
        return '';
    }
  };

  if (selectedForm) {
    const FormComponent = selectedForm.component;
    return (
      <FormComponent
        onBack={() => setSelectedForm(null)}
        onGenerate={generatePDF}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Generator</Text>
        <Text style={styles.subtitle}>
          Create and download your dispute forms
        </Text>
      </View>

      {forms.map((form) => (
        <Card
          key={form.id}
          style={[styles.card, { borderLeftColor: form.color }]}
          onPress={() => setSelectedForm(form)}
        >
          <Card.Content>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{form.title}</Text>
                <Text style={styles.cardDescription}>
                  {form.description}
                </Text>
              </View>
              <Button
                mode="contained"
                style={[styles.button, { backgroundColor: form.color }]}
                onPress={() => setSelectedForm(form)}
              >
                Create
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}

      <View style={styles.info}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          1. Select the form you need{'\n'}
          2. Fill in your information{'\n'}
          3. Review and edit as needed{'\n'}
          4. Generate and download PDF{'\n'}
          5. Print or email to credit bureaus
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0e1726',
  },
  subtitle: {
    fontSize: 16,
    color: '#5b6473',
    marginTop: 5,
  },
  card: {
    margin: 15,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0e1726',
  },
  cardDescription: {
    fontSize: 14,
    color: '#5b6473',
    marginTop: 5,
  },
  button: {
    marginLeft: 10,
  },
  info: {
    margin: 20,
    padding: 20,
    backgroundColor: '#eef4ff',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1945a5',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1945a5',
    lineHeight: 22,
  },
});

export default FormsScreen;
