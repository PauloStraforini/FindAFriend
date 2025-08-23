import request from 'supertest'
import { app } from '../../../app'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { prisma } from '../../../lib/prisma'

describe('Delete Pet (E2E)', () => {
  let petId: string

  beforeAll(async () => {
    await app.ready()

    // Cria um pet direto no banco
    const pet = await prisma.pet.create({
      data: {
        name: 'Fido',
        rga: 'RGA123456789',
        dateOfBirth: new Date('2018-06-15'),
        sex: 'MALE',
        type: 'DOG',
        breed: 'Labrador',
        about: 'Amigável',
      },
    })

    petId = pet.id
  })

  afterAll(async () => {
    await prisma.pet.deleteMany()
    await app.close()
  })

  it('should delete a pet successfully', async () => {
    const response = await request(app.server).delete(`/pets/${petId}`).send()

    expect(response.status).toBe(204)

    const petOnDb = await prisma.pet.findUnique({ where: { id: petId } })
    expect(petOnDb).toBeNull()
  })
})
