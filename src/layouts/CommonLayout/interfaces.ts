import type { ReactNode } from 'react';
import type { IBreadCrumbItem, IMetatag } from '@/interfaces/common';


export interface ICommonLayout {
  children: ReactNode;
  metaTags: IMetatag[];
	breadcrumbs?: IBreadCrumbItem[];
	heading: string;
}
