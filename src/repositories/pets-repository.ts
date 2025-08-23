import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findById(id: string): Promise<Pet | null>
  findByMicrochip(microchip: string): Promise<Pet | null>
  findByRga(rga: string): Promise<Pet | null>
  searchMany(query: string, page: number): Promise<Pet[]>
  deleteById(id: string): Promise<Pet | null>
  updateById(id: string, data: Prisma.PetUpdateInput): Promise<Pet>
}
