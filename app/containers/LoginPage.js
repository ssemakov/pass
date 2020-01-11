// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAuthenticated, getStoragePath } from '../reducers/storage';
import * as storageActions from '../actions/storage';
import Login from '../components/Login';

export type LoginPageConnectedProps = {|
  authenticated: boolean,
  storagePath: string,
  setStoragePath: (path: string) => void,
  authenticate: (secret: string, path: ?string) => Promise<boolean>
|};

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    storagePath: getStoragePath(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(storageActions, dispatch);
}

export default connect<LoginPageConnectedProps, {}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<LoginPageConnectedProps>(Login));
