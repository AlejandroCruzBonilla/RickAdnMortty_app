import { useEffect, useMemo, useState } from 'react';
import type { GetStaticPropsResult, NextPage } from 'next';
import {
  getAllCharacters,
  getCharactersByPage,
} from '@/httpRequest/characters';
import { parsePageCharacters } from '@/parsers/characters';

import { usePagination } from '@/hooks/usePagination';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { CharacterList } from '@/components/characters/CharacterList';
import { PaginationButtons } from '@/components/common/PaginationButtons';

import type { IMetatag } from '@/interfaces/common';
import type {
  ICharacterItem,
  ICharacters,
  IPageCharacters,
} from '@/interfaces/characters';

const Characters: NextPage<ICharacters> = ({ totalPages, pages }) => {
  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: 'Characters' } },
    { tag: 'meta', attributes: { name: 'og:title', content: 'Characters' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: 'Characters' } },
    { tag: 'meta', attributes: { name: 'description', content: 'List of Rick and Morty characters' } },
    { tag: 'meta', attributes: { name: 'og:description', content: 'List of Rick and Morty characters' } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: 'List of Rick and Morty characters' } },
  ],[]);

  const {
    currentPage,
    onFirstPageHandler,
    onPrevPageHandler,
    onNextPageHandler,
    onLastPageHandler,
    onSetPageHandler,
  } = usePagination(totalPages);

  const [currentCharactersPage, setCurrentCharactersPage] = useState<
    ICharacterItem[]
  >([]);

  useEffect(() => {
    setCurrentCharactersPage(pages[currentPage - 1].characters);
  }, [currentPage, pages]);

  const breadcrumbs = [{ label: 'Characters' }];

  return (
    <CommonLayout
			metaTags={metaTags}
      breadcrumbs={breadcrumbs}
      heading='Characters'
    >
      <CharacterList items={currentCharactersPage} />

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

export default Characters;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<ICharacters>
> {
  const { data } = await getAllCharacters();

  const { info } = data;

  const totalPages = info && info.pages ? info.pages : 0;
  const totalItems = info && info.count ? info.count : 0;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const promises = pageNumbers.map(pageNumber => {
    return new Promise<IPageCharacters>((resolve, reject) => {
      getCharactersByPage(pageNumber)
        .then(({ data }) => {
          resolve(parsePageCharacters(pageNumber, data));
        })
        .catch(reject);
    });
  });

  const pages: IPageCharacters[] = await Promise.all(promises).catch(error => {
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
