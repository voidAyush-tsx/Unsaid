import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { users } = body;

    if (!Array.isArray(users)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    let createdCount = 0;
    const defaultPassword = 'UnsaidUser123!'; // Default password for bulk uploaded users
    const hashedPassword = await hash(defaultPassword, 10);

    for (const user of users) {
      if (!user.email || !user.name) {
        continue; // Skip invalid entries
      }

      // Normalize role
      let role: Role = 'USER';
      if (user.role) {
        const upperRole = user.role.toUpperCase();
        if (upperRole === 'COUNSELLOR' || upperRole === 'ADMIN' || upperRole === 'USER') {
          role = upperRole as Role;
        }
      }

      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              hashedPassword: hashedPassword,
              role: role,
              mustChangePassword: true,
            },
          });
          createdCount++;
        }
      } catch (error) {
        console.error(`Failed to create user ${user.email}:`, error);
        // Continue with next user even if one fails
      }
    }

    return NextResponse.json({ 
      message: 'Users processed successfully', 
      count: createdCount 
    });

  } catch (error) {
    console.error('Error processing user upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
