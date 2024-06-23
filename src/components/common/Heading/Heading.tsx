import type { FC } from 'react';
import type { IHeading } from './interfaces';

import styles from './Heading.module.scss';

export const Heading: FC<IHeading> = ({ title }) => {
  return (
    <div className={styles.heading}>
      <div className={styles.heading__wrapper}>
        <div className={styles.heading__content}>
          <h1 className={styles.heading__text}>{title}</h1>
        </div>
      </div>
    </div>
  );
};
