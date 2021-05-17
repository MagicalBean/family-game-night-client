import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ...theme.spread,
}));

export default function Home() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [exactDisplay, setExactDisplay] = useState(false);

  useEffect(() => {
    axios
      .get('https://family-game-night-calc.herokuapp.com/events')
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.log(err));
  }, []);

  function toggleExact(e) {
    setExactDisplay(!exactDisplay);
  }

  function fromDaysExact(date) {
    var given = moment(date, 'YYYY-MM-DD');
    var current = moment().startOf('day');

    var days = Math.round(
      Math.abs(moment.duration(given.diff(current)).asDays())
    );

    var suffix = ' day'.concat(days === 1 ? '' : 's');
    return days + suffix;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <TableContainer style={{ minWidth: 650 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" id="tableTitle" component="div">
                    Games
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h6" id="tableTitle" component="div">
                        Last Played
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={toggleExact}>(exact)</Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.name}>
                  <TableCell component="th" scope="row">
                    {event.name}
                  </TableCell>
                  <TableCell align="right">
                    {exactDisplay
                      ? fromDaysExact(event.date)
                      : moment(event.date).fromNow()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
