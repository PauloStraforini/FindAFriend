import { Prisma, Tutors } from '@prisma/client'

export interface TutorsRepository {
  create(data: Prisma.TutorsCreateInput): Promise<Tutors>

  findById(id: string): Promise<Tutors | null>
  updateById(id: string, data: Prisma.TutorsUpdateInput): Promise<Tutors>
  findByEmail(email: string): Promise<Tutors | null>
  findByCpf(cpf: string): Promise<Tutors | null>
  findByCnpj(cnpj: string): Promise<Tutors | null>
  findByUniqueCard(uniqueCard: string): Promise<Tutors | null>
  searchMany(query: string, page: number): Promise<Tutors[]>
  deleteById(id: string): Promise<Tutors | null>
}
