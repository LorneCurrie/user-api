import { Transaction, QueryBuilder } from 'knex';
import knex from './index';

export const getQueryBuilder = (tableName: string) => (trx?: Transaction): QueryBuilder => {
  const queryBuilder = knex(tableName);
  if (trx) {
    queryBuilder.transacting(trx);
  }
  return queryBuilder;
};
