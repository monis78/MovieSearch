import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/app-constant';

const useGetUserData = (searchFilterValue) => {
  const deferredFilterValue = useDeferredValue(searchFilterValue.toLowerCase());
  const [movieList, setMovieList] = useState([]);
  const [otherDetails, setOtherDetails] = useState({});
  const [loadingMovieList, setLoadingMovieList] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState({ isError: false, message: '' });

  const getMovieList = async (pageNo) => {
    const generatePaginationUrl = API_ENDPOINTS.addQueryParamInUrl(API_ENDPOINTS.GET_PAGINATED_MOVIE_LIST, {
      pageNo: pageNo,
    });
    const data = await axios.get(generatePaginationUrl);
    const { 'content-items': contentList, ...otherDetails } = data.data.page;
    setMovieList([...movieList, ...(contentList?.content || [])]);
    setOtherDetails(otherDetails);
  };

  const fetchAdditionalMovies = async () => {
    console.log(movieList.length, otherDetails['total-content-items']);

    if (movieList.length === +otherDetails['total-content-items']) {
      setHasMoreData(false);
      return;
    }
    await getMovieList(pageNo + 1);
    setPageNo(pageNo + 1);
    return;
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingMovieList(true);
        await getMovieList(1);
      } catch (error) {
        console.error(error);
        setError({
          isError: false,
          message: error,
        });
      } finally {
        setLoadingMovieList(false);
      }
    })();
  }, []);

  const filteredList = useMemo(() => {
    return movieList.filter((movieDetails) => {
      if (deferredFilterValue === '') {
        return true;
      }
      return movieDetails.name.toLowerCase().includes(deferredFilterValue);
    });
  }, [deferredFilterValue, movieList]);

  return {
    filteredList: filteredList,
    otherDetails: otherDetails,
    loading: loadingMovieList,
    error,
    fetchAdditionalMovies,
    hasMoreData,
  };
};

export default useGetUserData;
