import * as React from 'react';
import { Html, Body, Container, Text, Heading } from '@react-email/components';

interface AdminEmailTemplateProps {
  name?: string;
  email?: string;
  message?: string;
}

export default function AdminEmailTemplate({ name, email, message }: AdminEmailTemplateProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#f6f6f6', padding: '20px' }}>
        <Container style={{ 
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <Heading as="h2" style={{ color: '#333333' }}>New Contact Form Submission</Heading>
          
          <Text style={{ fontSize: '16px', color: '#666666', marginBottom: '20px' }}>
            You have received a new contact form submission with the following details:
          </Text>
          
          <div style={{ 
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <Text style={{ margin: '10px 0' }}><strong>Name:</strong> {name}</Text>
            <Text style={{ margin: '10px 0' }}><strong>Email:</strong> {email}</Text>
            <Text style={{ margin: '10px 0' }}><strong>Message:</strong> {message}</Text>
          </div>
          
          <Text style={{ fontSize: '14px', color: '#999999' }}>
            This is an automated message from your contact form system.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}