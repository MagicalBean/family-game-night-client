import React, { useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress, IconButton, Typography } from '@material-ui/core';

// Icons
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { BASE_URL } from './Utils';

import { formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      minWidth: 350,
      padding: 10,
      margin: 0,
    },
    minWidth: 650,
    margin: 10,
  },
  delete: {
    color: '#cc4545',
    margin: -12,
    marginTop: -15.5,
  },
  loading: {
    marginTop: 50,
  },
}));

export default function CalendarEvents({ updateTable, setUpdateTable }) {
  const classes = useStyles();
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (updateTable) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/events/all`)
        .then((res) => {
          setTimeout(() => {
            setEvents(res.data);
            setUpdateTable(false);
            setLoading(false);
          }, 500);
        })
        .catch((err) => console.log(err));
    }
    //eslint-disable-next-line
  }, [updateTable]);

  const deleteEvent = (id) => {
    axios
      .delete(`${BASE_URL}/events/delete`, { data: { id: id } })
      .then((res) => {
        console.log(res);
        setEvents(
          events.filter((value, index, arr) => {
            return !(value._id === id);
          })
        );
      })
      .catch((err) => console.error(err));
  };

  let markup = loading ? (
    <CircularProgress className={classes.loading} />
  ) : (
    <TableContainer className={classes.container}>
      <Table aria-label="events table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Games</Typography>
            </TableCell>
            <TableCell
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
                alignItems: 'center',
              }}
              align="right"
            >
              <Typography variant="h6">Date</Typography>
              <IconButton edge="end" onClick={() => setUpdateTable(true)}>
                <RefreshIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* ITTERATOR */}
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell component="th" scope="row">
                {event.event}
              </TableCell>
              <TableCell
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'right',
                  alignItems: 'center',
                }}
                align="right"
              >
                <Typography variant="body2" style={{ marginRight: 12 }}>
                  {formatDistanceToNow(new Date(event.date), 'MM/dd/yyyy') +
                    ' ago'}
                </Typography>
                <IconButton
                  className={classes.delete}
                  onClick={() => deleteEvent(event._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return markup;
}
