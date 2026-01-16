import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";

export class DeleteDebt {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(debtId: string) {
    const debt = await this.repo.findById(debtId);
    if (!debt) throw new Error('Debt not found');

    return this.repo.delete(debtId);
  }
}
