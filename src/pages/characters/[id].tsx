import { useContext, useEffect, useMemo } from 'react';

import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import Image from 'next/image';
import classNames from 'classnames';

import { getAllCharacters, getCharacterById } from '@/httpRequest/characters';
import { parseCharacter } from '@/parsers/characters';

import { PageContext } from '@/context/page';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { EpisodeList } from '@/components/episodes/EpisodeList';
import { Location } from '@/components/locations/Location';

import type { IMetatag } from '@/interfaces/common';
import type { ICharacter } from '@/interfaces/characters';



const Character: NextPage<ICharacter> = ({
  id,
  episodes,
  gender,
  image,
  location,
  name,
  origin,
  species,
  status,
}) => {
	const { setPageMetaTags } = useContext(PageContext);

  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: `Character: ${name}` } },
    { tag: 'meta', attributes: { name: 'og:title', content: `Character: ${name}` } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: `Character: ${name}` } },
    { tag: 'meta', attributes: { name: 'description', content: `${name} character page` } },
    { tag: 'meta', attributes: { name: 'og:description', content: `${name} character page` } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: `${name} character page` } },
  ],[name]);

	useEffect(() => {
    setPageMetaTags(metaTags);
  }, [metaTags, setPageMetaTags]);


  const breadcrumbs = [
    { label: 'Characters', url: '/characters' },
    { label: name },
  ];

  return (
    <CommonLayout
      breadcrumbs={breadcrumbs}
      heading={`#${id} - ${name}`}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-2 md:gap-8 lg:gap-12'>
        <div className='col-span-2'>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className='aspect-square  rounded-md image-fit-cover'
          />
        </div>
        <div className='sm:col-span-2 lg:col-span-4 grid lg:grid-cols-2'>
          <div className='col-span-2 lg:col-span-1 grid grid-cols-2 lg:justify-items-start items-center'>
            <span>GENDER:&nbsp;</span>
            <span>{gender}</span>
          </div>
          <div className='col-span-2 lg:col-span-1 grid grid-cols-2 lg:justify-items-start items-center'>
            <span>SPECIES:&nbsp;</span>
            <span>{species}</span>
          </div>
          <div className='col-span-2 lg:col-span-1 grid grid-cols-2 lg:justify-items-start items-center'>
            <span>ORIGIN:&nbsp;</span>
            <Location {...origin} />
          </div>
          <div className='col-span-2 lg:col-span-1 grid grid-cols-2 lg:justify-items-start items-center'>
            <span>LOCATION:&nbsp;</span>
            <Location {...location} />
          </div>
          <div className='col-span-2 grid grid-cols-4 lg:justify-items-start items-center'>
            <span className='col-span-2 lg:col-span-1'>STATUS:&nbsp;</span>
            <span
              className={classNames(
                'col-span-2 lg:col-span-3 w-full flex justify-center items-center px-2 rounded-md',
                {
                  'bg-green-600': status === 'Alive',
                  'bg-red-800 text-font-light': status === 'Dead',
                  'bg-gray-600 text-font-light': status === 'unknown',
                }
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-8'>
				<h2 className='mb-4'>Episodes</h2>
        <EpisodeList items={episodes} />
      </div>
    </CommonLayout>
  );
};

export default Character;

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const { data } = await getAllCharacters();
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
): Promise<GetStaticPropsResult<ICharacter>> {
  const { params } = context;
  const id = Number(params && params.id ? params.id.toString() : '0');

  const { data } = await getCharacterById(id);

  return {
    props: {
      ...(await parseCharacter(data)),
    },
  };
}
