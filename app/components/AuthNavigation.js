// @flow
import { useEffect } from 'react';
import fs from 'fs';
import { withRouter, type RouterHistory } from 'react-router';

type Props = {
  history: RouterHistory
};

function AuthNavigation({ history }: Props) {
  useEffect(() => {
    if (fs.existsSync('storage')) {
      history.push('/login');
    } else {
      history.push('/signup');
    }
  }, []);

  return null;
}

export default withRouter<{||}>(AuthNavigation);
