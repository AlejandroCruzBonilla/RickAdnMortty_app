import { type FC } from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import type { ICharacterList } from './interfaces';

export const CharacterList: FC<ICharacterList> = ({ items }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {items.map(({ id, name, image }) => (
        <Link key={id} href='/characters/[id]' as={`/characters/${id}`}>
          <Card
            id={id}
            title={name}
            image={{
              src: image.src,
              alt: image.alt,
              width: image.width,
              height: image.height,
            }}
          />
        </Link>
      ))}
    </div>
  );
};
