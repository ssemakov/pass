// @flow
import React, { useEffect, useState } from 'react';
import { withRouter, type ContextRouter } from 'react-router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
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
    <Container fixed>
      <Grid container direction="column" spacing={3}>
        <Grid item />
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item>
              <Tooltip
                title="Add new secret"
                aria-label="add new secret"
                placement="bottom"
              >
                <Fab color="primary" onClick={handleAddNewItemClick}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                aria-label={`${totalItems} secrets stored`}
              >
                {totalItems} secrets stored
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <SearchItems />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStorage(withRouter<WithStorageInjectedProps>(Home));
