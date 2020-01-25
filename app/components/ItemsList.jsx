// @flow
import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import ShowField from './ShowField';

type ItemRowProps = {
  hidden?: boolean,
  label: string,
  value: string
};

function ItemRow({ hidden, label, value }: ItemRowProps) {
  return (
    <Grid container direction="row">
      <Grid item xs={2} style={{ minWidth: '60px' }}>
        <Typography display="inline" variant="caption">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Box style={{ display: 'inline' }}>
          {value && <ShowField label={label} hidden={hidden} value={value} />}
        </Box>
      </Grid>
    </Grid>
  );
}

ItemRow.defaultProps = {
  hidden: false
};

type ItemProps = {|
  id: number,
  name: string,
  login: string,
  password: string,
  url: string,
  created_at: number,
  updated_at: number
|};

function Item(props: ItemProps) {
  const { name, login, password, url } = props;

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Box fontWeight={800} fontSize="h6.fontSize">
              {name}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ItemRow label="login" value={login} />
          </Grid>
          <Grid item xs={12}>
            <ItemRow hidden label="password" value={password} />
          </Grid>
          <Grid item xs={12}>
            <ItemRow label="url" value={url} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

type Props = {
  items: Array<ItemProps>
};

export default function({ items }: Props) {
  return (
    <Grid container direction="column" spacing={2}>
      {items.map(item => (
        <Grid item key={item.id}>
          <Item {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
