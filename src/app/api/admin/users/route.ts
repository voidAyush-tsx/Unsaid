import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = (await getServerSession(authOptions)) as Session | null;
  // session.user may contain role added in callbacks; access safely
  const role = session && 'user' in session && (session.user as Record<string, unknown>)?.role;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const { email, password, name, role } = body || {};
    if (!email || !password) return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });

    if (role && !['ADMIN', 'COUNSELLOR', 'USER'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    // Hash password
    const { hash } = await import('bcryptjs');
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: name || null,
        role: role || 'USER'
      }
    });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    console.error('admin create user error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
  const body = await req.json();
    const { id, role, email, name } = body || {};
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const updateData: { role?: 'ADMIN' | 'COUNSELLOR' | 'USER'; email?: string; name?: string | null } = {};
    if (role !== undefined) {
      if (!['ADMIN', 'COUNSELLOR', 'USER'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      updateData.role = role as 'ADMIN' | 'COUNSELLOR' | 'USER';
    }
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;

    const user = await prisma.user.update({ where: { id }, data: updateData });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error('admin update user error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
  const body = await req.json();
    const { id } = body || {};
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin delete user error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
