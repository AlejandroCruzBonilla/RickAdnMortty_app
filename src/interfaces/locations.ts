import type{ ICharacterItem } from './characters';

export interface ILocations {
  totalPages: number;
  totalItems: number;
  pages: IPageLocations[];
}

export interface IPageLocations {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  locations: ILocationItem[];
}

export interface ILocationItem {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  name: string;
	type: string;
	dimension: string;
	residents: ICharacterItem[]
}