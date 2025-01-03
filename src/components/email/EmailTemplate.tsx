import * as React from 'react';
import { Html, Body, Container, Text, Button } from '@react-email/components';

interface EmailTemplateProps {
  name?: string;
  email?: string;
  message?: string;
}

export default function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <Html>
      <Body>
        <Container>
          <Text>New contact form submission</Text>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Message: {message}</Text>
        </Container>
      </Body>
    </Html>
  );
}