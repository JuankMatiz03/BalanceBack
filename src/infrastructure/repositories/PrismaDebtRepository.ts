import { prisma } from '@database/prismaClient';
import { IDebt } from '@entities/debt/Debt.interface';
import { DebtStatus } from '../../generated/prisma'; 

export class PrismaDebtRepository {
  
  async create(data: IDebt) {
    return await prisma.debt.create({ 
      data: {
        description: data.description,
        amount: data.amount,
        status: data.status as DebtStatus,
        userId: data.userId 
      } 
    });
  }

  async findByUser(userId: string, status?: DebtStatus) {
    return await prisma.debt.findMany({
      where: { 
        userId, 
        ...(status && { status }) 
      },
      include: {
        user: {
          select: {
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return await prisma.debt.findUnique({ 
      where: { id },
      include: { user: true } 
    });
  }

  async update(id: string, data: Partial<IDebt>) {
    const { userId, ...updateData } = data;

    return await prisma.debt.update({ 
      where: { id }, 
      data: {
        ...updateData,
        status: updateData.status as DebtStatus
      }
    });
  }

  async delete(id: string) {
    return await prisma.debt.delete({ where: { id } });
  }

  async aggregates(userId: string) {
    const result = await prisma.debt.aggregate({
      where: { userId },
      _sum: { amount: true },
      _count: { _all: true }, 
      _avg: { amount: true }  
    });

    return {
      totalAmount: result._sum.amount || 0,
      totalCount: result._count._all,
      averageAmount: result._avg.amount || 0
    };
  }
}