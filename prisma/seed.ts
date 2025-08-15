import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('123456', 6)

  await prisma.user.create({
    data: {
      username: 'admin',
      password_hash: hashedPassword,
      registration: 'ADM001',
      dateOfBirth: new Date('1990-01-01'),
      cpf: '12345678900',
      email: 'admin@example.com',
      position: 'ADMIN',
    },
  })
}

main()
  .then(() => console.log('✅ User created!'))
  .catch(console.error)
  .finally(() => prisma.$disconnect())
