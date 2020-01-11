// @flow
import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import PasswordInput from './PasswordInput';

type Props = {
  createLabel: string,
  onButtonClick: (password: string) => void
};

export default function({ createLabel, onButtonClick }: Props) {
  // TODO: lift state to the page SignUp component and change to Formik
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState({
    value: '',
    confirmed: false
  });

  function handleConfirmationChange({ target: { value } }) {
    setConfirmation({ value, confirmed: value === password });
  }

  return (
    <>
      <div>
        <PasswordInput
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      {!isEmpty(password) && (
        <div>
          <div>Please confirm the password</div>
          <div>
            <PasswordInput
              value={confirmation.value}
              onChange={handleConfirmationChange}
            />
          </div>
          {!isEmpty(confirmation.value) && !confirmation.confirmed && (
            <div>Passwords don&apos;t match </div>
          )}
          <button
            type="button"
            onClick={() => onButtonClick(password)}
            disabled={!confirmation.confirmed}
          >
            {createLabel}
          </button>
        </div>
      )}
    </>
  );
}
