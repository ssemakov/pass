// @flow
import React, { useState } from 'react';
import { type knex } from 'knex';
import { withStorage } from '../storage';
import ItemsList from './ItemsList';

type Props = {
  storage: knex
};

function SearchItems({ storage }: Props) {
  const [items, setItems] = useState([]);

  const handleInputChange = ({
    target: { value }
  }: SyntheticInputEvent<HTMLInputElement>) => {
    if (value.length < 3) {
      setItems([]);
    } else {
      return storage('login_items')
        .select('*')
        .where('url', 'like', `%${value}%`)
        .orWhere('name', 'like', `%${value}%`)
        .then(result => setItems(result));
    }
  };

  return (
    <>
      <input placeholder="Search by name or URL" onChange={handleInputChange} />
      <ItemsList items={items} />
    </>
  );
}

export default withStorage(SearchItems);
