import { useContext, useEffect, useMemo, useState } from 'react';
import type { GetStaticPropsResult, NextPage } from 'next';

import { getAllLocations, getLocationsByPage } from '@/httpRequest/locations';
import { parsePageLocations } from '@/parsers/locations';

import { usePagination } from '@/hooks/usePagination';

import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import { PaginationButtons } from '@/components/common/PaginationButtons';

import { LocationList } from '@/components/locations/LocationList';

import type { IMetatag } from '@/interfaces/common';
import type {
  ILocationItem,
  ILocations,
  IPageLocations,
} from '@/interfaces/locations';

import { PageContext } from '@/context/page';

const Locations: NextPage<ILocations> = ({ totalPages, pages }) => {
	const { setPageMetaTags } = useContext(PageContext);

  const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: 'Locations' } },
    { tag: 'meta', attributes: { name: 'og:title', content: 'Locations' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: 'Locations' } },
    { tag: 'meta', attributes: { name: 'description', content: 'List of Rick and Morty locations' } },
    { tag: 'meta', attributes: { name: 'og:description', content: 'List of Rick and Morty locations' } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: 'List of Rick and Morty locations' } },
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

  const [currentLocationPage, setCurrentLocationPage] = useState<
    ILocationItem[]
  >([]);

  useEffect(() => {
    setCurrentLocationPage(pages[currentPage - 1].locations);
  }, [currentPage, pages]);

  const breadcrumbs = [{ label: 'Locations' }];

  return (
    <CommonLayout
      breadcrumbs={breadcrumbs}
      heading='Locations'
    >
      <LocationList items={currentLocationPage} />

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
  GetStaticPropsResult<ILocations>
> {
  const { data } = await getAllLocations();

  const { info } = data;

  const totalPages = info && info.pages ? info.pages : 0;
  const totalItems = info && info.count ? info.count : 0;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const promises = pageNumbers.map(pageNumber => {
    return new Promise<IPageLocations>((resolve, reject) => {
      getLocationsByPage(pageNumber)
        .then(({ data }) => {
          resolve(parsePageLocations(pageNumber, data));
        })
        .catch(reject);
    });
  });

  const pages: IPageLocations[] = await Promise.all(promises).catch(error => {
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

export default Locations;
