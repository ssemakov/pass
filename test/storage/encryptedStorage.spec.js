import TestDb from '../testDbHelper';
import KnexAdapter from '../../app/db';
import EncryptedStorage from '../../app/storage';

describe('EncryptedStorage', () => {
  const testDbPath = './testdb';
  const secret = 'secret';
  const testDb = new TestDb(secret, testDbPath);

  afterAll(async () => {
    await testDb.unlink();
  });

  describe('create', () => {
    afterEach(jest.restoreAllMocks);

    it('should reset connection', async () => {
      const resetConnectionSpy = jest.spyOn(KnexAdapter, 'resetConnection');

      await testDb.transact(async tx => {
        // awoid using of a new connection by `create`
        jest.spyOn(KnexAdapter, 'connection').mockReturnValue(tx);

        return EncryptedStorage.create('anything', testDbPath);
      });

      expect(resetConnectionSpy).toHaveBeenCalled();
    });

    it('should create login_itmes table', async () => {
      await testDb.transact(async tx => {
        jest.spyOn(KnexAdapter, 'connection').mockReturnValue(tx);

        await EncryptedStorage.create('anything', testDbPath);
        const tableExists = await tx.schema.hasTable('login_items');
        expect(tableExists).toEqual(true);
      });
    });

    it('should return a new instance', async () => {
      await testDb.transact(async tx => {
        jest.spyOn(KnexAdapter, 'connection').mockReturnValue(tx);

        const storage = await EncryptedStorage.create('anything', testDbPath);
        expect(storage instanceof EncryptedStorage).toBe(true);
      });
    });
  });

  describe('tryKey', () => {
    afterEach(jest.restoreAllMocks);

    it('should throw an error when not able to access file path', async () => {
      await testDb.transact(async tx => {
        jest.spyOn(KnexAdapter, 'connection').mockReturnValueOnce(tx);

        await expect(
          EncryptedStorage.tryKey('anything', 'anything')
        ).rejects.toThrow(
          "ENOENT: no such file or directory, access 'anything'"
        );
      });
    });

    describe('when db is encrypted', () => {
      afterEach(async () => {
        await testDb.unlink();
      });

      it('should reset connection', async () => {
        await EncryptedStorage.create(secret, testDbPath);
        const resetConnectionSpy = jest.spyOn(KnexAdapter, 'resetConnection');

        await EncryptedStorage.tryKey(secret, testDbPath);
        expect(resetConnectionSpy).toHaveBeenCalled();
      });

      it('should throw an error when the secret is incorrect', async () => {
        await EncryptedStorage.create(secret, testDbPath);

        await expect(
          EncryptedStorage.tryKey('wrong_secret', testDbPath)
        ).rejects.toThrow('SQLITE_NOTADB: file is not a database');
      });

      it('should resulve with true when secret and path match to an existen db', async () => {
        await EncryptedStorage.create(secret, testDbPath);

        await expect(
          EncryptedStorage.tryKey(secret, testDbPath)
        ).resolves.toEqual(true);
      });
    });
  });

  describe('rekey', () => {
    afterEach(async () => {
      await testDb.unlink();
    });

    it('should reset secret to a new one', async () => {
      const storage = await EncryptedStorage.create(secret, testDbPath);
      await storage.rekey('new secret');

      await expect(
        EncryptedStorage.tryKey('new secret', testDbPath)
      ).resolves.toEqual(true);
    });
  });
});
