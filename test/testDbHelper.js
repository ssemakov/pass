import { promises as fs } from 'fs';
import KnexAdapter, { config } from '../app/db';

class TestDb {
  dbConnection;

  path;

  constructor(secret, path) {
    this.path = path;

    // by passing { pool: null } we are avoiding encrypting test db
    this.dbConnection = KnexAdapter.knex(config({ path, secret, pool: null }));
  }

  async transact(testCallback) {
    await this.dbConnection
      .transaction(async tx => {
        KnexAdapter.resetConnection(tx);
        await testCallback(tx);
        tx.rollback();
      })
      .catch(error => {
        KnexAdapter.resetConnection();

        // an error will be throwen as result of tx.roolback()
        const transactionCompleteError =
          'Transaction query already complete, run with DEBUG=knex:tx for more info';

        if (error.message !== transactionCompleteError) {
          throw error;
        }
      });
  }

  async unlink() {
    await fs.unlink(this.path);
  }
}

export default TestDb;
