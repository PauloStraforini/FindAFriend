import request from 'supertest'
import { app } from '../../../app'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../../../lib/prisma'
import { SEX, TYPE } from '@prisma/client'

describe('Update Pet (e2e)', () => {
  let petId: string

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        rga: '123456',
        age: '3',
        sex: SEX.MALE,
        type: TYPE.DOG,
        breed: 'Labrador',
        about: 'Friendly dog',
      },
    })

    petId = pet.id
  })

  it('should be able to update an Pet', async () => {
    const response = await request(app.server).put(`/pets/${petId}`).send({
      name: 'Tallis Gomes',
    })

    expect(response.statusCode).toEqual(200)
  })
})
