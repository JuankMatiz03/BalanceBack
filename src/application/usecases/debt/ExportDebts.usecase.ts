import { PrismaDebtRepository } from '@repositoriesInfrastructure/PrismaDebtRepository';
import { json2csv } from 'json-2-csv';

export class ExportDebts {
  constructor(private repo: PrismaDebtRepository) {}

  async execute(userId: string, format: 'json' | 'csv') {
    const debts = await this.repo.findByUser(userId);

    if (format === 'csv') {
      return json2csv(debts);
    }

    return debts;
  }
}
