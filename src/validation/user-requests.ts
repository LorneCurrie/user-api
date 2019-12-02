import * as R from 'ramda';

export const updateUserProperties = {
  additionalProperties: false,
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
  },
};

export const createUserProperties = R.merge(updateUserProperties, { required: [ 'email', 'first_name', 'last_name' ] });
