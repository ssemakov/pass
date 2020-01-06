// @flow
import {
  AUTHENTICATION_SUCCEEDED,
  AUTHENTICATION_FAILED
} from '../actions/storage';
import type { Action, StorageState } from './types';

export default function counter(
  state: StorageState = {
    authenticated: false,
    authAttemptFailed: false
  },
  action: Action
) {
  switch (action.type) {
    case AUTHENTICATION_SUCCEEDED:
      return {
        ...state,
        authenticated: true,
        authAttemptFailed: false,
        secret: action.secret
      };
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        authenticated: false,
        authAttemptFailed: true
      };
    default:
      return state;
  }
}

export const getAuthenticated = (state: { storage: StorageState }) =>
  state.storage.authenticated;
export const getAuthAttemptFailed = (state: { storage: StorageState }) =>
  state.storage.authAttemptFailed;
export const getSecret = (state: { storage: StorageState }) =>
  state.storage.secret;
