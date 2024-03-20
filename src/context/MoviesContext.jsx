import { createContext } from 'react';
import useFetch from '../hooks/useFetch';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {

  const {data: Movies, isPending, error} = useFetch('https://65c0ed95dc74300bce8d0144.mockapi.io/Movies/Movies')

  return (
    <MoviesContext.Provider value={{ Movies, isPending, error }}>
      {children}
    </MoviesContext.Provider>
  );
};