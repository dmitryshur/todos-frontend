import React, { ChangeEvent, useContext, useEffect, useReducer } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { withTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import AddIcon from '@material-ui/icons/Add';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import Notification from 'common/components/Notification/Notification';
import Todo, { TodoType } from 'todos/components/Todo';
import CreationDialog from 'todos/components/CreationDialog/CreationDialog';
import useFetch from 'common/hooks/useFetch';
import apiData from 'todos/api/api-todos';
import { ContextValue, StoreContext } from 'store/StoreProvider';
import { Action } from 'types';
import { createTodo, editTodo, deleteTodo, loadTodos } from './TodosPageStore';
import useStyles from './styles';

interface Props {
  theme: Theme;
}

function sortByEditDate(todos: Array<TodoType>) {
  return [...todos].sort((firstDate, secondDate) =>
    moment.utc(moment(secondDate.lastEditTime)).diff(moment.utc(moment(firstDate.lastEditTime))),
  );
}

const initialState = {
  drawerOpen: false,
  openedTodo: undefined,
  checkedTodos: [],
  error: {
    type: undefined,
    message: '',
  },
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };

    case 'SET_OPEN_TODO':
      return { ...state, openedTodo: action.payload };

    case 'SET_CHECKED_TODOS':
      return { ...state, checkedTodos: action.payload };

    case 'ERROR':
      return { ...state, error: action.payload };

    case 'REMOVE_CHECKED':
      return {
        ...state,
        checkedTodos: state.checkedTodos.filter(({ id }) => id !== action.payload),
      };

    default:
      return state;
  }
}

