import { createContext } from 'react';
import type{ IUIAppContext } from './interfaces';

export const UIAppContext = createContext({} as IUIAppContext);
