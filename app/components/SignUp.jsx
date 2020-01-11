// @flow
import React, { useEffect, useState } from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import electron from 'electron';
import NewPasswordWithConfirmation from './NewPasswordWithConfirmation';

type SignUpProps = {|
  createStorageAndAuthenticate: (
    secret: string,
    path: ?string
  ) => Promise<void>,
  history: RouterHistory,
  ...ContextRouter
|};

export default function({
  createStorageAndAuthenticate,
  history
}: SignUpProps) {
  const [storagePath, setStoragePath] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultPath = electron.remote.app.getPath('userData');
    const storageDefaultPath = `${defaultPath}/storage.pass`;
    setStoragePath(storageDefaultPath);
  }, []);

  const handleCreateClick = (secret: string) => {
    // TODO: need to be on input change
    setError(null);

    createStorageAndAuthenticate(secret, storagePath)
      .then(() => history.push('/'))
      .catch(exception => {
        if (
          exception.code === 'SQLITE_NOTADB' ||
          exception.code === 'SQLITE_ERROR'
        ) {
          setError(`Storage already exists at '${storagePath}'`);
        } else if (exception.code === 'SQLITE_CANTOPEN') {
          setError(`Cannot create storage at '${storagePath}'`);
        } else {
          throw exception;
        }
      });
  };

  const handleStoragePathChange = () => {
    setError(null);

    electron.remote.dialog
      .showSaveDialog(null, {
        title: 'Select storage path',
        defaultPath: storagePath
      })
      .then(({ canceled, filePath }) =>
        canceled ? filePath : setStoragePath(filePath)
      );
  };

  return (
    <>
      <div>
        {storagePath}
        <button type="button" onClick={handleStoragePathChange}>
          change
        </button>
      </div>
      <NewPasswordWithConfirmation
        createLabel="Create Storage"
        onButtonClick={handleCreateClick}
      />
      <div>{error}</div>
    </>
  );
}
