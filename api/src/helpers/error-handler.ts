import { Request, Response } from 'express';

export const errorHandler = (req: Request, res: Response): Response => {
  console.log(`${req.url} ${req.path} not found`);
  return res.status(400).json({ message: 'Not found' });
};
