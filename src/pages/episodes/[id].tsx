import { useContext, useEffect, useMemo } from 'react';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';

import { getAllEpisodes, getEpisodeById } from '@/httpRequest/episodes';
import { parseEpisode } from '@/parsers/episodes';

import { PageContext } from '@/context/page';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { CharacterList } from '@/components/characters/CharacterList';

import type { IMetatag } from '@/interfaces/common';
import type { IEpisode } from '@/interfaces/episodes';



const Episode: NextPage<IEpisode> = ({ id, airDate, characters, name }) => {
	const { setPageMetaTags } = useContext(PageContext);

  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: `Episode: ${name}` } },
    { tag: 'meta', attributes: { name: 'og:title', content: `Episode: ${name}` } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: `Episode: ${name}` } },
    { tag: 'meta', attributes: { name: 'description', content: `${name} episode page` } },
    { tag: 'meta', attributes: { name: 'og:description', content: `${name} episode page` } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: `${name} episode page` } },
  ],[name]);

	useEffect(() => {
    setPageMetaTags(metaTags);
  }, [metaTags, setPageMetaTags]);

  const breadcrumbs = [
    { label: 'Episodes', url: '/episodes' },
    { label: name },
  ];

  return (
    <CommonLayout
      breadcrumbs={breadcrumbs}
      heading={`#${id} - ${name}`}
    >
      <div>
        <p>
          This episode was aired on: <span>{airDate}</span>
        </p>
      </div>

      <div className='mt-8'>
				<h2 className='mb-4'>Characters</h2>
				<p className='mb-4'>Characters that appear in this episode</p>
        <CharacterList items={characters} />
      </div>
    </CommonLayout>
  );
};

export default Episode;

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const { data } = await getAllEpisodes();
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
): Promise<GetStaticPropsResult<IEpisode>> {
  const { params } = context;
  const id = Number(params && params.id ? params.id.toString() : '0');

  const { data } = await getEpisodeById(id);

  return {
    props: {
      ...(await parseEpisode(data)),
    },
  };
}
