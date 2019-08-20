import { useReducer } from 'react';
import { RootReducer } from 'store/root-reducer';

function useStore(rootReducer: RootReducer) {
  const initialState = rootReducer(undefined, { type: undefined });

  return useReducer(rootReducer, initialState);
}

export default useStore;
