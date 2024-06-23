import type { ReactNode } from 'react';
import type { IMetatag } from '@/interfaces/common';

export interface IBaseLayout {
  children: ReactNode;
  metaTags: IMetatag[];
}
