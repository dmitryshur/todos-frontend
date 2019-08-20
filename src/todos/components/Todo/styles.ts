import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { WhiteSpaceProperty } from 'csstype';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: 600,
    height: 150,
    padding: `${theme.spacing(4)}px 0`,
    margin: `${theme.spacing(1)}px 0`,
    cursor: 'pointer',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'scale(1)',

    '&:hover': {
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      transform: 'scale(1.05)',
    },
  },

  paperContent: {
    display: 'flex',
    alignItems: 'baseline',
    padding: `0 ${theme.spacing(1)}px`,
  },

  checkboxContainer: {
    width: '15%',
    top: 4,
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    opacity: 1,
  },

  paperText: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
  },

  body: {
    whiteSpace: 'nowrap' as WhiteSpaceProperty,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  time: {
    textAlign: 'center',
    fontSize: '14px',
  },

  hide: {
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    opacity: 0,
    pointerEvents: 'none',
  },
}));

export default useStyles;
