// src/http/controllers/pets/create-pet.e2e-spec.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const response = await request(app.server).post('/pets').send({
      rga: 'RGA-TEST-12345',
      name: 'Fido',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Golden Retriever',
      about: 'A very friendly and playful dog.',

      castrated: true,
      weight: 29.5,
      primaryColor: 'Golden',
    })

    // Assert
    expect(response.statusCode).toEqual(201)
  })
})
