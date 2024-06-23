import { getLocations, getLocation } from 'rickmortyapi';
import type { ApiResponse, Info, Location } from 'rickmortyapi';

export const getAllLocations = (): Promise<ApiResponse<Info<Location[]>>> => {
  return new Promise((resolve, reject) => {
    getLocations().then(resolve).catch(reject);
  });
};

export const getLocationsByPage = (
  page: number
): Promise<ApiResponse<Info<Location[]>>> => {
  return new Promise((resolve, reject) => {
    getLocations({ page }).then(resolve).catch(reject);
  });
};

export const getLocationById = (id: number): Promise<ApiResponse<Location>> => {
  return new Promise((resolve, reject) => {
    getLocation(id).then(resolve).catch(reject);
  });
};
