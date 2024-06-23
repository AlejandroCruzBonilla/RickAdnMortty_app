import { type FC, useRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Menubar } from 'primereact/menubar';
import { Brand } from '@/components/common/Brand';
import { SwitchTheme } from '@/components/common/SwitchTheme';
import AngleRight from '@/components/icons/AngleRight';

import type { MenuItem } from 'primereact/menuitem';

import type { IMenuItem } from '@/interfaces/common';
import type { INavBar } from './interfaces';

import styles from './Navbar.module.scss';

export const Navbar: FC<INavBar> = ({ menuItems }) => {
  const router = useRouter();
  const menu = useRef(null);

  const ItemTemplate = (item: MenuItem) => (
    <>
      {item.url ? (
        <NextLink
          title={item.label}
          href={item.url}
          target={item.target}
          className={classNames(styles.navbar__action, {
            [styles.navbar__action_active]: router.asPath === item.url,
          })}
        >
          <span>{item.label}</span>
        </NextLink>
      ) : (
        <a title={item.label} href='#' className={styles.navbar__action}>
          <span>{item.label}</span>
          {item.items && (
            <AngleRight className='fill-font-dark dark:fill-font-light w-4 h-4' />
          )}
        </a>
      )}
    </>
  );

  const parseMenuItem = (items: IMenuItem[]): MenuItem[] => {
    const menuItems: MenuItem[] = items.map(item => {
      const menuItem: MenuItem = {
        label: item.title,
        url: item.url,
        target: item.target,
        id: item.id,
        template: ItemTemplate,
      };
      if (item.items) {
        menuItem.items = parseMenuItem(item.items);
      }
      return menuItem;
    });
    return menuItems;
  };

  const items: MenuItem[] = parseMenuItem(menuItems);

  return (
    <Menubar
      ref={menu}
      model={items}
      start={<Brand name slogan />}
      end={<SwitchTheme />}
    />
  );
};
