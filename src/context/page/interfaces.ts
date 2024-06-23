import type { ReactNode } from 'react';
import type { IMetatag } from '@/interfaces/common';

export interface IPageState {
  metaTags: IMetatag[];
}

export type IPageActionType =
  | {
      type: 'Page - metaTags';
      payload: { metaTags: IMetatag[] };
    };

export interface IPageProvider {
  children: ReactNode;
}

export interface IPageContext {
  metaTags: IMetatag[];
  setPageMetaTags: (metaTags: IMetatag[]) => void;
}
