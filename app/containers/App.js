// @flow
import React, { type Node } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

type Props = {
  children: Node
};

export default function({ children }: Props) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
