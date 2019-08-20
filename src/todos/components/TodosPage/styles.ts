import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
  },
  appBar: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.light,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  icon: {
    color: theme.palette.primary.light,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.light,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.light,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    flexGrow: 1,
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  actionsContainer: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  action: {
    marginTop: theme.spacing(2),
  },
  addTodo: {
    order: 4,
  },
  deleteTodo: {
    backgroundColor: theme.palette.error.main,
    order: 2,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  doneTodo: {
    order: 3,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  cancel: {
    order: 1,
  },
  emptyListContainer: {
    color: theme.palette.primary.light,
    fontSize: '24px',
  },
}));

export default useStyles;
