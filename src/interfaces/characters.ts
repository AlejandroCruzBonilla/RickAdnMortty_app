import type { IImage } from './common';
import type { IEpisodeItem } from './episodes';
import type { ILocationItem } from './locations';

export interface ICharacters {
  totalPages: number;
  totalItems: number;
  pages: IPageCharacters[];
}

export interface IPageCharacters {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  characters: ICharacterItem[];
}

export interface ICharacterItem {
  id: number;
  name: string;
  image: IImage;
}

export interface ICharacter {
  id: number;
  name: string;
  image: IImage;
  gender: string;
  status: 'unknown' | 'Dead' | 'Alive';
  species: string;
  episodes: IEpisodeItem[];
  origin: ILocationItem;
  location: ILocationItem;
}
