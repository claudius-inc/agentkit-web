import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();

    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.execute({
      sql: 'SELECT id FROM waitlist WHERE email = ?',
      args: [email.toLowerCase()],
    });

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "You're already on the list! We'll be in touch soon." },
        { status: 200 }
      );
    }

    // Insert new signup
    await db.execute({
      sql: 'INSERT INTO waitlist (email, source) VALUES (?, ?)',
      args: [email.toLowerCase(), 'web'],
    });

    // Get waitlist position
    const count = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    const position = count.rows[0]?.count || 1;

    return NextResponse.json({
      message: `You're #${position} on the waitlist! 🎉`,
      position,
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.execute('SELECT COUNT(*) as count FROM waitlist');
    const count = result.rows[0]?.count || 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Waitlist count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
