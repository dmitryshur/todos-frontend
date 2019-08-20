import { Todo } from 'todos/components/Todo/types';
import { Action } from 'types';

const initialState = { todos: [] };

const CREATE = 'todos/TodosPage/CREATE';
const DELETE = 'todos/TodosPage/DELETE';
const LOAD = 'todos/TodosPage/LOAD';
const EDIT = 'todos/TodosPage/Edit';

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case DELETE:
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== action.payload),
      };

    case LOAD:
      return {
        todos: action.payload.map(
          ({
            id,
            title,
            body,
            done,
            creation_time: creationTime,
          }: {
            id: number;
            title: string;
            body: string;
            done: boolean;
            creation_time: string;
          }) => ({
            id,
            title,
            body,
            completed: done,
            lastEditTime: creationTime,
          }),
        ),
      };

    case EDIT:
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== action.payload.id).concat(action.payload),
      };

    default:
      return state;
  }
}

function createTodo(todo: Todo) {
  return { type: CREATE, payload: todo };
}

function deleteTodo(todoId: number) {
  return { type: DELETE, payload: todoId };
}

function loadTodos(todos: Array<Todo>) {
  return { type: LOAD, payload: todos };
}

function editTodo(todo: Todo) {
  return { type: EDIT, payload: todo };
}

export default reducer;
export { createTodo, deleteTodo, loadTodos, editTodo };
