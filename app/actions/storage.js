// @flow
import Settings from 'electron-settings';
import type { Dispatch } from '../reducers/types';
import EncryptedStorage from '../storage';

export const AUTHENTICATION_SUCCEEDED = 'AUTHENTICATION_SUCCEEDED';
export const SET_STORAGE_PATH = 'SET_STORAGE_PATH';

export function authenticationSucceeded(secret: string, storagePath: string) {
  return {
    type: AUTHENTICATION_SUCCEEDED,
    secret,
    storagePath
  };
}

export function setStoragePath(path: string) {
  return {
    type: SET_STORAGE_PATH,
    path
  };
}

export function authenticate(secret: string, storagePath: string) {
  return async (dispatch: Dispatch) => {
    return EncryptedStorage.tryKey(secret, storagePath).then(() =>
      dispatch(authenticationSucceeded(secret, storagePath))
    );
  };
}

export function createStorageAndAuthenticate(
  secret: string,
  storagePath: string
) {
  return async (dispatch: Dispatch) => {
    await EncryptedStorage.create(secret, storagePath);
    Settings.set('default_storage_path', storagePath, { prettify: true });
    return dispatch(authenticationSucceeded(secret, storagePath));
  };
}
