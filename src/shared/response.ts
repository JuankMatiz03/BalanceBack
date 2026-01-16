import { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'OK'
) => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};
