// @flow
import React, { type AbstractComponent } from 'react';
import { type knex } from 'knex';
import type EncryptedStorage from './EncryptedStorage';

const StorageContext = React.createContext<knex>('storage');

export type WithStorageInjectedProps = {|
  storage: knex
|};

export const withStorage = (Component: AbstractComponent<*>) => (props: *) => (
  <StorageContext.Consumer>
    {(storage: EncryptedStorage) => (
      <Component {...props} storage={storage.db} />
    )}
  </StorageContext.Consumer>
);

export default StorageContext;
