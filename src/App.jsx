import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Logo from './assets/Logo.jpeg'
import 'primeicons/primeicons.css';
import useResposive from './hooks/useResponive'
import { useContext, useEffect, useState } from 'react';
import interstellar from './assets/interstellar.jpg'
import SpiderMan from './assets/SpiderMan.jpg'
import deadpool from './assets/deadpool.jpg'
import capAmerica from './assets/capAmerica.jpg'
import { SearchContext } from './context/SearchContext';
import { FilterContext } from './context/FilterContext';
import { TypesContext } from './context/TypesContext';
import { UserContext } from './context/UserContext';
import { MoviesContext } from './context/MoviesContext';


function App() {

  const navigate = useNavigate()

  const responsive = useResposive()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const {user} = useContext(UserContext)
  const {Movies} = useContext(MoviesContext)


  let backgroundImages = [interstellar, SpiderMan, deadpool, capAmerica]
  const [background, setBackground] = useState(backgroundImages[0])

  useEffect(() => {
    let index = 0
    setInterval(() => {
      index++
      if (index === backgroundImages.length) {
        index = 0
      }
      setBackground(backgroundImages[index])
    },10000)
  },[])

  const {types, setTypes} = useContext(TypesContext)

  const handleContext = (type, rating) => {
    setTypes(prevTypes => ({...prevTypes, type: type, rating: rating}));
    navigate('/filter')
}

const handleFilter = (genre) => {
    setFiltered(prevFilter => ({...prevFilter, genre: genre}))
    navigate('/genre')
}

const handleCountry = (country) => {
  setFiltered(prevFilter => ({...prevFilter, country: country}))
  navigate('/country')
}

const {filtered, setFiltered} = useContext(FilterContext)

  const search = useContext(SearchContext)

  const handleChange = (event) => {
    let inputName = event.target.name
    let value = event.target.value
    if (inputName === 'search') {
      search.current = value
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!search.current) {
      alert("The Search is Empty")
    } else {
      setTypes(prevTypes => ({...prevTypes, rating: 1}));
      navigate('/search')
    }
  }

  const [drop, setDrop] = useState(false)
  const [dropE, setDropE] = useState(false)
  const toggleDrop = () => {
    setDrop(!drop)
  }
  const toggleDropE = () => {
    setDropE(!dropE)
  }

  return (
    <div className='main' style={{backgroundImage: `url('${background}')`}}>
      <nav>
        <div className={!responsive ? 'inside-nav' : 'inside-nav-extra'}>
          <img src={Logo} className={!responsive ? 'img' : 'img-extra' } onClick={() => {navigate('/'), setTypes(prevTypes => ({...prevTypes, type: 'movie'}))}}></img>
          {!responsive &&<div className='nav-btns'>
            <button className='nav-btn' onClick={() => {navigate('/'), setTypes(prevTypes => ({...prevTypes, type: 'movie'}))}}>Home</button>
            <li className="dropdown">
              <h4 className="dropbtn color">Genre</h4>
              <div className="dropdown-content">
                <button className='drop-btn' onClick={() => handleFilter('Action')}>Action</button>
                <button className='drop-btn' onClick={() => handleFilter('Comedy')}>Comedy</button>
                <button className='drop-btn' onClick={() => handleFilter('Adventure')}>Adventure</button>
                <button className='drop-btn' onClick={() => handleFilter('Animation')}>Animation</button>
                <button className='drop-btn' onClick={() => handleFilter('Biography')}>Biography</button>
                <button className='drop-btn' onClick={() => handleFilter('Crime')}>Crime</button>
                <button className='drop-btn' onClick={() => handleFilter('Documentary')}>Documentary</button>
                <button className='drop-btn' onClick={() => handleFilter('Drama')}>Drama</button>
                <button className='drop-btn' onClick={() => handleFilter('Family')}>Family</button>
                <button className='drop-btn' onClick={() => handleFilter('Fantasy')}>Fantasy</button>
                <button className='drop-btn' onClick={() => handleFilter('History')}>History</button>
                <button className='drop-btn' onClick={() => handleFilter('Horror')}>Horror</button>
                <button className='drop-btn' onClick={() => handleFilter('Kids')}>Kids</button>
                <button className='drop-btn' onClick={() => handleFilter('Mystery')}>Mystery</button>
                <button className='drop-btn' onClick={() => handleFilter('Romance')}>Romance</button>
                <button className='drop-btn' onClick={() => handleFilter('Science Fiction')}>Science Fiction</button>
                <button className='drop-btn' onClick={() => handleFilter('Thriller')}>Thriller</button>
                <button className='drop-btn' onClick={() => handleFilter('War')}>War</button>
                <button className='drop-btn' onClick={() => handleFilter('Western')}>Western</button>
              </div>
            </li>
            <li className="dropdown">
              <h4 className='color'>Country</h4>
              <div className="dropdown-content">
                <button className='drop-btn' onClick={() => handleCountry('United States of America')}>USA</button>
                <button className='drop-btn' onClick={() => handleCountry('United Kingdom')}>United Kingdom</button>
                <button className='drop-btn' onClick={() => handleCountry('Australia')}>Australia</button>
                <button className='drop-btn' onClick={() => handleCountry('Belgium')}>Belgium</button>
                <button className='drop-btn' onClick={() => handleCountry('Brazil')}>Brazil</button>
                <button className='drop-btn' onClick={() => handleCountry('Canada')}>Canada</button>
                <button className='drop-btn' onClick={() => handleCountry('China')}>China</button>
                <button className='drop-btn' onClick={() => handleCountry('France')}>France</button>
                <button className='drop-btn' onClick={() => handleCountry('Germany')}>Germany</button>
                <button className='drop-btn' onClick={() => handleCountry('India')}>India</button>
                <button className='drop-btn' onClick={() => handleCountry('Italy')}>Italy</button>
                <button className='drop-btn' onClick={() => handleCountry('Spain',)}>Spain</button>
              </div>
            </li>
            <button className='nav-btn' onClick={() => handleContext('movie', 0)}>Movies</button>
            <button className='nav-btn' onClick={() => handleContext('tv show', 0)}>Tv Shows</button>
            <button className='nav-btn' onClick={() => handleContext('movie', 7)}>Top Rating</button>
          </div>}
          <form className={!responsive ? 'form' : 'form-extra'} onSubmit={handleSubmit}>
            <span className="pi pi-search" style={{ fontSize: '1.3rem' }}></span>
            <input className="input" placeholder="Search" type="text" name='search' onChange={handleChange}/>
            <input type='submit' className={!responsive ? 'submit' : 'submit-extra'} value={'Search'} />
          </form>
            {responsive && <button className='hamburger' onClick={toggleSidebar}>☰</button>}
        </div>
          {!responsive && !user && <button className='log-in-btn' onClick={() => navigate('/login')}>Login</button>}
          {user && !responsive && <div className='user'>{user.status === 'user' ? user.name : 'Admin'}</div>}
          {user && user.status === 'admin' && <button onClick={() => navigate('/admin')} className='log-in-btn'>Admin</button>}
      </nav>
            {isSidebarOpen && 
            <div className='sidebar'>
              <button className='side-btn' onClick={() => {navigate('/'), toggleSidebar()}}>Home</button>
              {!user && <button className='side-btn' onClick={() => {navigate('/login'), toggleSidebar()}}>Login</button>}
              {user && <button className='side-btn'>{user.name}</button>}
              <button className='side-btn' onClick={() => {handleContext('movie', 0), toggleSidebar()}}>Movies</button>
              <button className='side-btn' onClick={() => {handleContext('tv show', 0), toggleSidebar()}}>Tv Shows</button>
              <button className='side-btn' onClick={() => {handleContext('movie', 7), toggleSidebar()}}>Top Rating</button>
              <li className="dropdown">
              <h4 className="side-btn" onClick={toggleDrop}>Genre</h4>
              {drop && <div className="dropdown-content-extra">
                <button className='drop-btn' onClick={() => {handleFilter('Action'), toggleSidebar(), toggleDrop()}}>Action</button>
                <button className='drop-btn' onClick={() => {handleFilter('Comedy'), toggleSidebar(), toggleDrop()}}>Comedy</button>
                <button className='drop-btn' onClick={() => {handleFilter('Adventure'), toggleSidebar(), toggleDrop()}}>Adventure</button>
                <button className='drop-btn' onClick={() => {handleFilter('Animation'), toggleSidebar(), toggleDrop()}}>Animation</button>
                <button className='drop-btn' onClick={() => {handleFilter('Drama'), toggleSidebar(), toggleDrop()}}>Drama</button>
                <button className='drop-btn' onClick={() => {handleFilter('Romance'), toggleSidebar(), toggleDrop()}}>Romance</button>
                <button className='drop-btn' onClick={() => {handleFilter('Science Fiction'), toggleSidebar(), toggleDrop()}}>Science Fiction</button>
                <button className='drop-btn' onClick={() => {handleFilter('Horror'), toggleSidebar(), toggleDrop()}}>Horror</button>
              </div>}
            </li>
            <li className="dropdown">
              <h4 className='side-btn' onClick={toggleDropE}>Country</h4>
              {dropE && <div className="dropdown-content-extra">
                <button className='drop-btn' onClick={() => {handleCountry('United States of America'), toggleSidebar(), toggleDropE()}}>USA</button>
                <button className='drop-btn' onClick={() => {handleCountry('United Kingdom'), toggleSidebar(), toggleDropE()}}>United Kingdom</button>
                <button className='drop-btn' onClick={() => {handleCountry('Australia'), toggleSidebar(), toggleDropE()}}>Australia</button>
                <button className='drop-btn' onClick={() => {handleCountry('Canada'), toggleSidebar(), toggleDropE()}}>Canada</button>
                <button className='drop-btn' onClick={() => {handleCountry('Italy'), toggleSidebar(), toggleDropE()}}>Italy</button>
              </div>}
            </li>
            </div>}
      <main>
        <Outlet />
      </main>
      {Movies && <footer>
        <div className={responsive ? 'foot-extra' : 'foot'}>
          <img src={Logo} className={!responsive ? 'img' : 'img-extra' } onClick={() => {navigate('/'), setTypes(prevTypes => ({...prevTypes, type: 'movie'}))}}></img>
          <p className={responsive ? 'foot-text-extra' : 'foot-text'}>Movies24 is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from HDToday and watch it later if you want.</p>
          <p className='foot-box'>HDToday does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
        </div>
      </footer>}
    </div>
  )
}

export default App
