import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type StorageState = {
  +authenticated: boolean,
  +authAttemptFailed: boolean,
  +secret?: string
};

export type AppState = {
  storage: StorageState
};

export type Action = {
  +type: string
};

export type GetState = () => StorageState;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
