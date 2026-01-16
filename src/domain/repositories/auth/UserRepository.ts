import { IUser } from '@entities/auth/User.interface';

// respositorio de usuario
export interface UserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(data: { email: string; password: string }): Promise<IUser>;
}