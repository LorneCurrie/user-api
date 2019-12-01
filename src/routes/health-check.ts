import * as express from 'express';
import { errorHandler } from '../helpers/error-handler';
import {healthCheck} from '../handlers/health-check';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/', healthCheck)
  .all('/*', errorHandler);
