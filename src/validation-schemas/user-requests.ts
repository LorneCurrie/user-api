import * as R from 'ramda';

export const updateUserProperties = {
  additionalItems: false,
  type: 'object',
  properties: {
    email: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
  },
}

export const createUserProperties = R.merge(updateUserProperties, { require: ['email', 'first_name', 'last_name']});
