import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import AdminEmailTemplate from '@/components/email/AdminEmailTemplate';
import UserConfirmationEmail from '@/components/email/UserConfirmationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    
    const { name, email, message } = body;
    
    // Send admin summary email
    const adminEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'goldmanwilliam3@gmail.com',
      subject: 'New Contact Form Submission',
      react: AdminEmailTemplate({ name, email, message }),
    });

    // Send user confirmation email
    const userEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
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