import { type FC } from 'react';
import Link from 'next/link';
import type { ILocationItem } from '@/interfaces/locations';

export const Location: FC<ILocationItem> = ({ id, name }) => {
  return (
    <>
      {id ? (
        <Link
          href='/locations/[id]'
          as={`/locations/${id}`}
          className='text-primary hover:text-font cursor-pointer'
        >
          <span>{name}</span>
        </Link>
      ) : (
        <span className='text-font'>{name}</span>
      )}
    </>
  );
};
