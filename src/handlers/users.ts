import { Users } from '../models/users';
import { transaction } from 'objection';
import { Response, Request } from 'express';
import * as Ajv from 'ajv';
import { createUserProperties, updateUserProperties } from '../validation-schemas/user-requests';
import { isEmpty, isNil } from 'lodash/fp';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = Users.query();
    const [total, users] = await Promise.all([
      query.resultSize(),
      query,
    ]);
    return res.status(200).json({ users, total });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error occurred obtaining users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Users.query().findById(id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error occurred obtaining user' });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const ajv = new Ajv();
    const valid = await ajv.validate(createUserProperties, body);
    if (!valid) {
      console.log('validation failed', { validationErrors: ajv.errors });
      return res.status(400).json({
        message: 'Validation failed',
        validationErrors: ajv.errorsText(),
      });
    }
    const { email, first_name, last_name } = body;

    const user: Users = await transaction(
      Users.knex(), trx => Users.query(trx).insertAndFetch({ email, first_name, last_name }),
    );

    console.log(`created Record`, { user });

    if (!user || !user.id) {
      throw new Error('Error Occurred while trying to insert user');
    }

    res.set('X_USER_ID', `${user.id}`);
    res.status(201).end();

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error occurred creating new user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

    const ajv = new Ajv();
    const valid = ajv.validate(updateUserProperties, body);
    if (!valid) {
      console.log('validation failed', { validationErrors: ajv.errors });
      return res.status(400).json({
        message: 'Validation failed',
        validationErrors: ajv.errorsText(),
      });
    }
    const userUpdate = {
      ...(body.email && { email: body.email }),
      ...(body.first_name && { first_name: body.first_name }),
      ...(body.last_name && { last_name: body.last_name }),
    };
    const updatedUser = await transaction(
      Users.knex(),
      trx => Users.query(trx).updateAndFetchById(id, userUpdate),
    );
    console.log(updatedUser);
    if (isEmpty(updatedUser) || isNil(updatedUser.id)) {
      // No user found for the id, return a 404
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error(`Error updating user:: ${id}`);
    return res.status(400).json({ message: 'Error occurred updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numDeletedRows = await transaction(Users.knex(), trx => Users.query(trx).deleteById(id));
    if (numDeletedRows === 0) {
      return res.status(404).end();
    }
    return res.status(204).end();
  } catch (error) {
    console.error(`Error occurred while deleting user::${id}`, { error });
    return res.status(400).json({ message: 'Error occurred while deleting the user' });
  }
}
