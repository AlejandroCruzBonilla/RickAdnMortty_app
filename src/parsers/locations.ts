import type { Info, Location } from 'rickmortyapi';
import { getCharactersById } from '@/httpRequest/characters';
import { parseCharacterItem } from './characters';
import { getLastUrlSegment, getQueryParamFromUrl } from '@/helpers';
import type {
  ILocation,
  ILocationItem,
  IPageLocations,
} from '@/interfaces/locations';

export const parsePageLocations = (
  currentPage: number,
  locationData: Info<Location[]>
): IPageLocations => {
  const { info, results } = locationData;

  const prevPage =
    info && info.prev ? getQueryParamFromUrl(info.prev, 'page') : null;
  const nextPage =
    info && info.next ? getQueryParamFromUrl(info.next, 'page') : null;

  const locations =
    results && results.length ? results.map(ParseLocationItem) : [];

  return {
    currentPage,
    prevPage: Number(prevPage),
    nextPage: Number(nextPage),
    locations,
  };
};

export const ParseLocationItem = (location: Location): ILocationItem => {
  return {
    id: location.id,
    name: location.name,
  };
};

export const parseLocation = async (
  locationData: Location
): Promise<ILocation> => {
  const { id, name, type, dimension, residents } = locationData;
  const residentsIds = residents.map(resident => {
    return Number(getLastUrlSegment(resident));
  });

  const { data: residentsData } = await getCharactersById(residentsIds);

  const parsedResidents = Array.isArray(residentsData)
    ? residentsData.map(parseCharacterItem)
    : [parseCharacterItem(residentsData)];

  return {
    id,
    name,
    type,
    dimension,
    residents: parsedResidents,
  };
};
