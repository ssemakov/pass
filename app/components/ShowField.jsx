// @flow
import React, { useState } from 'react';
import { clipboard } from 'electron';

type Props = {
  value: string,
  hidden?: boolean
};

export default function ShowField({ value, hidden }: Props) {
  const [show, setShow] = useState(!hidden);
  const toggleShow = () => setShow(!show);
  const copyToClipboard = () => clipboard.writeText(value);

  return (
    <>
      <span>{show ? value : '*****'}</span>
      <button type="button" onClick={copyToClipboard}>
        copy
      </button>
      {hidden && (
        <button type="button" onClick={toggleShow}>
          {show ? 'hide' : 'reveal'}
        </button>
      )}
    </>
  );
}

ShowField.defaultProps = {
  hidden: false
};
