import { type FC } from 'react';
import Head from 'next/head';

import type { IBaseLayout } from './interfaces';

export const BaseLayout: FC<IBaseLayout> = ({ children, metaTags }) => {


  const title = metaTags.find(mTag => mTag.attributes.name === 'title');
  const mTags = metaTags.filter(mTag => mTag.attributes.name !== 'title');

  return (
    <>
      <Head>
        {title && <title>{title.attributes.content}</title>}

        {mTags.map(({ tag, attributes }, index) => {
          const Tag = tag;
          return <Tag {...attributes} key={index} />;
        })}
        <link rel='icon' type="image/png" href='/favicon.png' />
        <meta
          property='og:image'
          content='https://cms.alex139139.com/sites/default/files/images/rickandmorty.jpg'
        />
        <meta
          name='twitter:image'
          content='https://cms.alex139139.com/sites/default/files/images/rickandmorty.jpg'
        />
      </Head>
      {children}
    </>
  );
};
