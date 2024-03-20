import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "./App"
import MainView from "./views/MainView"
import Movie from "./components/Movie"
import Search from "./components/Search"
import GenreComponent from "./components/GenreComponent"
import CountryComponent from "./components/CountryComponent"
import Filter from "./components/Filter"
import Login from "./components/Login"
import Register from "./components/Register"
import AdminView from "./views/AdminView"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path=':name' element={<Movie />} />
            <Route index element={<MainView /> } />
            <Route path="filter" element={<Filter />} />
            <Route path="genre" element={<GenreComponent />} />
            <Route path="country" element={<CountryComponent />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<AdminView />} />
        </Route>
    )
)