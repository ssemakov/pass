// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as storageActions from '../actions/storage';
import { getAuthenticated } from '../reducers/storage';
import AuthNavigation from '../components/AuthNavigation';
import Home from '../components/Home';
import withUnlockedStorage from '../storage/withUnlockedStorage';

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(storageActions, dispatch);
}

const HomeWithUnlockedStorage = withUnlockedStorage(Home);

type Props = {
  authenticated: boolean
};

function HomePage({ authenticated }: Props) {
  return authenticated ? <HomeWithUnlockedStorage /> : <AuthNavigation />;
}

export default connect<Props, {}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
