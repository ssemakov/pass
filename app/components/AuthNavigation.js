// @flow
import { useEffect } from 'react';
import { withRouter, type RouterHistory } from 'react-router';
import Settings from 'electron-settings';

type Props = {
  history: RouterHistory
};

function AuthNavigation({ history }: Props) {
  useEffect(() => {
    if (Settings.get('default_storage_path')) {
      history.push('/login');
    } else {
      history.push('/signup');
    }
  }, []);

  return null;
}

export default withRouter<{||}>(AuthNavigation);
