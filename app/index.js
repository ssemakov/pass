// @flow
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import unhandled from 'electron-unhandled';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import './app.global.css';

unhandled();

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  // $FlowIgnore : the element with id 'root' is always defined in app.html
  document.getElementById('root')
);
