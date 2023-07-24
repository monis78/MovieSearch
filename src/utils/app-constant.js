
 const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'https://test.create.diagnal.com';
 
export const API_ENDPOINTS = {
  GET_PAGINATED_MOVIE_LIST: `${BASE_URL}/data/page{pageNo}.json`,
  MOVIE_POSTER_IMAGE_BASE_URL: `${BASE_URL}/images/{imageName}`,
  DEFAULT_IMAGE: `${BASE_URL}/images/placeholder_for_missing_posters.png`,
  BACK_ICON: `${BASE_URL}/images/Back.png`,
  addQueryParamInUrl: (url, updateParamsInUrl = {}) => {
    let updatedUrl = url;
    for (const [params, value] of Object.entries(updateParamsInUrl)) {
      if (updatedUrl.includes(`{${params}}`)) updatedUrl = updatedUrl.replace(`{${params}}`, value);
    }
    return updatedUrl;
  },
};