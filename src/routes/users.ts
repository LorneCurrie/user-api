import * as express from 'express';
import { errorHandler } from '../helpers/error-handler';
import * as UserHandlers from '../handlers/users';

export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', UserHandlers.getAllUsers)
  .get('/:id', UserHandlers.getUserById)
  .post('/', UserHandlers.createNewUser)
  .put('/:id', UserHandlers.updateUser)
  .delete('/:id', UserHandlers.deleteUser)
  .all('/*', errorHandler);
