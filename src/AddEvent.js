import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import './App.scss';

import { format } from 'date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  validate,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BASE_URL } from './Utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      minWidth: 350,
      margin: 10,
      marginTop: 50,
      padding: 10,
    },
    minWidth: 650,
    margin: 10,
    marginTop: 100,
  },
  dateInput: {
    margin: 0,
  },
  textInput: {
    underline: '#f00',
  },
}));

export default function AddEvent({ updateEventsTable }) {
  const classes = useStyles();
  const [gameTitle, setGameTitle] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGameChange = (e) => {
    setGameTitle(e.target.value);
  };

  const CreateEvent = (e) => {
    setLoading(true);
    if (gameTitle === '') return;

    axios
      .post(`${BASE_URL}/events/add`, {
        game: gameTitle,
        date: selectedDate,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setGameTitle('');
          updateEventsTable();
          setSelectedDate(new Date());
        }, 500);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <TextField
          style={{ marginTop: 16, marginBottom: 8 }}
          className={classes.textInput}
          type="text"
          placeholder="Game..."
          color="primary"
          value={gameTitle}
          onChange={handleGameChange}
        ></TextField>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          className={classes.dateInput}
        >
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          ></KeyboardDatePicker>
          {loading && <CircularProgress />}
          {!loading && (
            <Button variant="contained" color="primary" onClick={CreateEvent}>
              Add
            </Button>
          )}
        </MuiPickersUtilsProvider>
      </Grid>
    </Paper>
  );
}
