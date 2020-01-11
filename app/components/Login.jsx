// @flow
import React, { useRef, useEffect, useState } from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import Settings from 'electron-settings';
import isEmpty from 'lodash/isEmpty';
import PasswordInput from './PasswordInput';

type LoginProps = {|
  authenticated: boolean,
  authenticate: (secret: string, path: ?string) => Promise<boolean>,
  storagePath: ?string,
  setStoragePath: (path: string) => void,
  history: RouterHistory,
  ...ContextRouter
|};

export default function(props: LoginProps) {
  const {
    authenticate,
    authenticated,
    storagePath,
    setStoragePath,
    history
  } = props;
  const passwordInput = useRef('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultStoragePath = Settings.get('default_storage_path');
    setStoragePath(defaultStoragePath);
  }, []);

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated]);

  const handleUnlockClick = () => {
    const value = (passwordInput.current && passwordInput.current.value) || '';

    authenticate(value, storagePath).catch(exception => {
      if (exception.code === 'SQLITE_NOTADB') {
        setError("That didn't work");
      } else if (exception.code === 'ENOENT') {
        setError(`Can't find storage at '${storagePath || './storage.pass'}'`);
      } else {
        throw exception;
      }
    });
  };

  return (
    <>
      <PasswordInput
        placeholder="Enter your master password"
        onChange={() => setError(null)}
        ref={passwordInput}
      />
      {error && <div>{error}</div>}
      <div>
        <button
          type="button"
          disabled={isEmpty(storagePath)}
          onClick={handleUnlockClick}
        >
          Unlock
        </button>
      </div>
    </>
  );
}
