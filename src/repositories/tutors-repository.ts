import { Prisma, Tutors } from '@prisma/client'

export interface TutorsRepository {
  findByEmailCpfCnpjOruniqueCard(
    cnpj: string,
    cpf: string,
    email: string,
    uniqueCard: string,
  ): unknown
  create(data: Prisma.TutorsCreateInput): Promise<Tutors>
}
