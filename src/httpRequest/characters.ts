import { getCharacters, getCharacter } from 'rickmortyapi';
import type { ApiResponse, Info, Character } from 'rickmortyapi';

export const getAllCharacters = (): Promise<ApiResponse<Info<Character[]>>> => {
  return new Promise((resolve, reject) => {
    getCharacters().then(resolve).catch(reject);
  });
};

export const getCharactersByPage = (
  page: number
): Promise<ApiResponse<Info<Character[]>>> => {
  return new Promise((resolve, reject) => {
    getCharacters({ page }).then(resolve).catch(reject);
  });
};

export const getCharacterById = (
  id: number
): Promise<ApiResponse<Character>> => {
  return new Promise((resolve, reject) => {
    getCharacter(id).then(resolve).catch(reject);
  });
};

export const getCharactersById = (
  ids: number[]
): Promise<ApiResponse<Character[]>> => {
  return new Promise((resolve, reject) => {
    getCharacter(ids).then(resolve).catch(reject);
  });
};
