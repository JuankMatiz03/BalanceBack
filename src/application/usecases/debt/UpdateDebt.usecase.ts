import { PrismaDebtRepository } from "@repositoriesInfrastructure/PrismaDebtRepository";

export class UpdateDebt {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(id: string, data: any) {
    const debt = await this.repo.findById(id);

    if (!debt) throw new Error('Deuda no encontrada');
    if (debt.status === 'PAID') {
      throw new Error('No se puede modificar una deuda pagada');
    }

    return this.repo.update(id, data);
  }
}
