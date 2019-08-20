import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.dark,
  },
  closeIcon: {
    color: theme.palette.primary.light,
  },
  title: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.light,
    flex: 1,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
  },
  titleInput: {
    marginBottom: theme.spacing(8),
  },
  saveButton: {
    color: theme.palette.primary.light,
  }
}));

export default useStyles;
