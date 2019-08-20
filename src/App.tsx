import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import StoreProvider from 'store/StoreProvider';
import AuthPage from 'auth/components/AuthPage/AuthPage';
import TodosPage from 'todos/components/TodosPage/TodosPage';

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#02c5e1',
      light: '#fdfffc',
      dark: '#00a1b8',
    },
    secondary: {
      main: '#2f4460',
      dark: '#011627',
    },
    error: {
      main: '#e71d36',
      dark: '#b8162a',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StoreProvider>
          <Route exact path="/login" component={AuthPage} />
          <Route exact path="/todos" component={TodosPage} />
        </StoreProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default hot(App);
