import { createContext, useRef } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const search = useRef(null);

  return (
    <SearchContext.Provider value={{ search }}>
      {children}
    </SearchContext.Provider>
  );
};