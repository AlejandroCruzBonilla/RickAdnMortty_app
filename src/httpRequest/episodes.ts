import { getEpisodes, getEpisode } from 'rickmortyapi';
import type { ApiResponse, Info, Episode } from 'rickmortyapi';

export const getAllEpisodes = (): Promise<ApiResponse<Info<Episode[]>>> => {
  return new Promise((resolve, reject) => {
    getEpisodes().then(resolve).catch(reject);
  });
};

export const getEpisodesByPage = (
  page: number
): Promise<ApiResponse<Info<Episode[]>>> => {
  return new Promise((resolve, reject) => {
    getEpisodes({ page }).then(resolve).catch(reject);
  });
};

export const getEpisodeById = (id: number): Promise<ApiResponse<Episode>> => {
  return new Promise((resolve, reject) => {
    getEpisode(id).then(resolve).catch(reject);
  });
};

export const getEpisodesById = (ids: number[]): Promise<ApiResponse<Episode[]>> => {
  return new Promise((resolve, reject) => {
    getEpisode(ids).then(resolve).catch(reject);
  });
};
