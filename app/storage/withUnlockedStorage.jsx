// @flow
import React, { type AbstractComponent } from 'react';
import withSecret from './withSecret';
import EncryptedStorage from './EncryptedStorage';
import StorageContext from './context';

const withUnlockedStorage = (Component: AbstractComponent<*>) => {
  type Props = {|
    secret: ?string
  |};

  function WrappedComponent({ secret, ...rest }: Props) {
    if (!secret) return <Component {...rest} />;

    return (
      <StorageContext.Provider value={new EncryptedStorage(secret)}>
        <Component {...rest} />
      </StorageContext.Provider>
    );
  }

  const WrappedComponentWithSecret = withSecret(WrappedComponent);
  return (props: {}) => <WrappedComponentWithSecret {...props} />;
};

export default withUnlockedStorage;
