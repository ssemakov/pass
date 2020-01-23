// @flow
import React from 'react';
import { type FieldInputProps } from 'formik';
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  type OutlinedInputProps
} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

type Props<FormValues> = {|
  disabled: boolean,
  field: FieldInputProps<FormValues>,
  showEnterButton?: boolean,
  rest: OutlinedInputProps
|};

export default function PasswordField<FormValues>({
  disabled,
  field,
  showEnterButton,
  ...rest
}: Props<FormValues>) {
  return (
    <OutlinedInput
      id="password-input"
      type="password"
      disabled={disabled}
      {...rest}
      {...field}
      endAdornment={
        showEnterButton && (
          <InputAdornment position="end" variant="filled">
            <IconButton
              aria-label="enter"
              color="primary"
              type="submit"
              disabled={disabled}
              tabIndex="-1"
            >
              <KeyboardReturnIcon />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
}

PasswordField.defaultProps = {
  showEnterButton: true
};
