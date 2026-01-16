import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";
import { DebtStatus } from "@shared/enums/debt.enum";

export class DebtAggregates {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(userId: string) {
    const paid = await this.repo.findByUser(userId, DebtStatus.PAID);
    const pending = await this.repo.findByUser(userId, DebtStatus.PENDING);

    return {
      totalPaid: paid.reduce((a: any, d: { amount: any; }) => a + d.amount, 0),
      pendingBalance: pending.reduce((a: any, d: { amount: any; }) => a + d.amount, 0)
    };
  }
}
