import Events from './Events';
import Games from './Games';
import Header from './Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#333333',
      default: '#212121',
    },
    primary: {
      main: '#90CAF9',
    },
    secondary: {
      main: '#000',
    },
  },
  spread: {},
});

export default function CustomStyles() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Route exact path="/">
              <Redirect to="/events" />
            </Route>
            <Route path="/events">
              <Events />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
          </CssBaseline>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}
