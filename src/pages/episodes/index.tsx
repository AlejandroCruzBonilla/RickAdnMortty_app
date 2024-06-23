import type { GetStaticPropsResult, NextPage } from 'next';

import { getAllEpisodes, getEpisodesByPage } from '@/httpRequest/episodes';
import { parsePageEpisodes } from '@/parsers/episodes';

import { PageContext } from '@/context/page';
import { usePagination } from '@/hooks/usePagination';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { EpisodeList } from '@/components/episodes/EpisodeList';
import { PaginationButtons } from '@/components/common/PaginationButtons';

import type { IMetatag } from '@/interfaces/common';
import type {
  IEpisodeItem,
  IEpisodes,
  IPageEpisodes,
} from '@/interfaces/episodes';
import { useContext, useEffect, useMemo, useState } from 'react';


const Episodes: NextPage<IEpisodes> = ({ totalPages, pages }) => {
	const { setPageMetaTags } = useContext(PageContext);

  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: 'Episodes' } },
    { tag: 'meta', attributes: { name: 'og:title', content: 'Episodes' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: 'Episodes' } },
    { tag: 'meta', attributes: { name: 'description', content: 'List of Rick and Morty episodes' } },
    { tag: 'meta', attributes: { name: 'og:description', content: 'List of Rick and Morty episodes' } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: 'List of Rick and Morty episodes' } },
  ],[]);

	useEffect(() => {
    setPageMetaTags(metaTags);
  }, [metaTags, setPageMetaTags]);

  const {
    currentPage,
    onFirstPageHandler,
    onPrevPageHandler,
    onNextPageHandler,
    onLastPageHandler,
    onSetPageHandler,
  } = usePagination(totalPages);

  const [currentEpisodePage, setCurrentEpisodePage] = useState<IEpisodeItem[]>(
    []
  );

  useEffect(() => {
    setCurrentEpisodePage(pages[currentPage - 1].episodes);
  }, [currentPage, pages]);

  const breadcrumbs = [{ label: 'Episodes' }];
  return (
    <CommonLayout
      breadcrumbs={breadcrumbs}
      heading='Episodes'
    >
      <EpisodeList items={currentEpisodePage} />

      <div className='mt-4'>
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          onFirstPage={onFirstPageHandler}
          onPrevPage={onPrevPageHandler}
          onNextPage={onNextPageHandler}
          onLastPage={onLastPageHandler}
          onSetPage={onSetPageHandler}
        />
      </div>
    </CommonLayout>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<IEpisodes>
> {
  const { data } = await getAllEpisodes();

  const { info } = data;

  const totalPages = info && info.pages ? info.pages : 0;
  const totalItems = info && info.count ? info.count : 0;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const promises = pageNumbers.map(pageNumber => {
    return new Promise<IPageEpisodes>((resolve, reject) => {
      getEpisodesByPage(pageNumber)
        .then(({ data }) => {
          resolve(parsePageEpisodes(pageNumber, data));
        })
        .catch(reject);
    });
  });

  const pages: IPageEpisodes[] = await Promise.all(promises).catch(error => {
    console.log(error);
    return [];
  });

  return {
    props: {
      totalItems,
      totalPages,
      pages,
    },
  };
}

export default Episodes;
