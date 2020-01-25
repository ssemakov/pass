// @flow
import React, { type Node } from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f4f4f5'
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        backgroundColor: '#fff'
      }
    }
  }
});

type Props = {
  children: Node
};

export default function({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
