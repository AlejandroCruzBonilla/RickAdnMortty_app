import type { IPageActionType, IPageState } from './interfaces';

export const pageReducer = (state: IPageState, action: IPageActionType): IPageState => {
  switch (action.type) {
    case 'Page - metaTags':
      return {
        ...state,
        metaTags: action.payload.metaTags,
      };

    default:
      return state;
  }
};
