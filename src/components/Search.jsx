import { NavLink } from "react-router-dom";
import '../style/Search.css'
import { Fragment, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import useResponsive from "../hooks/useResponive";
import { MoviesContext } from "../context/MoviesContext";
import { TypesContext } from "../context/TypesContext";

function Search() {

const {Movies} = useContext(MoviesContext)
  const search = useContext(SearchContext)

  const {types} = useContext(TypesContext)

  const responsive = useResponsive()
  return (
    <div>
      <div className="main-atMovies">
      {Movies && 
      Movies.map((movie, id) => {
        const movieString = Object.values(movie).join(' ');
          if (movieString.toLowerCase().includes(search.current.toLowerCase())) {
            
            return (
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
            )
          }
      })}
      </div>
    </div>
  )
}
export default Search