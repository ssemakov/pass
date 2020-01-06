// @flow
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, type RouterHistory } from 'react-router';
import { type knex } from 'knex';
import { withStorage } from '../storage';

type Props = {
  storage: knex,
  history: RouterHistory
};

function AddNewItem({ storage, history }: Props) {
  const handleCancelClick = () => history.push('/');

  const handleSubmit = values => {
    const timestamp = new Date().getTime();

    storage('login_items')
      .insert({
        ...values,
        created_at: timestamp,
        updated_at: timestamp
      })
      .then(() => history.push('/'))
      .catch(error => console.log('error', error));
  };

  return (
    <>
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
            <div>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" />
            </div>
            <div>
              <label htmlFor="login">Login</label>
              <Field id="login" name="login" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <Field id="url" name="url" />
            </div>
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
      <button type="button" onClick={handleCancelClick}>
        Cancel
      </button>
    </>
  );
}

export default withStorage(withRouter(AddNewItem));
