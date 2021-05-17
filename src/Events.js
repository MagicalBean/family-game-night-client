import React from 'react';

import AddEvent from './AddEvent';
import ShowEvents from './CalendarEvents';

// Material UI
import { Grid } from '@material-ui/core';

export default function Events() {
  const [updateTable, setUpdateTable] = React.useState(true);

  const updateEventsTable = () => {
    setUpdateTable(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item sm={12} md={8} lg={6}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <AddEvent updateEventsTable={updateEventsTable} />
          </Grid>
          <Grid item>
            <ShowEvents
              updateTable={updateTable}
              setUpdateTable={setUpdateTable}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
