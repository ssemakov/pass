// @flow
import React, { useRef, useEffect, useState } from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import PasswordInput from './PasswordInput';

type LoginProps = {|
  authenticated: boolean,
  authAttemptFailed: boolean,
  authenticate: (secret: string) => void,
  history: RouterHistory,
  ...ContextRouter
|};

export default function(props: LoginProps) {
  const { authenticate, authenticated, authAttemptFailed, history } = props;
  const passwordInput = useRef();
  const [showAuthError, setShowAuthError] = useState(false);

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    } else if (authAttemptFailed) {
      setShowAuthError(true);
    }
  }, [authenticated, authAttemptFailed]);

  const handleUnlockClick = () => {
    const value = passwordInput.current && passwordInput.current.value;
    authenticate(value || '');
  };

  return (
    <>
      <PasswordInput
        placeholder="Enter your master password"
        onChange={() => showAuthError && setShowAuthError(false)}
        ref={passwordInput}
      />
      {showAuthError && <div>That didn&apos;t work</div>}
      <div>
        <button type="button" onClick={handleUnlockClick}>
          Unlock
        </button>
      </div>
    </>
  );
}
