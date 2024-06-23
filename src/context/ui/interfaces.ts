import type { ReactNode } from 'react';

export interface IUIAppState {
  appTheme: IUIAppTheme;
}

export type IUIAppActionType =
  | {
      type: 'UI - App Theme';
      payload: { appTheme: IUIAppTheme };
    };

export interface IUIAppProvider {
  children: ReactNode;
}

export interface IUIAppContext {
  appTheme: IUIAppTheme;
  setAppTheme: (appTheme: IUIAppTheme) => void;
}

export type IUIAppTheme = 'dark' | 'light' | 'default';
