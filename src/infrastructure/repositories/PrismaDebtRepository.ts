import { prisma } from '@database/prismaClient';
import { IDebt } from '@entities/debt/Debt.interface';
import { DebtStatus } from '@shared/enums/debt.enum';

export class PrismaDebtRepository {
  create(data: IDebt) {
    return prisma.debt.create({ data });
  }

  findByUser(userId: string, status?: DebtStatus) {
    return prisma.debt.findMany({
      where: { userId, ...(status && { status }) }
    });
  }

  findById(id: string) {
    return prisma.debt.findUnique({ where: { id } });
  }

  update(id: string, data: IDebt) {
    return prisma.debt.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.debt.delete({ where: { id } });
  }

  aggregates(userId: string) {
    return prisma.debt.aggregate({
      where: { userId },
      _sum: { amount: true },
      _count: true
    });
  }
}
