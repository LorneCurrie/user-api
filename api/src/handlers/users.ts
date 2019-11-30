import { Users } from '../models/users';
import { Response, Request } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.query();
    return res.status(200).json({ users });
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

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error occurred creating new user' });
  }
}
