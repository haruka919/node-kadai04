'use strict';

exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
        return knex.schema.createTable('users', function(table) {
          table.increments('id').primary().notNullable();
          table.string('name', 100).notNullable();
          table.string('email', 100).unique().notNullable();
          table.string('password').notNullable();
          table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
          table.timestamp('updated_at').nullable();
        });
    }else{
      return new Error("The table already exists");
    }
});
};

exports.down = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('users');
    }
});
};
