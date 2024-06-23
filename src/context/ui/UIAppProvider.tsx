import { type FC, useCallback, useReducer } from 'react';
import { UIAppContext, uiAppReducer } from '@/context/ui';
import type {
  IUIAppState,
  IUIAppProvider,
  IUIAppTheme,
} from './interfaces';

const UI_INITIAL_STATE: IUIAppState = {
  appTheme: 'default',
};

export const UIAppProvider: FC<IUIAppProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(uiAppReducer, UI_INITIAL_STATE);

  const setAppTheme = useCallback(
    (appTheme: IUIAppTheme) => {
      dispatch({
        type: 'UI - App Theme',
        payload: { appTheme },
      });
    },
    [dispatch]
  );

  return (
    <UIAppContext.Provider
      value={{
        ...state,

        // Methods
        setAppTheme,
      }}
    >
      {children}
    </UIAppContext.Provider>
  );
};
