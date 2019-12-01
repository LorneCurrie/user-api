import * as Knex from 'knex';

const devMode = process.env.NODE_ENV === 'development' || false;

export default Knex({
  client: 'mysql',
  debug: devMode,
  pool: { min: 1, max: 10, idleTimeoutMillis: 500 },
  connection: {
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
  },
});
