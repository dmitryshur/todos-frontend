import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  success: {
    backgroundColor: green[600],
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  /** Additional class to apply to the notification */
  className?: string;
  /** The message to be displated */
  message: string;
  /** The type of the notification */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Callback to fire when the notification disappears */
  onClose?: () => void;
}

function Notification(props: Props) {
  const { message, onClose, type } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timerID = window.setTimeout(hideNotification, 4000);

    return () => {
      window.clearTimeout(timerID);
    };
  }, []);

  function hideNotification() {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={onClose}
    >
      <SnackbarContent
        className={classnames({
          [classes.error]: type === 'error',
          [classes.warning]: type === 'warning',
          [classes.success]: type === 'success',
          [classes.info]: type === 'info',
        })}
        message={
          <span className={classes.messageContainer}>
            {type === 'error' && <ErrorIcon className={classes.icon} />}
            {type === 'warning' && <WarningIcon className={classes.icon} />}
            {type === 'success' && <CheckCircleIcon className={classes.icon} />}
            {type === 'info' && <InfoIcon className={classes.icon} />}
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={hideNotification}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default Notification;
