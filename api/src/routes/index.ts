import * as express from 'express';

export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req: express.Request, res: express.Response, next) => res.status(200).json({ title: 'Express' }))
  .all('/*', (req: express.Request, res: express.Response) => res.status(404).json({ message: 'Not Found' }));