function TodosPage(props: Props) {
  const classes = useStyles(props);
  const [store, localDispatch] = useReducer(reducer, initialState);
  const [fetcher, setFetcher] = useFetch(apiData);
  const { selector, dispatch: globalDispatch } = useContext<ContextValue>(StoreContext);

  // Initial data fetch
  useEffect(() => {
    setFetcher({ type: 'get', data: { userId: 1 } });
  }, []);

  // Get request progress
  useEffect(() => {
    if (!fetcher.get.LOADED || fetcher.get.ERROR) return;

    globalDispatch(loadTodos(fetcher.get.data.todos));
  }, [fetcher.get]);

  // Create request progress
  useEffect(() => {
    if (!fetcher.create.LOADED || fetcher.create.ERROR) return;

    async function changeStore() {
      const { id, title, body, creation_time: creationTime } = fetcher.create.data;
      const createdTodo: TodoType = {
        id,
        title,
        body,
        completed: false,
        lastEditTime: creationTime,
      };

      await globalDispatch(createTodo(createdTodo));
    }

    changeStore().then(() => {
      localDispatch({ type: 'SET_OPEN_TODO', payload: undefined });
    });
  }, [fetcher.create]);

  // Edit request progress
  useEffect(() => {
    if (!fetcher.edit.LOADED || fetcher.edit.ERROR) return;

    async function changeStore() {
      const { id, title, body, creation_time: creationTime, done: completed } = fetcher.edit.data;
      const editedTodo: TodoType = {
        id,
        title,
        body,
        completed,
        lastEditTime: creationTime,
      };

      await globalDispatch(editTodo(editedTodo));
    }

    changeStore().then(() => {
      localDispatch({ type: 'SET_OPEN_TODO', payload: undefined });
    });
  }, [fetcher.edit]);

  useEffect(() => {
    if (!fetcher.delete.LOADED || fetcher.delete.ERROR) return;

    const { id } = fetcher.delete.data;

    globalDispatch(deleteTodo(id));
    localDispatch({ type: 'REMOVE_CHECKED', payload: id });
  }, [fetcher.delete]);

  function handleToggleDrawer() {
    localDispatch({ type: 'TOGGLE_DRAWER' });
  }

  function handleClick(id: number) {
    localDispatch({ type: 'SET_OPEN_TODO', payload: id });
  }

  function handleLongClick(id: number) {
    localDispatch({ type: 'SET_CHECKED_TODOS', payload: [id] });
  }

  function handleCheckboxChange(id: number) {
    return (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newCheckedTodos = checked
        ? [...store.checkedTodos, id]
        : store.checkedTodos.filter((todoId: number) => todoId !== id);

      localDispatch({ type: 'SET_CHECKED_TODOS', payload: newCheckedTodos });
    };
  }

  function handleCancelPress() {
    localDispatch({ type: 'SET_CHECKED_TODOS', payload: [] });
  }

  function handleEditTodo() {
    localDispatch({ type: 'SET_OPEN_TODO', payload: 0 });
  }

  function handleCreationDialogClose(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    localDispatch({ type: 'SET_OPEN_TODO', payload: undefined });
  }

  function handleTodoSave(values: { title: string; body: string }) {
    const { todos } = selector('TodosPage');

    if (values.title.length === 0) {
      localDispatch({
        type: 'ERROR',
        payload: { type: 'warning', message: 'The title can not be empty' },
      });
      return;
    }

    if (store.openedTodo === 0) {
      setFetcher({ type: 'create', data: { userId: 1, title: values.title, body: values.body } });
      return;
    }

    const currentTodo = todos.find(({ id }: { id: number }) => id === store.openedTodo);
    if (!currentTodo) return;

    setFetcher({
      type: 'edit',
      data: { todoId: currentTodo.id, userId: 1, title: values.title, body: values.body },
    });
  }

  function handleDelete() {
    store.checkedTodos.forEach((id: number) => {
      setFetcher({ type: 'delete', data: { todo: id, userId: 1 } });
    });
  }

  function renderAppbar() {
    return (
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: store.drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            className={classnames(classes.menuButton, store.drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }

  function renderDrawer() {
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={store.drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleToggleDrawer}>
            <ChevronLeftIcon className={classes.icon} />
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { text: 'List', icon: <ListIcon className={classes.icon} /> },
            { text: 'Archive', icon: <ArchiveIcon className={classes.icon} /> },
          ].map(item => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }

  function renderActions() {
    return (
      <div className={classes.actionsContainer}>
        <Tooltip title="Add todo">
          <Fab
            className={classnames(classes.action, classes.addTodo)}
            color="primary"
            onClick={handleEditTodo}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        {store.checkedTodos.length > 0 && (
          <>
            <Tooltip title="Delete selected todos">
              <Fab
                className={classnames(classes.action, classes.deleteTodo)}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Mark as completed">
              <Fab className={classnames(classes.action, classes.doneTodo)}>
                <DoneAllIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Cancel">
              <Fab
                className={classnames(classes.action, classes.cancel)}
                onClick={handleCancelPress}
              >
                <CancelIcon />
              </Fab>
            </Tooltip>
          </>
        )}
      </div>
    );
  }

  function renderCreationDialog() {
    const { todos } = selector('TodosPage');
    const matchingTodo = store.openedTodo
      ? todos.find(({ id }: { id: number }) => id === store.openedTodo)
      : undefined;
    const todoTitle = matchingTodo ? matchingTodo.title : undefined;
    const todoBody = matchingTodo ? matchingTodo.body : undefined;

    return (
      <CreationDialog
        open={store.openedTodo !== undefined}
        todoId={store.openedTodo}
        title={todoTitle}
        body={todoBody}
        onClose={handleCreationDialogClose}
        onSave={handleTodoSave}
      />
    );
  }

  function renderEmptyList() {
    return <div className={classes.emptyListContainer}>Welcome! your list is currently empty</div>;
  }

  function renderContent() {
    const { todos } = selector('TodosPage');
    const isFetching = fetcher.get.FETCHING;

    return (
      <main className={classnames(classes.content, { [classes.contentShift]: store.drawerOpen })}>
        {isFetching && <CircularProgress />}
        {todos.length > 0 &&
          sortByEditDate(todos).map((todo: TodoType) => (
            <Todo
              id={todo.id}
              key={todo.id}
              title={todo.title}
              body={todo.body}
              lastEditTime={moment(todo.lastEditTime)}
              showCheckbox={store.checkedTodos.length > 0}
              checked={store.checkedTodos.includes(todo.id)}
              onClick={handleClick}
              onLongClick={handleLongClick}
              onCheckboxChange={handleCheckboxChange(todo.id)}
            />
          ))}
        {!isFetching && todos.length === 0 && renderEmptyList()}
      </main>
    );
  }

  return (
    <div className={classes.root}>
      {fetcher.get.ERROR && <Notification message={fetcher.get.ERROR.error} type="error" />}
      {fetcher.create.ERROR && <Notification message={fetcher.create.ERROR.error} type="error" />}
      {fetcher.edit.ERROR && <Notification message={fetcher.edit.ERROR.error} type="error" />}
      {fetcher.delete.ERROR && <Notification message={fetcher.delete.ERROR.error} type="error" />}
      {store.error.type && <Notification message={store.error.message} type={store.error.type} />}
      {renderAppbar()}
      {renderDrawer()}
      {renderContent()}
      {renderActions()}
      {renderCreationDialog()}
    </div>
  );
}

export default withTheme(TodosPage);
