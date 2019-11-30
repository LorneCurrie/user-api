import * as express from 'express';
import { Request, Response } from 'express';
import { errorHandler } from '../helpers/error-handler';

export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req: Request, res: Response, next) => res.status(200).json({ message: 'respond with a resource' }))
  .all('/*', errorHandler);

// .get('/{id}', null)
//   .post('/', )
//     .put('/{id}', null)
//   .patch('/{id}', null)
//     .delete('/{id}');
