import { useReducer } from 'react';
import { Action, Error as ErrorType } from 'types';
import { ErrorTypes } from 'common/consts';

interface ReducerState {
  [name: string]: FetchState;
}

interface FetchState {
  FETCHING: boolean;
  LOADED: boolean;
  ERROR: null | ErrorType;
  data: any;
}

interface Config {
  type: string;
  api: (data: Object) => Promise<Object>;
}

type Response = ErrorType | any;

const initialState = {
  FETCHING: false,
  LOADED: false,
  ERROR: null,
  data: null,
};

function initReducer(requestConfigs: Array<Config>) {
  return requestConfigs.reduce(
    (reducerAcc, config) => ({
      ...reducerAcc,
      [config.type]: initialState,
    }),
    {},
  );
}

function reducer(state: ReducerState, action: Action) {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          ...initialState,
          FETCHING: true,
        },
      };

    case 'LOADED':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          ...initialState,
          LOADED: true,
          data: action.payload.data,
        },
      };

    case 'ERROR':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          ...initialState,
          LOADED: true,
          ERROR: action.payload.error,
        },
      };

    default:
      throw new Error('Failed to change state in useFetch reducer');
  }
}

function useFetch(
  requestConfigs: Array<Config>,
): [ReducerState, ({ type, data }: { type: string; data: any }) => void] {
  const [state, dispatch] = useReducer(reducer, requestConfigs, initReducer);

  async function fetchRequest({ type, data }: { type: string; data: any }) {
    const matchingConfig = requestConfigs.find(config => config.type === type);

    if (!matchingConfig) return;

    dispatch({ type: 'FETCHING', payload: { type } });
    let response: Response = null;

    try {
      response = await matchingConfig.api(data);

      if (response.error) {
        dispatch({ type: 'ERROR', payload: { type, error: response.error } });
        return;
      }

      dispatch({ type: 'LOADED', payload: { type, data: response.data } });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: { type, error: { code: ErrorTypes.NETWORK_ERROR, error: error.message } },
      });
    }
  }

  return [state, fetchRequest];
}

export default useFetch;
