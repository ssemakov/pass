import storage, {
  getAuthenticated,
  getSecret,
  getStoragePath
} from '../../app/reducers/storage';
import {
  AUTHENTICATION_SUCCEEDED,
  SET_STORAGE_PATH
} from '../../app/actions/storage';

describe('reducers', () => {
  describe('storage', () => {
    it('should have default initial state', () => {
      const expected = {
        authenticated: false,
        storagePath: null
      };

      expect(storage(undefined, {})).toEqual(expected);
    });

    it('should handle AUTHENTICATION_SUCCEEDED', () => {
      expect(
        storage(undefined, {
          type: AUTHENTICATION_SUCCEEDED,
          secret: 'secret',
          storagePath: 'path/to/storage'
        })
      ).toMatchInlineSnapshot(`
        Object {
          "authenticated": true,
          "secret": "secret",
          "storagePath": "path/to/storage",
        }
      `);
    });

    it('should handle SET_STORAGE_PATH', () => {
      expect(
        storage(undefined, {
          type: SET_STORAGE_PATH,
          path: 'path/to/storage'
        })
      ).toMatchInlineSnapshot(`
        Object {
          "authenticated": false,
          "storagePath": "path/to/storage",
        }
      `);
    });

    it('should handle unknown action type', () => {
      expect(storage(undefined, { type: 'unknown' })).toMatchInlineSnapshot(`
        Object {
          "authenticated": false,
          "storagePath": null,
        }
      `);
    });
  });

  describe('getters', () => {
    const state = {
      storage: {
        authenticated: true,
        secret: 'no secret',
        storagePath: 'a/path'
      }
    };

    describe('getAuthenticated', () => {
      it('should return value of authenticated', () => {
        expect(getAuthenticated(state)).toEqual(true);
      });
    });

    describe('getSecret', () => {
      it('should return value of authenticated', () => {
        expect(getSecret(state)).toEqual('no secret');
      });
    });

    describe('getStoragePath', () => {
      it('should return value of authenticated', () => {
        expect(getStoragePath(state)).toEqual('a/path');
      });
    });
  });
});
