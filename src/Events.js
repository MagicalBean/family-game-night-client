import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { format } from 'date-fns';

import AddEvent from './AddEvent';
import ShowEvents from './CalendarEvents';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, Input, Typography } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
