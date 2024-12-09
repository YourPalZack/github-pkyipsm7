import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Companies table
  await knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('logo').notNullable();
    table.text('description').notNullable();
    table.string('location').notNullable();
    table.string('state', 2).notNullable();
    table.string('type').notNullable();
    table.string('founded').notNullable();
    table.string('employees').notNullable();
    table.string('website').notNullable();
    table.timestamps(true, true);
  });

  // Company licenses table
  await knex.schema.createTable('company_licenses', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.string('license').notNullable();
    table.unique(['company_id', 'license']);
    table.timestamps(true, true);
  });

  // Company specialties table
  await knex.schema.createTable('company_specialties', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.string('specialty').notNullable();
    table.unique(['company_id', 'specialty']);
    table.timestamps(true, true);
  });

  // Jobs table
  await knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('location').notNullable();
    table.string('state', 2).notNullable();
    table.string('type').notNullable();
    table.string('category').notNullable();
    table.string('salary');
    table.integer('likes').defaultTo(0);
    table.timestamp('posted_at').notNullable();
    table.string('external_id').unique();
    table.timestamps(true, true);
  });

  // Job requirements table
  await knex.schema.createTable('job_requirements', (table) => {
    table.increments('id').primary();
    table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('CASCADE');
    table.text('requirement').notNullable();
    table.integer('order').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('job_requirements');
  await knex.schema.dropTableIfExists('jobs');
  await knex.schema.dropTableIfExists('company_specialties');
  await knex.schema.dropTableIfExists('company_licenses');
  await knex.schema.dropTableIfExists('companies');
}