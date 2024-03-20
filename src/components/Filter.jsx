import { Fragment, useContext, useState } from "react"
import '../style/Filter.css'
import { NavLink } from "react-router-dom"
import useResponsive from "../hooks/useResponive"
import { MoviesContext } from "../context/MoviesContext"
import { TypesContext } from "../context/TypesContext"
import { SearchContext } from "../context/SearchContext"

function Filter() {

  const {Movies} = useContext(MoviesContext)
  const {types, setTypes} = useContext(TypesContext)

    const [drop, setDrop] = useState(false)

    const search = useContext(SearchContext)

    const responsive = useResponsive()

    const toggleDrop = () => {
      setDrop(!drop)
    }
  return (
    <div className="main-search">
      {types.rating >= 1 && <div className='trending-div'>
        <h1>Trending</h1>
        <button onClick={() =>setTypes(prevTypes => ({...prevTypes, type: 'movie'}))} className={types.type === 'movie' ? 'trending-btn btn-color' : 'trending-btn'}>Movies</button>
        <button onClick={() => setTypes(prevTypes => ({...prevTypes, type: 'tv show'}))} className={types.type === 'tv show' ? 'trending-btn btn-color' : 'trending-btn'}>Tv Shows</button>
        <div className="dr">
          <li className="drop">
            {!drop && <div><i className="pi pi-angle-down" style={{ fontSize: '1rem' }} onClick={toggleDrop}></i></div>}
            {drop && <div><i className="pi pi-angle-up" style={{ fontSize: '1rem' }} onClick={toggleDrop}></i></div>}
            <div className="btns-drop">
            {drop && <button className="dropped" onClick={() => {toggleDrop(), setTypes(prevTypes => ({...prevTypes, rating: 6}))}}>above 6</button>}
            {drop && <button className="dropped" onClick={() => {toggleDrop(), setTypes(prevTypes => ({...prevTypes, rating: 7}))}}>above 7</button>}
            {drop && <button className="dropped" onClick={() => {toggleDrop(), setTypes(prevTypes => ({...prevTypes, rating: 8}))}}>above 8</button>}
            {drop && <button className="dropped" onClick={() => {toggleDrop(), setTypes(prevTypes => ({...prevTypes, rating: 9}))}}>above 9</button>}
            </div>
        </li>
        </div>
      </div>}
      <div className="main-atMovies">
    {Movies && 
    Movies.map((movie, id) => (
        movie.type === types.type && movie.rating >= types.rating &&
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
export default Filter