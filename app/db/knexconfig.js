// @flow

export type Options = {
  path: string,
  secret: string,
  pool?: {|
    afterCreate: (*, *) => mixed
  |}
};

const defaultValues = (options: Options) => ({
  client: 'sqlite3',
  connection: {
    filename: options.path
  },
  pool: {
    afterCreate: (conn: *, done: *) => {
      conn.run('PRAGMA cipher_compatibility = 3;');
      conn.run(`PRAGMA key = '${options.secret}';`);
      done();
    }
  },
  useNullAsDefault: true
});

module.exports = {
  development: (options: Options) => ({
    ...defaultValues(options),
    debug: true,
    asyncStackTraces: true
  }),

  production: (options: Options) => ({
    ...defaultValues(options)
  }),

  test: (options: Options) => ({
    ...defaultValues(options),
    ...options.pool
  })
};
