import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/components/email/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    
    const { name, email, message } = body;
    
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'goldmanwilliam3@gmail.com',
      subject: 'New Contact Form Submission',
      react: EmailTemplate({ name, email, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}