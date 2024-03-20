import { Fragment, useContext } from "react"
import useFetch from "../hooks/useFetch"
import { MoviesContext } from '../context/MoviesContext'
import { NavLink } from "react-router-dom"

function AdminView() {
  const {data: Users, isPending, error} = useFetch('https://65c0ed95dc74300bce8d0144.mockapi.io/Movies/Users')
  const {Movies} = useContext(MoviesContext)

  return (
    <div>
      <h1>Users</h1>
      {Users && 
      Users.map((user, id) => (
        user.status === 'user' &&
        <div key={id}>
          <p>{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.email}</p>
          <p>{user.status}</p>
        </div>
      ))}
      <h1>Movies</h1>
      <div>
        {Movies &&
        Movies.map((movie, id) => (
        <Fragment>
          <NavLink to={'/' + movie.name}>
          <div key={id}>
            <p>{movie.name}</p>
          </div>
          </NavLink>
        </Fragment>
        ))} 
      </div>
    </div>
  )
}
export default AdminView