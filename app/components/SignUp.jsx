// @flow
import React from 'react';
import type { RouterHistory, ContextRouter } from 'react-router';
import NewPasswordWithConfirmation from './NewPasswordWithConfirmation';

type SignUpProps = {|
  createStorageAndAuthenticate: (secret: string) => Promise<void>,
  history: RouterHistory,
  ...ContextRouter
|};

export default function({
  createStorageAndAuthenticate,
  history
}: SignUpProps) {
  const handleButtonClick = (secret: string) => {
    createStorageAndAuthenticate(secret)
      .then(() => history.push('/'))
      .catch(err => console.log('error', err));
  };

  return (
    <>
      {/* <h1>Hi there!</h1> */}
      {/* <p> Welcome to the Pass (yet another password manager).</p> */}
      {/* <div> Let's create a new secure storage for your passwords</div>
      <div>
        {' '}
        Please enter a master password below. It will be used to unlock your
        storage.
      </div> */}
      <p />
      <NewPasswordWithConfirmation
        createLabel="Create Storage"
        onButtonClick={handleButtonClick}
      />
    </>
  );
}
