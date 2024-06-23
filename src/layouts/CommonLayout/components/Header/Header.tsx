import type { FC } from 'react';
import { Navbar } from '../Navbar';
import type { IHeader } from './interfaces';

import styles from './Header.module.scss';

export const Header: FC<IHeader> = ({ mainMenu }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Navbar menuItems={mainMenu} />
      </div>
    </header>
  );
};
