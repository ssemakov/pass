// @flow
import React, { useEffect, useState } from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import electron from 'electron';
import { Container, Grid, IconButton, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
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
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid container item style={{ marginTop: 30 }}>
          <Grid item xs />
          <Grid item>
            <Typography
              paragraph={false}
              variant="caption"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {storagePath}
            </Typography>
            <IconButton onClick={handleStoragePathChange}>
              <FolderOpenIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <NewPasswordWithConfirmation
              createLabel="Create Storage"
              onButtonClick={handleCreateClick}
            />
          </Grid>
          <Grid item xs={12}>
            {error ? (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            ) : (
              <>&nbsp;</>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
