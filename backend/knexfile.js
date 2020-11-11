require('dotenv').config()
const env = process.env

module.exports = {
  development: {
    client: env.DB_CONNECTION,
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_DATABASE,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      charset: 'utf8',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },
}
