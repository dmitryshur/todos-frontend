import React, { useRef } from 'react';
import classnames from 'classnames';
import { Moment } from 'moment';
import { withTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

interface Props {
  id: number;
  title: string;
  body?: string;
  lastEditTime: Moment;
  showCheckbox: boolean;
  checked: boolean;
  theme: Theme;
  onClick: (id: number) => void;
  onLongClick: (id: number) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

function Todo(props: Props) {
  const classes = useStyles(props);
  const pressTimer = useRef(0);
  const clickTime = useRef<number | undefined>(undefined);

  function handlePressStart() {
    clickTime.current = Date.now();
    pressTimer.current = window.setTimeout(() => {
      clickTime.current = undefined;
      props.onLongClick(props.id);
    }, 500);
  }

  function handlePressEnd() {
    window.clearInterval(pressTimer.current);

    if (clickTime.current && !props.showCheckbox) {
      props.onClick(props.id);
    }
  }

  return (
    <Paper
      className={classes.paper}
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchEnd={handlePressEnd}
    >
      <div className={classes.paperContent}>
        <div
          className={classnames(classes.checkboxContainer, { [classes.hide]: !props.showCheckbox })}
        >
          <Checkbox checked={props.checked} onChange={props.onCheckboxChange} />
        </div>
        <div className={classes.paperText}>
          <Typography variant="h6">{props.title}</Typography>
          <Typography className={classes.body} variant="subtitle1">
            {props.body}
          </Typography>
        </div>
        <Typography className={classes.time} variant="subtitle1">
          {props.lastEditTime.fromNow()}
        </Typography>
      </div>
    </Paper>
  );
}

export default withTheme(Todo);
