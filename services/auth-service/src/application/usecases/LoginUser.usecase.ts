import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@repositories/UserRepository';

export class LoginUserUseCase {
  constructor(private repo: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Usuario y/o Contraseña incorrectos');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Usuario y/o Contraseña incorrectos');

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    return { token };
  }
}
