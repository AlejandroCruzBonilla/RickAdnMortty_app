import type { ReactNode } from 'react';
import type { IBreadCrumbItem } from '@/interfaces/common';


export interface ICommonLayout {
  children: ReactNode;
	breadcrumbs?: IBreadCrumbItem[];
	heading: string;
}
