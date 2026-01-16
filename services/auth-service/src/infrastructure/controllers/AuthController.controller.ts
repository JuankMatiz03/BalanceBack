import { Request, Response } from 'express';
import { PrismaRepository } from '@repositoriesInfrastructure/PrismaRepository';
import { RegisterUserUseCase } from '@application/RegisterUser.usecase';
import { LoginUserUseCase } from '@application/LoginUser.usecase';

const repo = new PrismaRepository();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const useCase = new RegisterUserUseCase(repo);
    const user = await useCase.execute(email, password);

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const useCase = new LoginUserUseCase(repo);
    const result = await useCase.execute(email, password);

    res.json(result);
  }
}
