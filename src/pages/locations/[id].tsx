import { useMemo } from 'react';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';

import { getAllLocations, getLocationById } from '@/httpRequest/locations';
import { parseLocation } from '@/parsers/locations';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { CharacterList } from '@/components/characters/CharacterList';

import type { IMetatag } from '@/interfaces/common';
import type { ILocation } from '@/interfaces/locations';

const Episode: NextPage<ILocation> = ({
  id,
  name,
  dimension,
  type,
  residents,
}) => {
  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: `Location: ${name}` } },
    { tag: 'title', attributes: { name: 'og:title', content: `Location: ${name}` } },
    { tag: 'title', attributes: { name: 'twitter:title', content: `Location: ${name}` } },
    { tag: 'meta', attributes: { name: 'description', content: `${name} location page` } },
    { tag: 'meta', attributes: { name: 'og:description', content: `${name} location page` } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: `${name} location page` } },
  ],[name]);

  const breadcrumbs = [
    { label: 'Locations', url: '/locations' },
    { label: name },
  ];

  return (
    <CommonLayout
			metaTags={metaTags}
      breadcrumbs={breadcrumbs}
      heading={`#${id} - ${name}`}
    >
      <div className='grid gap-4'>
        <div className='flex gap-4'>
          <span>Name:</span>
          <span className='bg-slate-500 text-font-light px-2 rounded-md'>
            {dimension}
          </span>
        </div>
        <div className='flex gap-4'>
          <span>Type:</span>
          <span className='bg-teal-500 text-font-light px-2 rounded-md'>
            {type}
          </span>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='mb-4'>Residents</h2>
        {residents.length ? (
          <>
            <p className='mb-4'>Characters that belong to this Location</p>
            <CharacterList items={residents} />
          </>
        ) : (
          <span>Without known residents</span>
        )}
      </div>
    </CommonLayout>
  );
};

export default Episode;

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const { data } = await getAllLocations();
    const { info } = data;

    const totalItems = info && info.count ? info.count : 0;

    const characterIds = Array.from(
      { length: totalItems },
      (_, index) => index + 1
    );

    const paths = characterIds.map(id => ({
      params: {
        id: id.toString(),
      },
    }));

    return {
      paths,
      fallback: false,
    };
  };

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ILocation>> {
  const { params } = context;
  const id = Number(params && params.id ? params.id.toString() : '0');

  const { data } = await getLocationById(id);

  return {
    props: {
      ...(await parseLocation(data)),
    },
  };
}
