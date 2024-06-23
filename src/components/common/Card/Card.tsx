import type { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import type { ICard } from './interfaces';
import styles from './Card.module.scss';

export const Card: FC<ICard> = ({ image, title }) => {
  return (
    <article className={styles.card}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
				priority
        className={classNames(
          'aspect-square  rounded-md image-fit-cover',
          styles.card__image
        )}
      />

      <div className={styles.card__text}>
        <h2 className={styles.card__title}>{title}</h2>
      </div>
    </article>
  );
};
