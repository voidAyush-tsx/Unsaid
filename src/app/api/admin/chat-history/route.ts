import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');

  try {
    if (room) {
      // Fetch messages for a specific room
      const messages = await prisma.chatMessage.findMany({
        where: { room },
        orderBy: { timestamp: 'asc' },
      });
      return NextResponse.json({ messages });
    } else {
      // Fetch all unique rooms with their last message
      const rooms = await prisma.chatMessage.groupBy({
        by: ['room'],
        _max: {
          timestamp: true,
        },
      });

      // Enhance room data with user names for private chats
      const enhancedRooms = await Promise.all(rooms.map(async (r) => {
        if (r.room.startsWith('private-chat-')) {
          const parts = r.room.split('-');
          const counsellorId = parts[2];
          const patientId = parts[3];

          const [counsellor, patient] = await Promise.all([
            prisma.user.findUnique({ where: { id: counsellorId }, select: { name: true, email: true } }),
            prisma.user.findUnique({ where: { id: patientId }, select: { name: true, email: true } })
          ]);

          return {
            ...r,
            counsellorName: counsellor?.name || counsellor?.email || 'Unknown Counsellor',
            patientName: patient?.name || patient?.email || 'Unknown Patient'
          };
        }
        return r;
      }));

      return NextResponse.json({ rooms: enhancedRooms });
    }
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
