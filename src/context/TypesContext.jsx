import { createContext, useState } from 'react';

export const TypesContext = createContext();

export const TypesProvider = ({ children }) => {
  const [types, setTypes] = useState({type: 'movie', rating: 0});

  return (
    <TypesContext.Provider value={{ types, setTypes }}>
      {children}
    </TypesContext.Provider>
  );
};