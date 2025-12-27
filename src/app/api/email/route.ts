import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import AdminEmailTemplate from '@/components/email/AdminEmailTemplate';
import UserConfirmationEmail from '@/components/email/UserConfirmationEmail';


if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

if (!process.env.TURNSTILE_SECRET_KEY) {
  throw new Error('TURNSTILE_SECRET_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Validate Turnstile token with Cloudflare (using FormData as recommended)
async function validateTurnstileToken(token: string, remoteip?: string): Promise<boolean> {
  try {
    // Input validation
    if (!token || typeof token !== 'string') {
      return false;
    }

    if (token.length > 2048) {
      return false;
    }

    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
    formData.append('response', token);
    
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error validating Turnstile token:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    
    const { name, email, message, turnstileToken } = body;

    // Validate Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Turnstile verification token is missing' },
        { status: 400 }
      );
    }

    // Get client IP for additional validation (optional but recommended)
    const forwarded = request.headers.get('x-forwarded-for');
    const remoteip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || undefined;

    const isValidToken = await validateTurnstileToken(turnstileToken, remoteip);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Turnstile verification failed. Please try again.' },
        { status: 403 }
      );
    }
    
    // Send admin summary email
    const adminEmail = await resend.emails.send({
      from: 'SomeoneEmailedMPGurus@mealplangurus.com',
      to: 'goldmanwilliam3@gmail.com', // add an env here at some point?
      subject: 'New Contact Form Submission',
      react: AdminEmailTemplate({ name, email, message }),
    });

    // Send user confirmation email
    const userEmail = await resend.emails.send({
      from: 'MealPlanGuru@mealplangurus.com',
      to: email,
      subject: 'Thank You for Contacting Us',
      react: UserConfirmationEmail({ name, email, message }),
    });

    return NextResponse.json({ 
      success: true, 
      data: { 
        adminEmail, 
        userEmail 
      } 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}