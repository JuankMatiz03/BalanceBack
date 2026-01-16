import bcrypt from 'bcryptjs';
import { UserRepository } from '@repositories/auth/UserRepository';

export class RegisterUserUseCase {
  constructor(private repo: UserRepository) {}

  async execute(email: string, password: string) {
    const exists = await this.repo.findByEmail(email);
    if (exists) {
      throw new Error('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return this.repo.create({
      email,
      password: hashedPassword,
    });
  }
}
