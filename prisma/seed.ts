import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password_hash: '123456',
      registration: 'ADM001',
      dateOfBirth: new Date('1990-01-01'),
      cpf: '12345678900',
      email: 'admin@example.com',
      position: 'ADMIN',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
