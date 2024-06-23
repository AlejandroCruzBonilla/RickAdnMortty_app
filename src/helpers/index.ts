export const getQueryParamFromUrl = (url: string, param: string) => {
  const urlObject = new URL(url);
  const queryParams = new URLSearchParams(urlObject.search);
  return queryParams.get(param);
};

export const getLastUrlSegment = (url: string) => {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;
  const segments = pathname.split('/');
  return segments.pop();
};
