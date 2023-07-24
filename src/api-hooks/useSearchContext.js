import React, { createContext, useState } from 'react';

// Create the context
const SearchContext = createContext();

// Export the provider and the context itself
export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>;
};

export default SearchContext;