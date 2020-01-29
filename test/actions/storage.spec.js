import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Settings from 'electron-settings';
import * as actions from '../../app/actions/storage';
import EncryptedStorage from '../../app/storage';

jest.mock('electron-settings');
jest.mock('../../app/storage');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('authenticationSucceeded', () => {
    it('creates the corect action', () => {
      const expected = {
        secret: 'a secret',
        storagePath: 'a/path',
        type: 'AUTHENTICATION_SUCCEEDED'
      };

      expect(actions.authenticationSucceeded('a secret', 'a/path')).toEqual(
        expected
      );
    });
  });

  describe('setStoragePath', () => {
    it('creates the correct action', () => {
      const expected = {
        path: 'a/path',
        type: 'SET_STORAGE_PATH'
      };

      expect(actions.setStoragePath('a/path')).toEqual(expected);
    });
  });

  describe('authenticate', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      EncryptedStorage.tryKey.mockResolvedValue(true);
    });

    it('calls EncryptedStorage.tryKey', async () => {
      await store.dispatch(actions.authenticate('secret', 'path'));
      expect(EncryptedStorage.tryKey).toHaveBeenCalledWith('secret', 'path');
    });

    it('creates AUTHENTICATION_SUCCEEDED when password match', async () => {
      const expected = [
        {
          secret: 'secret',
          storagePath: 'path',
          type: 'AUTHENTICATION_SUCCEEDED'
        }
      ];
      await store.dispatch(actions.authenticate('secret', 'path'));

      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('createStorageAndAuthenticate', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      EncryptedStorage.create.mockResolvedValue(true);
    });

    it('calls EncryptedStorage.create', async () => {
      await store.dispatch(
        actions.createStorageAndAuthenticate('secret', 'path')
      );
      expect(EncryptedStorage.create).toHaveBeenCalledWith('secret', 'path');
    });

    it('sets default_storage_path to the new value', async () => {
      await store.dispatch(
        actions.createStorageAndAuthenticate('secret', 'path')
      );
      expect(Settings.set).toHaveBeenCalledWith(
        'default_storage_path',
        'path',
        { prettify: true }
      );
    });

    it('creates AUTHENTICATION_SUCCEEDED when password match', async () => {
      const expected = [
        {
          secret: 'correct secret',
          storagePath: 'right path',
          type: 'AUTHENTICATION_SUCCEEDED'
        }
      ];
      await store.dispatch(
        actions.createStorageAndAuthenticate('correct secret', 'right path')
      );
      expect(store.getActions()).toEqual(expected);
    });
  });
});
