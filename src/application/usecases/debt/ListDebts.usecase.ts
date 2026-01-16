import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";


export class ListDebts {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(
    userId: string,
    status?: 'PAID' | 'PENDING'
  ) {
    return this.repo.findByUser(userId, status);
  }
}
