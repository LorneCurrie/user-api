import knex from '../db';
import { Model } from 'objection';
import db from '../db';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  created: Date;
}

Model.knex(db);

export class Users extends Model {

  public readonly id!: number;
  public first_name?: string;
  public last_name?: string;
  public email?: string;
  public created: Date;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  public $beforeInsert() {
    this.created = new Date();
  }
}
