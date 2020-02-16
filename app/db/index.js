// @flow
import knexconfig, { type Options } from './knexconfig';

const environment = process.env.NODE_ENV || 'development';

class KnexAdapter {
  instance: KnexAdapter;

  knex: *;

  _connection: *;

  constructor() {
    if (!this.instance) {
      this.init();
      this.instance = this;
    }

    return this.instance;
  }

  init() {
    // use node bidings for test.
    if (environment === 'test') {
      // #if process.env.NODE_ENV === 'test'
      this.knex = require('../../node_modules/knex'); // eslint-disable-line global-require
      // #endif
    } else {
      // otherwise use electron bindings
      this.knex = require('knex'); // eslint-disable-line global-require
    }
  }

  connection(options: Options) {
    if (!this._connection) {
      this._connection = this.knex(config(options));
    }

    return this._connection;
  }

  resetConnection(newConnection: * = null) {
    this._connection = newConnection;
  }
}

const config = knexconfig[environment];
export { config };
export default new KnexAdapter();
