import TodosPageReducer from 'todos/components/TodosPage/TodosPageStore';
import { Action } from 'types';

type Reducers = { [key: string]: Function };
export type RootReducer = (
  state: { [key: string]: any } | undefined,
  action: Action,
) => { [key: string]: any };

function getInitialState(reducers: Reducers) {
  return Object.keys(reducers).reduce((acc, reducer) => {
    const slice = reducers[reducer](undefined, { type: undefined });

    return { ...acc, [reducer]: slice };
  }, {});
}

function combineReducers(reducers: Reducers) {
  const initialState: { [key: string]: any } = getInitialState(reducers);

  return (state = initialState, action: Action) =>
    Object.keys(reducers).reduce((acc, reducer) => {
      const slice = reducers[reducer](state[reducer], action);

      return { ...acc, [reducer]: slice };
    }, state);
}

const rootReducer: RootReducer = combineReducers({
  TodosPage: TodosPageReducer,
});

export default rootReducer;
