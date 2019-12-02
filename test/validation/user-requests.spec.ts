import * as validatorSchemas from '../../src/validation/user-requests';
import * as Ajv from 'ajv';

/**
 *
 * Create User validation
 *
 */

const validNewUserBody = {
  email: 'bob@acme.com',
  first_name: 'Bob',
  last_name: 'Anderson',
};

const invalidNewUserBody = {
  email: 'bob_at_acme_dot_com',
  first_name: 'Bob',
  last_name: 'Anderson',
};

const missingAttrUser = {
  first_name: 'Bob',
  last_name: 'Anderson',
};

const numberFirstNameUser = {
  email: 'bob@acme.com',
  first_name: 606,
  last_name: 'Anderson',
};

const extraAttributePresentUser = {
  email: 'bob@acme.com',
  first_name: '606',
  last_name: 'Anderson',
  foo: 'bar',
};

test('should validate the correct new user input', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.createUserProperties, validNewUserBody);
  expect(valid).toBe(true);
});

test('should fail validation if the email is the incorrect format', async () => {
  const ajv = new Ajv();
  const valid = ajv.validate(validatorSchemas.createUserProperties, invalidNewUserBody);
  expect(valid).toBe(false);
});

test('should validate that a attribute is missing', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.createUserProperties, missingAttrUser);
  console.log(ajv.errors);
  console.log(valid);
  expect(valid).toBe(false);
});

test('should validate that the first_name must be a string', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.createUserProperties, numberFirstNameUser);
  expect(valid).toBe(false);
});

test('should fail validation if a extra attribute is present', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.createUserProperties, extraAttributePresentUser);
  expect(valid).toBe(false);
});

/**
 *
 * Update user validation
 *
 */

const updateFirstName = { first_name: 'John' };
const updateLastName = { last_name: 9999 };
const updateEmail = { email_new: 'john@fakenews.org' };

test('should allow first_name', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.updateUserProperties, updateFirstName);
  expect(valid).toBe(true);
});

test('shoudl fail validation with last_name as number', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.updateUserProperties, updateLastName);
  expect(valid).toBe(false);
});

test('should fail validation with incorrect email tag', async () => {
  const ajv = new Ajv();
  const valid = await ajv.validate(validatorSchemas.updateUserProperties, updateEmail);
  expect(valid).toBe(false);
})
