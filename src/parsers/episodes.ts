import type { Info, Episode } from 'rickmortyapi';
import { getCharactersById } from '@/httpRequest/characters';
import { parseCharacterItem } from './characters';
import { getLastUrlSegment, getQueryParamFromUrl } from '@/helpers';
import type {
  IEpisodeItem,
  IPageEpisodes,
  IEpisode,
} from '@/interfaces/episodes';

export const parsePageEpisodes = (
  currentPage: number,
  episodeData: Info<Episode[]>
): IPageEpisodes => {
  const { info, results } = episodeData;

  const prevPage =
    info && info.prev ? getQueryParamFromUrl(info.prev, 'page') : null;
  const nextPage =
    info && info.next ? getQueryParamFromUrl(info.next, 'page') : null;

  const episodes =
    results && results.length ? results.map(ParseEpisodeItem) : [];

  return {
    currentPage,
    prevPage: Number(prevPage),
    nextPage: Number(nextPage),
    episodes,
  };
};

export const ParseEpisodeItem = (episode: Episode): IEpisodeItem => {
  return {
    id: episode.id,
    name: episode.name,
    code: episode.episode,
  };
};

export const parseEpisode = async (episodeData: Episode): Promise<IEpisode> => {
  const { id, name, air_date, characters } = episodeData;
  const characterIds = characters.map(character => {
    return Number(getLastUrlSegment(character));
  });

  const { data: charactersData } = await getCharactersById(characterIds);

	const parsedCharacters = Array.isArray(charactersData)
	? charactersData.map(parseCharacterItem)
	: [parseCharacterItem(charactersData)];

  return {
    id,
    name,
    airDate: air_date,
    characters: parsedCharacters
  };
};
