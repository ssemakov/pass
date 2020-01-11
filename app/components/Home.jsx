// @flow
import React, { useEffect, useState } from 'react';
import { withRouter, type ContextRouter } from 'react-router';
import { withStorage, type WithStorageInjectedProps } from '../storage';
import SearchItems from './SearchItems';

type Props = {|
  ...WithStorageInjectedProps,
  ...ContextRouter
|};

function Home(props: Props) {
  const { storage, history } = props;
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    storage('login_items')
      .count('id', { as: 'id_count' })
      .then(result => {
        return setTotalItems(result[0].id_count);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const handleAddNewItemClick = () => {
    history.push('/items/new');
  };

  return (
    <>
      <div>{totalItems} secrets stored</div>
      <button type="button" onClick={handleAddNewItemClick}>
        + Add new Item
      </button>
      <div>
        <SearchItems />
      </div>
    </>
  );
}

export default withStorage(withRouter<WithStorageInjectedProps>(Home));
