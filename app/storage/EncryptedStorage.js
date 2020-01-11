// @flow

import knex from 'knex';
import { promises as fs } from 'fs';

const dbConfig = (secret: string, path: string) => ({
  client: 'sqlite3',
  connection: {
    filename: path
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA cipher_compatibility = 3;');
      conn.run(`PRAGMA key = '${secret}';`);
      done();
    }
  },
  debug: true
});

// class CannotOpenFileError extends Error {
//   constructor(message: string, code: string) {
//     super(message);
//     this.name = 'CannotOpenFileError';
//     this.code = code;
//   }
// }

class EncryptedStorage {
  static create(secret: string, path: string) {
    const db = knex(dbConfig(secret, path));
    return db.schema.createTable('login_items', table => {
      table.increments('id');
      table.string('name');
      table.string('login');
      table.string('password');
      table.string('url');
      table.integer('created_at');
      table.integer('updated_at');
    });
  }

  static tryKey(secret: string, path: string) {
    return fs.access(path).then(() => {
      const db = knex(dbConfig(secret, path));
      return db('login_items')
        .first('id')
        .return(true);
    });
  }

  db: knex;

  constructor(secret: string, path: ?string) {
    this.db = knex(dbConfig(secret, path || 'storage.pass'));
  }

  rekey = (newSecret: string) => {
    this.db.raw(`PRAGMA rekey = '${newSecret};'`);
  };
}

export default EncryptedStorage;
