import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get assignment info for current user or all assignments (admin only)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // Admin can view all assignments
    if (session.user.role === 'ADMIN') {
      const assignments = await prisma.assignment.findMany({
        where: userId ? { OR: [{ patientId: userId }, { counsellorId: userId }] } : {},
        include: {
          patient: { select: { id: true, email: true, name: true, role: true, lastActive: true } },
          counsellor: { select: { id: true, email: true, name: true, role: true, lastActive: true } },
        },
        orderBy: { assignedAt: 'desc' },
      });
      return NextResponse.json({ assignments });
    }

    // Regular users can only view their own assignments
    const currentUserId = session.user.id;
    
    if (session.user.role === 'COUNSELLOR') {
      // Counsellor: get all patients assigned to them
      const assignments = await prisma.assignment.findMany({
        where: { counsellorId: currentUserId, isActive: true },
        include: {
          patient: { select: { id: true, email: true, name: true, role: true, lastActive: true } },
        },
        orderBy: { assignedAt: 'desc' },
      });
      return NextResponse.json({ assignments, role: 'COUNSELLOR' });
    }

    if (session.user.role === 'USER') {
      // Patient: get their assigned counsellor
      const assignment = await prisma.assignment.findFirst({
        where: { patientId: currentUserId, isActive: true },
        include: {
          counsellor: { select: { id: true, email: true, name: true, role: true, lastActive: true } },
        },
      });
      return NextResponse.json({ assignment, role: 'USER' });
    }

    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  } catch (error) {
    console.error('GET /api/assignments error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - Assign a random counsellor to a patient or create specific assignment
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { patientId, counsellorId } = body;

    // If admin provides both IDs, create that specific assignment
    if (session.user.role === 'ADMIN' && patientId && counsellorId) {
      const existing = await prisma.assignment.findFirst({
        where: { patientId, isActive: true },
      });

      if (existing) {
        return NextResponse.json({ error: 'Patient already has an active assignment' }, { status: 400 });
      }

      const assignment = await prisma.assignment.create({
        data: { patientId, counsellorId },
        include: {
          patient: { select: { id: true, email: true, name: true, role: true } },
          counsellor: { select: { id: true, email: true, name: true, role: true } },
        },
      });

      return NextResponse.json({ assignment, message: 'Assignment created' });
    }

    // Regular user (patient) requests a random counsellor assignment
    const currentUserId = session.user.id;
    
    // Check if patient already has an active assignment
    const existing = await prisma.assignment.findFirst({
      where: { patientId: currentUserId, isActive: true },
      include: { counsellor: true },
    });

    if (existing) {
      return NextResponse.json({ 
        assignment: existing, 
        message: 'You already have an assigned counsellor' 
      });
    }

    // Get all counsellors
    const counsellors = await prisma.user.findMany({
      where: { role: 'COUNSELLOR' },
    });

    if (counsellors.length === 0) {
      return NextResponse.json({ error: 'No counsellors available' }, { status: 404 });
    }

    // Randomly select a counsellor
    const randomCounsellor = counsellors[Math.floor(Math.random() * counsellors.length)];

    // Create assignment
    const assignment = await prisma.assignment.create({
      data: {
        patientId: currentUserId,
        counsellorId: randomCounsellor.id,
      },
      include: {
        patient: { select: { id: true, email: true, name: true, role: true } },
        counsellor: { select: { id: true, email: true, name: true, role: true } },
      },
    });

    return NextResponse.json({ 
      assignment, 
      message: `Assigned to ${randomCounsellor.name || randomCounsellor.email}` 
    });
  } catch (error) {
    console.error('POST /api/assignments error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE - Remove an assignment (admin only)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { assignmentId } = body;

    if (!assignmentId) {
      return NextResponse.json({ error: 'Assignment ID required' }, { status: 400 });
    }

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Assignment deactivated' });
  } catch (error) {
    console.error('DELETE /api/assignments error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
