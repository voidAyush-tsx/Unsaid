import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST - Update user's lastActive timestamp (heartbeat)
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    await prisma.user.update({
      where: { id: userId },
      data: { lastActive: new Date() },
    });

    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('POST /api/activity error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET - Get active users (online within last 5 minutes) - Admin only
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeUsers = await prisma.user.findMany({
      where: {
        lastActive: {
          gte: fiveMinutesAgo,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        lastActive: true,
      },
      orderBy: { lastActive: 'desc' },
    });

    return NextResponse.json({ activeUsers, threshold: fiveMinutesAgo.toISOString() });
  } catch (error) {
    console.error('GET /api/activity error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
