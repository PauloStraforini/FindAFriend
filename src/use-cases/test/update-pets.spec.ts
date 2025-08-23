/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UpdatePetsUseCase } from './update-pets'
import { PetsRepository } from '../../repositories/pets-repository'
import { SEX, TYPE } from '@prisma/client'

let petsRepository: PetsRepository
let sut: UpdatePetsUseCase

describe('UpdatePetsUseCase', () => {
  beforeEach(() => {
    petsRepository = {
      findById: vi.fn(),
      updateById: vi.fn(),
    } as unknown as PetsRepository

    sut = new UpdatePetsUseCase(petsRepository)
  })

  it('should update a pet if it exists', async () => {
    const fakePetId = 'pet-123'
    const updateData = {
      name: 'Rex',
      rga: '123456',
      age: '3',
      sex: SEX.MALE,
      type: TYPE.DOG,
      breed: 'Labrador',
      about: 'Friendly dog',
      nameEmergencyContact: 'Maria',
      phoneNumberEmergency: '11999999999',
      cep: '12345-678',
      street: 'Rua Teste',
      numberHouse: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
    }

    ;(petsRepository.findById as any).mockResolvedValue({ id: fakePetId })
    ;(petsRepository.updateById as any).mockResolvedValue({
      ...updateData,
      id: fakePetId,
    })

    const result = await sut.execute(fakePetId, updateData)

    expect(petsRepository.findById).toHaveBeenCalledWith(fakePetId)
    expect(petsRepository.updateById).toHaveBeenCalledWith(
      fakePetId,
      updateData,
    )
    expect(result).toEqual({ success: true })
  })

  it('should throw an error if pet does not exist', async () => {
    const fakePetId = 'pet-456'

    ;(petsRepository.findById as any).mockResolvedValue(null)

    await expect(
      sut.execute(fakePetId, {
        name: 'Rex',
        rga: '123456',
        age: '3',
        sex: SEX.MALE,
        type: TYPE.DOG,
        breed: 'Labrador',
        about: 'Friendly dog',
        nameEmergencyContact: 'Maria',
        phoneNumberEmergency: '11999999999',
        cep: '12345-678',
        street: 'Rua Teste',
        numberHouse: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
      }),
    ).rejects.toThrowError('Event not found')
  })
})
