import type { IUIAppActionType, IUIAppState } from './interfaces';

export const uiAppReducer = (state: IUIAppState, action: IUIAppActionType): IUIAppState => {
  switch (action.type) {
    case 'UI - App Theme':
      return {
        ...state,
        appTheme: action.payload.appTheme,
      };

    default:
      return state;
  }
};
