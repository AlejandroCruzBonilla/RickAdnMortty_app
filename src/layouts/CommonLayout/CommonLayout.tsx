import type { FC } from 'react';
import { Footer, Header } from './components';
import { BaseLayout } from '../BaseLayout';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Heading } from '@/components/common/Heading';
import type { ICommonLayout } from './interfaces';
import type { IMenuItem } from '@/interfaces/common';

import styles from './CommonLayout.module.scss';

export const CommonLayout: FC<ICommonLayout> = ({
  children,
  breadcrumbs,
  heading,
	metaTags,
}) => {
  const mainMenu: IMenuItem[] = [
    {
      id: '1',
      title: 'Home',
      target: '_self',
      url: '/',
    },
    {
      id: '2',
      title: 'Characters',
      target: '_self',
      url: '/characters',
    },
    {
      id: '3',
      title: 'Episodes',
      target: '_self',
      url: '/episodes',
    },
    {
      id: '4',
      title: 'Locations',
      target: '_self',
      url: '/locations',
    },
  ];

  const breadcrumbHome = {
    label: 'Home',
    url: '/',
  };

  const parsedBreadcrumb = breadcrumbs?.map((breadcrumb, index) => ({
    template: () => (
      <Breadcrumb
        {...breadcrumb}
        customClass={index +1 === breadcrumbs.length ? 'text-primary' : ''}
      />
    ),
  }));

  return (
    <BaseLayout metaTags={metaTags}>
      <div className={styles.layout}>
        <div className={styles.layout__wrapper}>
          <Header mainMenu={mainMenu} />
          <main className={styles.layout__main}>
            {parsedBreadcrumb && parsedBreadcrumb.length && (
              <BreadCrumb model={parsedBreadcrumb} home={breadcrumbHome} />
            )}
            <Heading title={heading} />
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </BaseLayout>
  );
};
