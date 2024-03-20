import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './RoutesConfig'
import { FilterProvider } from './context/FilterContext'
import { SearchProvider } from './context/SearchContext'
import { MoviesProvider } from './context/MoviesContext'
import { TypesProvider } from './context/TypesContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserProvider>
  <MoviesProvider>
  <SearchProvider>
    <FilterProvider>
      <TypesProvider>
        <RouterProvider router={router} />
      </TypesProvider>
    </FilterProvider>
  </SearchProvider>
  </MoviesProvider>
  </UserProvider>
  // </React.StrictMode>,
)
