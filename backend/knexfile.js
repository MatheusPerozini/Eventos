// Update with your config settings.
//COLOCAR O ./SRC NO FILME NAME QUANDO FAZER UM MIGRATE LATEST
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.sqlite'
    },useNullAsDefault: true,
    migrations : {
      directory : './src/database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
