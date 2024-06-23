import { type FC } from 'react';
import Image from 'next/image';
import { Brand } from '@/components/common/Brand';
import Linkedin from '@/components/icons/Linkedin';

import type { IFooter } from './interfaces';

import styles from './Footer.module.scss';
import GitHub from '@/components/icons/GitHub';


export const Footer: FC<IFooter> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider}>
        <hr />
      </div>
      <div className={styles.footer__wrapper}>
        <Brand name />
        <nav role='navigation'>
          <div className='flex gap-4'>
            <a
              href='https://www.linkedin.com/in/alejandro-cruz-bonilla/'
              target='_blank'
            >
              <Linkedin width='35' height='35' />
            </a>
            <a href='https://github.com/AlejandroCruzBonilla' target='_blank'>
              <GitHub width='35' height='35' />
            </a>
            <a href='https://alex139139.com' target='_blank'>
              <Image src='/alex139139.png' width='35' height='35' alt='Site of alex139139'/>
            </a>
          </div>

        </nav>
      </div>
    </footer>
  );
};
