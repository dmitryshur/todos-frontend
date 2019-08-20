import React, { useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Notification from 'common/components/Notification/Notification';
import apiData from 'auth/api/api-auth';
import useFetch from 'common/hooks/useFetch';
import { Action } from 'types';
import useStyles from './styles';

enum AuthActions {
  USERNAME_CHANGE = 'USERNAME_CHANGE',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_REPEAT_CHANGE = 'PASSWORD_REPEAT_CHANGE',
  AUTH_TYPE_CHANGE = 'AUTH_TYPE_CHANGE',
}

export enum AuthType {
  LOGIN,
  REGISTER,
}

interface Props {
  theme: Theme;
}

interface State {
  username: string;
  password: string;
  passwordRepeat: string;
  authType: AuthType;
}

const initialState = { username: '', password: '', passwordRepeat: '', authType: AuthType.LOGIN };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case AuthActions.USERNAME_CHANGE:
      return { ...state, username: action.payload };

    case AuthActions.PASSWORD_CHANGE:
      return { ...state, password: action.payload };

    case AuthActions.PASSWORD_REPEAT_CHANGE:
      return { ...state, passwordRepeat: action.payload };

    case AuthActions.AUTH_TYPE_CHANGE:
      return {
        ...initialState,
        authType: state.authType === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN,
      };

    default:
      return initialState;
  }
}

function AuthPage(props: Props) {
  const classes = useStyles(props);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [fetcher, setFetcher] = useFetch(apiData);

  useEffect(() => {}, [fetcher.register]);

  useEffect(() => {}, [fetcher.login]);

  function handleAuthTypeChange() {
    dispatch({ type: AuthActions.AUTH_TYPE_CHANGE });
  }

  function handleInputChange(type: AuthActions) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type, payload: event.target.value });
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { authType, username = '', password = '' } = state;

    if (authType === AuthType.LOGIN) {
      await setFetcher({ type: 'login', data: { username, password } });
      return;
    }

    await setFetcher({ type: 'register', data: { username, password } });
  }

  function renderForm() {
    const { authType, username, password, passwordRepeat } = state;

    const isButtonDisabled =
      authType === AuthType.LOGIN
        ? !username || !password
        : !username || !password || !passwordRepeat || password !== passwordRepeat;

    return (
      <div className={classes.contentContainer}>
        <TextField
          className={classes.textField}
          autoFocus={false}
          label="Username"
          required
          margin="normal"
          InputLabelProps={{
            classes: { root: classes.inputLabel },
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              underline: classes.inputUnderline,
            },
          }}
          onChange={handleInputChange(AuthActions.USERNAME_CHANGE)}
        />
        <TextField
          className={classes.textField}
          autoFocus={false}
          required
          label="Password"
          margin="normal"
          InputLabelProps={{
            classes: { root: classes.inputLabel },
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              underline: classes.inputUnderline,
            },
          }}
          type="password"
          onChange={handleInputChange(AuthActions.PASSWORD_CHANGE)}
        />
        {state.authType === AuthType.REGISTER && (
          <TextField
            className={classes.textField}
            autoFocus={false}
            required
            label="Repeat password"
            margin="normal"
            helperText={
              state.passwordRepeat &&
              state.passwordRepeat.length > 0 &&
              state.passwordRepeat !== state.password
                ? "The passwords don't match"
                : ''
            }
            error={
              !!state.passwordRepeat &&
              state.passwordRepeat.length > 0 &&
              state.passwordRepeat !== state.password
            }
            InputLabelProps={{
              classes: { root: classes.inputLabel },
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot,
                underline: classes.inputUnderline,
              },
            }}
            type="password"
            onChange={handleInputChange(AuthActions.PASSWORD_REPEAT_CHANGE)}
          />
        )}
        <Fab
          className={classes.submitButton}
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Login"
          type="submit"
          disabled={isButtonDisabled}
        >
          {state.authType === AuthType.LOGIN ? 'LOG IN' : 'REGISTER'}
        </Fab>
        <Typography
          className={classes.toggleModeButton}
          variant="subtitle2"
          onClick={handleAuthTypeChange}
        >
          {state.authType === AuthType.LOGIN ? "Don't have an account?" : 'Go back'}
        </Typography>
      </div>
    );
  }

  const { authType } = state;
  return (
    <div className={classes.authPage}>
      {fetcher.login.ERROR && <Notification message={fetcher.login.ERROR.error} type="error" />}
      <form onSubmit={handleSubmit}>
        <Slide
          in={authType === AuthType.LOGIN}
          direction="up"
          timeout={{ enter: 400, exit: 0 }}
          mountOnEnter
          unmountOnExit
        >
          {renderForm()}
        </Slide>
        <Slide
          in={authType === AuthType.REGISTER}
          direction="up"
          timeout={{ enter: 400, exit: 0 }}
          mountOnEnter
          unmountOnExit
        >
          {renderForm()}
        </Slide>
      </form>
    </div>
  );
}

export default withTheme(AuthPage);
