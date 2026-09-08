import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const { name, email, reason, message, additionalMessage } = body;
    
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    
    const validReasons = [
      "I have a project in mind",
      "I'd like to work together",
      "I just wanted to say hi",
      "Something else"
    ];
    if (!reason || !validReasons.includes(reason)) {
      return NextResponse.json({ error: 'Invalid reason selected.' }, { status: 400 });
    }
    
    if (!message || message.trim().length < 5 || message.length > 2000) {
      return NextResponse.json({ error: 'Message must be between 5 and 2000 characters.' }, { status: 400 });
    }
    
    if (additionalMessage && additionalMessage.length > 2000) {
      return NextResponse.json({ error: 'Additional message is too long.' }, { status: 400 });
    }

    // Dispatch email
    await sendContactEmail({
      name,
      email,
      reason,
      message,
      additionalMessage,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while sending email.' }, 
      { status: 500 }
    );
  }
}
