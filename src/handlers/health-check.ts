import db from '../db';
import { Request, Response } from 'express';
import * as R from 'ramda';

export const healthCheck = async (req: Request, res: Response) => {
  try {

    const [result] = await db.raw('SELECT 1 as test;');

    if (result && result[0] && result[0].test === 1) {
      return res.status(200).json({ computer: 'OK' });
    }

    return res.status(500).end();

  } catch (error) {
    console.error('Issue with API.  DB test failed');
    return res.status(500).end();
  }
}
