import { IUser } from '@entities/auth/User.interface';

export interface UserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(data: { email: string; password: string }): Promise<IUser>;
}