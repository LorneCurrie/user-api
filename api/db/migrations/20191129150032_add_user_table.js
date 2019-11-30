
exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email', 255).notNullable();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.dateTime('created').defaultTo(knex.fn.now());
  });


exports.down = knex => knex.schema.dropTable('users');

