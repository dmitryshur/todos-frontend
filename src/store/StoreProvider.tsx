import React from 'react';
import useStore from 'common/hooks/useStore';
import rootReducer from './root-reducer';

export type ContextValue = { selector: (key: string) => any; dispatch: Function };

const StoreContext = React.createContext<ContextValue>({ selector: () => {}, dispatch: () => {} });

interface Props {
  children?: React.ReactNode;
}

function StoreProvider(props: Props) {
  const [state, dispatch] = useStore(rootReducer);

  function getState(key: string) {
    return state[key];
  }

  return (
    <StoreContext.Provider value={{ selector: getState, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export { StoreContext };
export default StoreProvider;
