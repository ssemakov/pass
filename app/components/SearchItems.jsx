// @flow
import React, { useState } from 'react';
import { type knex } from 'knex';
import { Grid, TextField } from '@material-ui/core';
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
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          autoFocus
          fullWidth
          aria-label="Search stored secrets"
          InputProps={{ clases: { input: { backgroundColor: '#fff' } } }}
          label="Search"
          variant="outlined"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item>
        <ItemsList items={items} />
      </Grid>
    </Grid>
  );
}

export default withStorage(SearchItems);
