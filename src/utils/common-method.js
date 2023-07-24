export const getNavigationPropsFromPathName = (pathname) => {
  return pathname === '/'
    ? {
        backButton: false,
        searchButton: false,
      }
    : {
        backButton: true,
        searchButton: true,
      };
};
