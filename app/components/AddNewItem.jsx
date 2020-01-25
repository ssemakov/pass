// @flow
import React, { type Node } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, type RouterHistory } from 'react-router';
import { type knex } from 'knex';
import { Box, Button, Container, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { withStorage } from '../storage';

type InputFieldProps = {
  name: string,
  label: string,
  type?: string
};

function InputField({ name, label, type }: InputFieldProps) {
  return (
    <Field
      fullWidth
      name={name}
      type={type}
      component={TextField}
      margin="dense"
      variant="outlined"
      label={label}
    />
  );
}

InputField.defaultProps = {
  type: 'text'
};

type FormButtonsProps = {
  onCancelClick: () => void
};

function FormButtons({ onCancelClick }: FormButtonsProps) {
  return (
    <Grid container direction="row" justify="flex-end" spacing={1}>
      <Grid item>
        <Button variant="outlined" onClick={onCancelClick}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

type FormLayoutProps = {
  children: Array<Node>
};

function FromLayout({ children }: FormLayoutProps) {
  return (
    <Container fixed>
      <Grid container direction="column">
        {children.map((field, index) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <Grid item key={index}>
            {field}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

type AddNewItemProps = {
  storage: knex,
  history: RouterHistory
};

function AddNewItem({ storage, history }: AddNewItemProps) {
  const handleCancelClick = () => history.push('/');

  const handleSubmit = values => {
    const timestamp = new Date().getTime();

    storage('login_items')
      .insert({
        ...values,
        created_at: timestamp,
        updated_at: timestamp
      })
      .then(() => history.push('/'));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        login: '',
        password: '',
        url: ''
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <FromLayout>
            <InputField name="name" label="Item name" />
            <InputField name="login" label="Username" />
            <InputField name="password" type="password" label="Password" />
            <InputField name="url" label="Website URL" />
            <Box margin={0.5} />
            <FormButtons onCancelClick={handleCancelClick} />
          </FromLayout>
        </Form>
      )}
    </Formik>
  );
}

export default withStorage(withRouter(AddNewItem));
