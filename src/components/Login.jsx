import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import '../style/Login.css'

function Login() {

    const {data: User, isPending, error} = useFetch("https://65c0ed95dc74300bce8d0144.mockapi.io/Movies/Users")
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const handleChange = (event) => {
        let inputName = event.target.name
        let value = event.target.value
        if (inputName === 'email') {
            setEmail(value)
        } else if (inputName === 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const user = User && User.find(e => e.email === email)
        if (user && user.password === password) {
            setUser(user)
            if (user.status === 'admin') {
                alert('Welcome Admin')
                navigate('/admin')
            } else navigate('/')
        } else alert('Email or password is not correct')
    }


  return (
    <div className="login-main">
    <div className="form-container">
    <p className="login-title">Log In</p>
    <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" className="login-input" placeholder="Email" name="email" onChange={handleChange}/>
        <input type="password" className="login-input" placeholder="Password" name="password" onChange={handleChange}/>
        <input type='submit' className="form-btn" value='Log In'/>
    </form>
    <p className="sign-up-label">
        Don't have an account?<span className="sign-up-link" onClick={() => navigate('/register')}>Register</span>
    </p>
  </div>
    </div>
)
}
export default Login