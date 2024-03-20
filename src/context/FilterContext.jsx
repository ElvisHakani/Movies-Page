import { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filtered, setFiltered] = useState({country: '', genre: ''});

  return (
    <FilterContext.Provider value={{filtered, setFiltered}}>
      {children}
    </FilterContext.Provider>
  );
};