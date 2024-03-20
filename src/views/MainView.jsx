import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import useResponsive from '../hooks/useResponive';
import '../style/MainView.css'
import { NavLink } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { MoviesContext } from '../context/MoviesContext';
import { TypesContext } from '../context/TypesContext';

function MainView() {
  
  const {types, setTypes} = useContext(TypesContext)
  const {Movies, isPending, error} = useContext(MoviesContext)
  const responsive = useResponsive()
  const {search, setSearch} = useContext(SearchContext)

  let movies = []
  let tvShows = []
  let display = []

  const handleSeparate = () => {
      Movies.forEach(e => {
        if (e.type === 'movie') {
          movies.push(e)
        } else if (e.type === 'tv show') {
          tvShows.push(e)
        }
      });
      if (types.type === 'movie') {
        movies.forEach(e => {
          display.push(e)
        })
      } else if (types.type === 'tv show') {
        tvShows.forEach(e => {
          display.push(e)
        })
      }
  }

  Movies && handleSeparate()

  return (
    <div className='main-div'>
      {isPending && <div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div>}
{error && 
<div className="error">
    <div className="error__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 24 24" height="40" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
    </div>
    <div className="error__title">Sorry Something Went Wrong</div>
</div>}
      <div className='trending-div'>
        <h1>Trending</h1>
        <button onClick={() => setTypes(prevTypes => ({...prevTypes, type: 'movie'}))} className={types.type === 'movie' ? 'trending-btn btn-color' : 'trending-btn'}>Movies</button>
        <button onClick={() => setTypes(prevTypes => ({...prevTypes, type: 'tv show'}))} className={types.type === 'tv show' ? 'trending-btn btn-color' : 'trending-btn'}>Tv Shows</button>
      </div>
    <div className='extra-div'>
      <div className={'content-div'}>
      {Movies && 
      display.slice(0, 14).map((movie, id) => (
        movie.type === types.type &&
        <Fragment key={id}>
          <NavLink to={movie.name} style={{ textDecoration: 'none' }}>
            <div className='movie-card'>
              <div className='hd-div'>
                <img src={movie.picture} className={responsive ? 'content-img-extra' : 'content-img'}/>
                {movie.hd ? <div className='hd'>HD</div> : <div className='hd'>CAM</div>}
              </div>
              <div className='name-div'>
                <h3 className={responsive ? 'movie-name-extra' : 'movie-name'}>{movie.name}</h3>
              </div>
              <div className='flex card-info'>
                <h3 className='movie-info'>{movie.year} ||</h3>
                <h3 className='movie-info'> {movie.time} min</h3>
              </div>
            </div>
          </NavLink>
        </Fragment>
      ))}
      
      </div>
      </div>
      {types.type === 'movie' && <h1 className='trending-div'>Tv shows</h1>}
      <div className='extra-div'>
      {Movies && types.type === 'movie' && 
      tvShows.slice(0, 14).map((movie, id) => (
        <Fragment key={id}>
          <NavLink to={movie.name} style={{ textDecoration: 'none' }}>
            <div className='movie-card'>
              <div className='hd-div'>
                <img src={movie.picture} className={responsive ? 'content-img-extra' : 'content-img'}/>
                {movie.hd ? <div className='hd'>HD</div> : <div className='hd'>CAM</div>}
              </div>
              <div className='name-div'>
                <h3 className={responsive ? 'movie-name-extra' : 'movie-name'}>{movie.name}</h3>
              </div>
              <div className='flex card-info'>
                <h3 className='movie-info'>{movie.year}  || </h3>
                <h3 className='movie-info'> {movie.time} min</h3>
              </div>
            </div>
          </NavLink>
        </Fragment>
      ))}
      </div>
    </div>
  )
}
export default MainView