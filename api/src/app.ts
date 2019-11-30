import createError from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import { indexRouter } from './routes';
import { usersRouter } from './routes/users';
import { healthCheckRouter } from './routes/health-check';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan(':method :status :res[content-length] - :response-time ms'));
app.disable('x-powered-by');

app.use('/api/v1/users', usersRouter);
app.use('/health-check', healthCheckRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message, });
});

module.exports = app;
