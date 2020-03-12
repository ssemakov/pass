import KnexAdapter from '../../app/db/KnexAdapter';

describe('KnexAdapter', () => {
  it('should behave as singleton', () => {
    expect(new KnexAdapter()).toEqual(new KnexAdapter());
  });

  describe('.connection', () => {
    const subject = new KnexAdapter();

    it('should return a knex instance', () => {
      const connection = subject.connection({
        secret: 'a secret',
        path: 'db/path'
      });

      expect(connection).toBeInstanceOf(Function);
      expect(connection.name).toEqual('knex');
    });

    it('should return the same knex instance everytime', () => {
      expect(subject.connection({ secret: 'secret 1' })).toEqual(
        subject.connection({ secret: 'secret 2' })
      );
    });
  });

  describe('.resetConnection', () => {
    const subject = new KnexAdapter();

    it('should allow setting new knex connection', () => {
      const newConnection = jest.fn();
      subject.resetConnection(newConnection);
      expect(subject.connection({ secret: 'secret' })).toEqual(newConnection);
    });

    it('should allow creating a new connection after called with default params or null', () => {
      const originalConnection = subject.connection({ secret: 'secret' });

      subject.resetConnection();
      expect(subject.connection({ secret: 'secret' })).not.toEqual(
        originalConnection
      );
    });
  });
});
