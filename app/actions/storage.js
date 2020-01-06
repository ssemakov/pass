// @flow
import type { Dispatch } from '../reducers/types';
import EncryptedStorage from '../storage';

export const AUTHENTICATION_SUCCEEDED = 'AUTHENTICATION_SUCCEEDED';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

export function authenticationSucceeded(secret: string) {
  return {
    type: AUTHENTICATION_SUCCEEDED,
    secret
  };
}

export function authenticationFailed() {
  return {
    type: AUTHENTICATION_FAILED
  };
}

export function authenticate(secret: string) {
  return async (dispatch: Dispatch) => {
    EncryptedStorage.tryKey(secret)
      .then(() => dispatch(authenticationSucceeded(secret)))
      .catch(() => dispatch(authenticationFailed()));
  };
}

export function createStorageAndAuthenticate(
  secret: string,
  path: string = 'storage'
) {
  return async (dispatch: Dispatch) => {
    await EncryptedStorage.create(secret, path);
    dispatch(authenticationSucceeded(secret));
  };
}
