import { Fragment, useContext, useEffect, useState } from "react"
import { FilterContext } from "../context/FilterContext"
import { NavLink } from "react-router-dom"
import '../style/CountryComponent.css'
import useResponsive from "../hooks/useResponive"
import { MoviesContext } from "../context/MoviesContext"
import { TypesContext } from "../context/TypesContext"

function CountryComponent() {
  const {filtered, setFiltered} = useContext(FilterContext)

const {Movies} = useContext(MoviesContext)
  const {types, setTypes} = useContext(TypesContext)
  const responsive = useResponsive()

    return (
    <div className="main-filtered-country">
      <div className='trending-div'>
        <h1>Trending</h1>
        <button onClick={() =>setTypes(prevTypes => ({...prevTypes, type: 'movie'}))} className={types.type === 'movie' ? 'trending-btn btn-color' : 'trending-btn'}>Movies</button>
        <button onClick={() => setTypes(prevTypes => ({...prevTypes, type: 'tv show'}))} className={types.type === 'tv show' ? 'trending-btn btn-color' : 'trending-btn'}>Tv Shows</button>
      </div>
      <div className="main-atMovies">
      {Movies &&
      Movies.map((movie, id) => (
        movie.type === types.type && movie.country.includes(filtered.country) &&
        <Fragment key={id}>
          <NavLink to={'/' + movie.name} style={{ textDecoration: 'none' }}>
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
export default CountryComponent