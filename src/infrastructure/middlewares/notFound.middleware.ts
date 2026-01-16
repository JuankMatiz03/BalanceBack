import { Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({
    route: req.url,
    success: false,
    message: 'La Ruta no fue encontrada'
  });
}
