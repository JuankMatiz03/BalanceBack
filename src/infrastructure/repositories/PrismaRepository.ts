import { prisma } from '../database/prismaClient';
import { UserRepository } from '../../domain/repositories/auth/UserRepository';
import { IUser } from '@entities/auth/User.interface';

export class PrismaRepository implements UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: IUser): Promise<IUser> {
    return await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }
}