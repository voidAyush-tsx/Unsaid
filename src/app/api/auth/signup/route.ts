import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });

    // basic validation
    if (password.length < 8) return NextResponse.json({ error: 'Password too short' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    const hashed = await hash(password, 10);
  const user = await prisma.user.create({ data: { email, hashedPassword: hashed, role: 'USER' } });

    return NextResponse.json({ ok: true, id: user.id });
  } catch (err) {
    console.error('signup error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
