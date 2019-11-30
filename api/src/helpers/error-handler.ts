import { Request, Response } from 'express';

export const errorHandler = (req: Request, res: Response): Response => {
  return res.status(400).json({ message: 'Not found' });
};
