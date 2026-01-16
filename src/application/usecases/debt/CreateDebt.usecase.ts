import { IDebt } from "@entities/debt/Debt.interface";
import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";

export class CreateDebt {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(userId: string, data: IDebt) {
    if (data.amount <= 0) {
      throw new Error('El valor de la deuda debe ser positivo');
    }

    return this.repo.create({
      ...data,
      userId
    });
  }
}
