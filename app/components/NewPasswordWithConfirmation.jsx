// @flow
import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Formik, Form, Field, ErrorMessage, type FormikProps } from 'formik';
import { Collapse, Grid, Typography } from '@material-ui/core';
import PasswordField from './PasswordField';

type FormValues = {
  password: string,
  confirmation: ?string
};

type Props = {
  onButtonClick: (password: string) => void
};

export default function({ onButtonClick }: Props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordEnterButton, setShowPasswordEnterButton] = useState(true);

  function handleSubmit({ password, confirmation }, formik) {
    if (!isEmpty(password) && isEmpty(confirmation) && !showConfirmation) {
      return setShowConfirmation(true);
    }

    if (password === confirmation) {
      return onButtonClick(password);
    }

    formik.setFieldError('confirmation', "Passwords don't match");
  }

  function handlePasswordFocus() {
    setShowPasswordEnterButton(true);
  }

  function handleConfirmationFocus() {
    setShowPasswordEnterButton(false);
  }

  return (
    <Formik
      initialValues={{
        password: '',
        confirmation: ''
      }}
      onSubmit={handleSubmit}
    >
      {({ errors }: FormikProps<FormValues>) => (
        <Form>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Field
                autoFocus={!showConfirmation}
                fullWidth
                showEnterButton={showPasswordEnterButton}
                name="password"
                component={PasswordField}
                placeholder="Enter your storage Master Password"
                onFocus={handlePasswordFocus}
              />
            </Grid>
            <Grid item>
              <Collapse in={showConfirmation} timeout="auto">
                {showConfirmation && (
                  <Field
                    autoFocus
                    fullWidth
                    name="confirmation"
                    component={PasswordField}
                    placeholder="Please confirm the Master Password"
                    showEnterButton={!showPasswordEnterButton}
                    onFocus={handleConfirmationFocus}
                  />
                )}
              </Collapse>
            </Grid>
            <Grid item>
              {isEmpty(errors) ? (
                <>&nbsp;</>
              ) : (
                <ErrorMessage
                  name="confirmation"
                  render={(message: string) => (
                    <Typography variant="body2" color="error">
                      {message}
                    </Typography>
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
