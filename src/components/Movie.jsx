import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import '../style/Movie.css'
import useResponsive from "../hooks/useResponive";
import { MoviesContext } from "../context/MoviesContext";

function Movie() {
    const {Movies, isPending, error} = useContext(MoviesContext)
    const {name} = useParams()
    const [movie, setMovie] = useState(null)
    useEffect(()=>{
        const foundMovie = Movies?.find(x => x.name.toString() === name);
            foundMovie ? setMovie(foundMovie) : setMovie(null)
        },[name, Movies])

        const responsive = useResponsive()

        let castSorted = '', countrySorted = '', productionSorted = '', genreSorted = '';

const handleSorted = (property, sortedVariable) => {
  let result = '';
  if (Array.isArray(movie[property])) {
    movie[property].forEach(e => {
      result += e + ', ';
    });
  } else {
    result = movie[property];
  }
  if (result.charAt(result.length -2) === ',') {
    result = result.slice(0, result.length -2)
  }
  return result;
};

if (movie) {
  castSorted = handleSorted('cast', castSorted);
  countrySorted = handleSorted('country', countrySorted);
  productionSorted = handleSorted('production', productionSorted);
  genreSorted = handleSorted('genre', genreSorted);
}


  return (
    <div className='movie-main'>
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
    {movie && 
      <div className={responsive ? 'cover-movie-extra' : 'cover-movie'} style={{backgroundImage: responsive ? `url(${movie.picture})` : `url(${movie.background})`}}>
        {responsive && <a className="play-extra" href={movie.link}>
            <div className="play-btn-extra"><i className="pi pi-caret-right" style={{ fontSize: '2rem', color : 'white'}}></i></div>
            <p className="play-btn-extra">Watch Now</p>
          </a>}
        <div className={responsive ? 'info-div-extra' : 'info-div'}>
          <div>
            {!responsive && <img src={movie.picture} className="movie-picture"/>}
          </div>
          <div className={responsive ? 'infos-extra' : 'infos'}>
            <h1 className="name">{movie.name}</h1>
            <p className={responsive ? 'description-extra' : 'description'}>{movie.description}</p>
            <div className="dif">
              <h2 className="title">Genre: </h2>
              <h3 className="value"> {genreSorted}</h3>
            </div>
            <div className="dif">
              <h2 className="title">Cast: </h2>
              <h3 className="value">{castSorted}</h3>
            </div>
            <div className="dif">
              <h2 className="title">Duration: </h2>
              <h3 className="value"> {movie.time} min</h3>
            </div>
            <div className="dif">
              <h2 className="title">Realased: </h2>
              <h3 className="value"> {movie.year}</h3>
            </div>
            <div className="dif">
              <h2 className="title">Country: </h2>
              <h3 className="value"> {countrySorted}</h3>
            </div>
            <div className="dif">
              <h2 className="title">Production: </h2>
              <h3 className="value"> {productionSorted}</h3>
            </div>
            {movie.rating && <div className="dif">
              <h2 className="title">Rating: </h2>
              <h3 className="value">{movie.rating} <i className="pi pi-star-fill" style={{ fontSize: '1rem' , color: 'orange'}}></i></h3>
            </div>}
          </div>
          {!responsive && <a className="play" href={movie.link}>
            <div className="play-btn"><i className="pi pi-caret-right" style={{ fontSize: '3rem', color : 'white'}}></i></div>
          </a>}
          
        </div>
      </div>
    }
    </div>
  )
}
export default Movie