import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";
import { DebtStatus } from "@shared/enums/debt.enum";

export class MarkDebtPaid {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(id: string) {
    const debt = await this.repo.findById(id);

    if (!debt) throw new Error('Deuda no encontrada');
    if (debt.status === 'PAID') throw new Error('La deuda ya está pagada');

    return this.repo.update(id, { status: DebtStatus.PAID });
  }
}
