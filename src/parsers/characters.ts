import type { Info, Character } from 'rickmortyapi';
import { getEpisodesById } from '@/httpRequest/episodes';
import { ParseEpisodeItem } from './episodes';
import { getLastUrlSegment, getQueryParamFromUrl } from '@/helpers';
import type {
  ICharacter,
  ICharacterItem,
  IPageCharacters,
} from '@/interfaces/characters';

export const parsePageCharacters = (
  currentPage: number,
  characterData: Info<Character[]>
): IPageCharacters => {
  const { info, results } = characterData;

  const prevPage =
    info && info.prev ? getQueryParamFromUrl(info.prev, 'page') : null;
  const nextPage =
    info && info.next ? getQueryParamFromUrl(info.next, 'page') : null;

  const characters =
    results && results.length ? results.map(parseCharacterItem) : [];

  return {
    currentPage,
    prevPage: Number(prevPage),
    nextPage: Number(nextPage),
    characters,
  };
};

export const parseCharacterItem = (character: Character): ICharacterItem => {
  return {
    id: character.id,
    image: {
      src: character.image,
      alt: character.name,
      width: 300,
      height: 300,
    },
    name: character.name,
  };
};

export const parseCharacter = async (
  characterData: Character
): Promise<ICharacter> => {
  const {
    episode,
    gender,
    id,
    image,
    location,
    name,
    origin,
    species,
    status,
  } = characterData;

  const episodeIds = episode.map(episode => {
    return Number(getLastUrlSegment(episode));
  });

  const { data: episodesData } = await getEpisodesById(episodeIds);

	const parsedEpisodes = Array.isArray(episodesData)
	? episodesData.map(ParseEpisodeItem)
	: [ParseEpisodeItem(episodesData)];


  return {
    id,
    name,
    image: { src: image, alt: name, width: 300, height: 300 },
    gender,
    status,
    species,
    episodes: parsedEpisodes,
    origin: {
      id: origin.url ? Number(getLastUrlSegment(origin.url)) : 0,
      name: origin.name,
    },
    location: {
      id: location.url ? Number(getLastUrlSegment(location.url)) : 0,
      name: location.name,
    },
  };
};
