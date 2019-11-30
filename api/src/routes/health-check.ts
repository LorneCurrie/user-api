import { Request, Response, Router } from 'express';
import { errorHandler } from '../helpers/error-handler';

export const healthCheckRoutes = (router: Router) => {
  router
    .get('/health-check', (req: Request, res: Response) => {
      return res.status(200).json({ message: 'Ok' });
    })
    .all('/health-check/*', errorHandler);
};
