// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SignUp from '../components/SignUp';
import * as storageActions from '../actions/storage';

type SignUpPageConnectedProps = {|
  createStorageAndAuthenticate: (secret: string) => Promise<void>
|};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(storageActions, dispatch);
}

export default connect<SignUpPageConnectedProps, {}, _, _, _, _>(
  null,
  mapDispatchToProps
)(withRouter<SignUpPageConnectedProps>(SignUp));
