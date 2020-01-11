// @flow
import { AUTHENTICATION_SUCCEEDED, SET_STORAGE_PATH } from '../actions/storage';
import type { Action, StorageState } from './types';

export default function(
  state: StorageState = {
    authenticated: false,
    storagePath: null
  },
  action: Action
) {
  switch (action.type) {
    case AUTHENTICATION_SUCCEEDED:
      return {
        ...state,
        authenticated: true,
        secret: action.secret,
        storagePath: action.storagePath
      };
    case SET_STORAGE_PATH:
      console.log('reducer/storagePath', action.storagePath);
      return {
        ...state,
        storagePath: action.path
      };
    default:
      return state;
  }
}

export const getAuthenticated = (state: { storage: StorageState }) =>
  state.storage.authenticated;
export const getSecret = (state: { storage: StorageState }) =>
  state.storage.secret;
export const getStoragePath = (state: { storage: StorageState }) =>
  state.storage.storagePath;
