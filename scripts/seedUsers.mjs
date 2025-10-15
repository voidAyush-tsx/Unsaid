import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'counsellor@example.com', password: 'Counsellor123!', role: 'COUNSELLOR' },
    { email: 'patient@example.com', password: 'Patient123!', role: 'USER' },
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
        hashedPassword: hashed,
        role: u.role,
      },
    });

    console.log(`Created user ${u.email} id=${created.id} role=${created.role} password=${u.password}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
