import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  authPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(#141E30, #243B55)',
    overflow: 'hidden',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  textField: {
    width: 300,
    color: theme.palette.primary.light,
  },
  inputRoot: {
    color: theme.palette.primary.light,
  },
  inputLabel: {
    color: theme.palette.primary.light,
  },
  inputUnderline: {
    borderBottom: `1px solid ${theme.palette.primary.light}44`,
  },
  submitButton: {
    fontWeight: 500,
    color: theme.palette.primary.light,
    marginTop: 140,
  },
  toggleModeButton: {
    color: theme.palette.primary.light,
    marginTop: 32,
    textAlign: 'center',
    cursor: 'pointer',
  },
}));

export default useStyles;
