// @flow
import { promises as fs } from 'fs';
import KnexAdapter from '../db';

class EncryptedStorage {
  static create(secret: string, path: string) {
    KnexAdapter.resetConnection();
    const connection = KnexAdapter.connection({ secret, path });

    return connection.schema
      .createTable('login_items', table => {
        table.increments('id');
        table.string('name');
        table.string('login');
        table.string('password');
        table.string('url');
        table.integer('created_at');
        table.integer('updated_at');
      })
      .then(() => {
        return new EncryptedStorage(secret, path);
      });
  }

  static tryKey(secret: string, path: string) {
    return fs.access(path).then(() => {
      KnexAdapter.resetConnection();
      const connection = KnexAdapter.connection({ secret, path });

      return connection('login_items')
        .first('id')
        .return(true);
    });
  }

  db: *;

  constructor(secret: string, path: ?string) {
    this.db = KnexAdapter.connection({ secret, path: path || 'storage.pass' });
  }

  rekey = (newSecret: string) => {
    return this.db.raw(`PRAGMA rekey = '${newSecret}';`);
  };
}

export default EncryptedStorage;
