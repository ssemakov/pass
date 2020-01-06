import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import NewItemPage from './containers/NewItemPage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/items/new" component={NewItemPage} />
    </Switch>
  </App>
);
