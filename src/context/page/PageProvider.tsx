import { type FC, useCallback, useReducer } from 'react';
import { PageContext, pageReducer } from '@/context/page';
import type { IPageState, IPageProvider } from './interfaces';

import type { IMetatag } from '@/interfaces/common';

const UI_INITIAL_STATE: IPageState = {
  metaTags: [],
};

export const PageProvider: FC<IPageProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(pageReducer, UI_INITIAL_STATE);

  const setPageMetaTags = useCallback(
    (metaTags: IMetatag[]) => {
      dispatch({
        type: 'Page - metaTags',
        payload: { metaTags },
      });
    },
    [dispatch]
  );

  return (
    <PageContext.Provider
      value={{
        ...state,

        // Methods
        setPageMetaTags,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
