import type { ICharacterItem } from './characters';

export interface IEpisodes {
  totalPages: number;
  totalItems: number;
  pages: IPageEpisodes[];
}

export interface IPageEpisodes {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  episodes: IEpisodeItem[];
}

export interface IEpisodeItem {
  id: number;
  name: string;
  code: string;
}

export interface IEpisode {
  id: number;
  name: string;
  airDate: string;
  characters: ICharacterItem[];
}
