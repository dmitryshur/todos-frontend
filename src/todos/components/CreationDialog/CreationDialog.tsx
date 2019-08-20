import React, { useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import useStyles from './styles';

interface Props {
  open: boolean;
  todoId?: number;
  title?: string;
  body?: string;
  theme: Theme;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSave: (values: { title: string; body: string }) => void;
}

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function CreationDialog(props: Props) {
  const classes = useStyles(props);
  const [inputValues, setInputValues] = useState({
    title: props.title || '',
    body: props.body || '',
  });

  useEffect(() => {
    setInputValues({ title: props.title || '', body: props.body || '' });
  }, [props.todoId]);

  function handleInputChange(type: 'title' | 'body') {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setInputValues(prevState => ({ ...prevState, [type]: event.target.value }));
    };
  }

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setInputValues({ title: props.title || '', body: props.body || '' });

    props.onClose(event);
  }

  function handleSave() {
    if (props.onSave) {
      props.onSave(inputValues);
    }
  }

  return (
    <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit
          </Typography>
          <Button className={classes.saveButton} onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.dialogContent}>
        <TextField
          className={classes.titleInput}
          fullWidth
          label="Title"
          required
          value={inputValues.title}
          onChange={handleInputChange('title')}
        />
        <TextField
          multiline
          variant="outlined"
          rows={24}
          fullWidth
          label="Body"
          placeholder="Enter the todo you wish to save"
          value={inputValues.body}
          onChange={handleInputChange('body')}
        />
      </div>
    </Dialog>
  );
}

export default withTheme(CreationDialog);
