import { type FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import type { IBreadcrumb } from './interfaces';

export const Breadcrumb: FC<IBreadcrumb> = ({ label, url, customClass }) => {
  return (
    <>
      {url ? (
        <Link
          href={url}
          className={classNames('hover:text-primary', {
            [`${customClass}`]: !!customClass,
          })}
        >
          <span>{label}</span>
        </Link>
      ) : (
        <span
          className={classNames('hover:text-primary', {
            [`${customClass}`]: !!customClass,
          })}
        >
          {label}
        </span>
      )}
    </>
  );
};
