import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

const prisma = new PrismaClient();

async function main() {
  const users = [
    // Counsellors
    { email: 'counsellor@example.com', password: 'Counsellor123!', role: 'COUNSELLOR', name: 'Dr. Sarah Johnson' },
    { email: 'counsellor2@example.com', password: 'Counsellor123!', role: 'COUNSELLOR', name: 'Dr. Michael Chen' },
    { email: 'counsellor3@example.com', password: 'Counsellor123!', role: 'COUNSELLOR', name: 'Dr. Emily Rodriguez' },
    { email: 'counsellor4@example.com', password: 'Counsellor123!', role: 'COUNSELLOR', name: 'Dr. James Williams' },
    { email: 'counsellor5@example.com', password: 'Counsellor123!', role: 'COUNSELLOR', name: 'Dr. Aisha Patel' },
    
    // Patients
    { email: 'patient@example.com', password: 'Patient123!', role: 'USER', name: 'John Smith' },
    { email: 'patient2@example.com', password: 'Patient123!', role: 'USER', name: 'Emma Davis' },
    { email: 'patient3@example.com', password: 'Patient123!', role: 'USER', name: 'Alex Thompson' },
    { email: 'patient4@example.com', password: 'Patient123!', role: 'USER', name: 'Maria Garcia' },
    { email: 'patient5@example.com', password: 'Patient123!', role: 'USER', name: 'David Lee' },
    
    // Admin credentials can be overridden by environment variables
    { email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com', password: process.env.SEED_ADMIN_PASSWORD || 'Admin123!', role: 'ADMIN', name: 'Admin User' },
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) {
      console.log(`User already exists: ${u.email} (id=${existing.id}, role=${existing.role})`);
      continue;
    }

    const hashed = await hash(u.password, 10);
    const created = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        hashedPassword: hashed,
        role: u.role,
      },
    });

    console.log(`Created user ${u.name || u.email} (${u.email}) id=${created.id} role=${created.role} password=${u.password}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
