import { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'cannabis_jobs.db'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
};

export default config;