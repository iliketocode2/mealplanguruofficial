import * as React from 'react';
import { Html, Body, Container, Text, Heading, Img, Section, Button } from '@react-email/components';

interface UserConfirmationEmailProps {
  name?: string;
  email?: string;
  message?: string;
}

export default function UserConfirmationEmail({ name, email, message }: UserConfirmationEmailProps) {

  return (
    <Html>
      <Body style={{ backgroundColor: '#f6f6f6', padding: '20px' }}>
        <Container style={{ 
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px'
        }}>
          {/* Logo */}
          <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Img
              src={`https://www.mealplangurus.com/logo.png`}
              width="150"
              height="50"
              alt="Logo"
              style={{ margin: '0 auto' }}
            />
          </Section>

          {/* Rest of the email content remains the same */}
          <Heading as="h1" style={{ 
            color: '#333333',
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px'
          }}>
            Thank You for Contacting Us!
          </Heading>

          <Text style={{ 
            fontSize: '16px',
            color: '#666666',
            lineHeight: '24px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Hi {name}, we have received your message and will get back to you as soon as possible.
          </Text>

          <Section style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <Heading as="h2" style={{
              fontSize: '18px',
              color: '#333333',
              marginBottom: '15px'
            }}>
              Your Message Details:
            </Heading>

            <div style={{ marginBottom: '15px' }}>
              <Text style={{ 
                margin: '10px 0',
                color: '#666666'
              }}>
                <strong>Name:</strong> {name}
              </Text>
              <Text style={{ 
                margin: '10px 0',
                color: '#666666'
              }}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={{ 
                margin: '10px 0',
                color: '#666666'
              }}>
                <strong>Message:</strong> {message}
              </Text>
            </div>
          </Section>

          <Section style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button
              href={`https://www.mealplangurus.com`}
              style={{
                backgroundColor: '#4F46E5',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Visit Our Website
            </Button>
          </Section>

          <Text style={{ 
            fontSize: '14px',
            color: '#999999',
            textAlign: 'center',
            marginTop: '30px'
          }}>
            {"If you didn't submit this contact form, please ignore this email."}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}