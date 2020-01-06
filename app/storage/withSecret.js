// @flow
import React, { type AbstractComponent } from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { getSecret } from '../reducers/storage';
import { type AppState } from '../reducers/types';

type InjectedProps = {|
  secret: ?string
|};

const withSecret = (Component: AbstractComponent<InjectedProps>) => {
  function mapStateToProps(state: AppState): InjectedProps {
    return {
      secret: getSecret(state)
    };
  }

  type Props = {|
    ...InjectedProps,
    dispatch: Dispatch<*>
  |};

  function WrapperComponent({ secret, dispatch, ...rest }: Props) {
    return <Component secret={secret} {...(rest: $Rest<Props, Props>)} />;
  }

  return connect<Props, {}, _, _, _, _>(mapStateToProps)(WrapperComponent);
};

export default withSecret;
