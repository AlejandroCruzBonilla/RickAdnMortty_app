import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { IBrand } from './interfaces';

import styles from './Brand.module.scss';

export const Brand: FC<IBrand> = ({ logo, name, slogan }) => {


  return (
    <div className={styles.brand}>
      {logo && (
        <Link href='/' className={styles.brand__logo}>
          <Image
            src=''
            alt=''
            title=''
            width='100'
            height='50'
						priority
						loading='eager'
						placeholder='blur'
          />
        </Link>
      )}

			<div className={styles.brand__wrapper}>

				{name && (
					<div className={styles.brand__name}>
						<Link href='/'>Rick & Morty App</Link>
					</div>
				)}
				{slogan && (
					<div className={styles.brand__slogan}>Alex139139</div>
				)} 
			</div>
    </div>
  );
};
