// @flow
import React, { useEffect } from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import Settings from 'electron-settings';
import isEmpty from 'lodash/isEmpty';
import {
  Field,
  type FieldInputProps,
  type FormikProps,
  Formik,
  Form,
  ErrorMessage
} from 'formik';
import {
  Container,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  OutlinedInput
} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

type FormValues = {
  password: string
};

type PasswordFieldProps = {
  disabled: boolean,
  field: FieldInputProps<FormValues>
};

function PasswordField({ disabled, field }: PasswordFieldProps) {
  return (
    <OutlinedInput
      autoFocus
      fullWidth
      id="password-input"
      type="password"
      placeholder="Enter your Master Password"
      disabled={disabled}
      {...field}
      endAdornment={
        <InputAdornment position="end" variant="filled">
          <IconButton
            aria-label="enter"
            color="primary"
            type="submit"
            disabled={disabled}
          >
            <KeyboardReturnIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

type FormProps = {|
  authenticated: boolean,
  authenticate: (secret: string, path: ?string) => Promise<boolean>,
  storagePath: ?string,
  setStoragePath: (path: string) => void,
  history: RouterHistory,
  ...ContextRouter
|};

export default function(props: FormProps) {
  const {
    authenticate,
    authenticated,
    history,
    storagePath,
    setStoragePath
  } = props;

  useEffect(() => {
    const defaultStoragePath = Settings.get('default_storage_path');
    setStoragePath(defaultStoragePath);
  }, []);

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated]);

  const handleSubmit = ({ password }, formik) => {
    authenticate(password, storagePath).catch(exception => {
      if (exception.code === 'SQLITE_NOTADB') {
        formik.setFieldError('password', "That didn't work");
      } else if (exception.code === 'ENOENT') {
        formik.setFieldError(
          'password',
          `Can't find storage at '${storagePath || './storage.pass'}'`
        );
      } else {
        throw exception;
      }
    });
  };

  return (
    <Formik
      initialValues={{
        password: ''
      }}
      onSubmit={handleSubmit}
      render={(formik: FormikProps<FormValues>) => {
        console.log('formik', formik);
        return (
          <Form>
            <Container maxWidth="sm">
              <Grid
                container
                direction="column"
                justify="center"
                style={{ minHeight: '100vh' }}
              >
                <Grid item style={{ marginTop: 30 }}>
                  <Field
                    name="password"
                    component={PasswordField}
                    disabled={isEmpty(storagePath)}
                  />
                </Grid>
                <Grid item>
                  <Grid container justify="center">
                    <Grid item>
                      {isEmpty(formik.errors) ? (
                        <>&nbsp;</>
                      ) : (
                        <ErrorMessage
                          name="password"
                          render={(message: string) => (
                            <Typography variant="body2" color="error">
                              {message}
                            </Typography>
                          )}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Form>
        );
      }}
    />
  );
}
