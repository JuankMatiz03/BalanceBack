import { Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'La Ruta no fue encontrada'
  });
}
