// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAuthenticated, getAuthAttemptFailed } from '../reducers/storage';
import * as storageActions from '../actions/storage';
import Login from '../components/Login';

export type LoginPageConnectedProps = {|
  authenticated: boolean,
  authAttemptFailed: boolean,
  authenticate: (secret: string) => void
|};

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    authAttemptFailed: getAuthAttemptFailed(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(storageActions, dispatch);
}

export default connect<LoginPageConnectedProps, {}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<LoginPageConnectedProps>(Login));
