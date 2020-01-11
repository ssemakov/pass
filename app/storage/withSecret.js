// @flow
import React, { type AbstractComponent } from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { getSecret, getStoragePath } from '../reducers/storage';
import { type AppState } from '../reducers/types';

type InjectedProps = {|
  secret: ?string,
  storagePath: ?string
|};

const withSecret = (Component: AbstractComponent<InjectedProps>) => {
  function mapStateToProps(state: AppState): InjectedProps {
    return {
      secret: getSecret(state),
      storagePath: getStoragePath(state)
    };
  }

  type Props = {|
    ...InjectedProps,
    dispatch: Dispatch<*>
  |};

  function WrapperComponent(props: Props) {
    const { secret, storagePath, dispatch, ...rest } = props;

    return (
      <Component
        secret={secret}
        storagePath={storagePath}
        {...(rest: $Rest<Props, Props>)}
      />
    );
  }

  return connect<Props, {}, _, _, _, _>(mapStateToProps)(WrapperComponent);
};

export default withSecret;
