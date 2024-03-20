import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import '../style/Register.css'

function Register() {

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        emial: '',
        password: '',
        status: 'user'
    })

    const {user, setUser} = useContext(UserContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData((prevUserData => ({
            ...prevUserData,
            [name] : value
        })))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('https://65c0ed95dc74300bce8d0144.mockapi.io/Movies/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                setUser(userData)
                navigate('/')
            }
        })
    }

    const navigate = useNavigate()
  return (
    <div className="register-main">
    <div className="register-container">
    <p className="register-title">Log In</p>
    <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" className="register-input" placeholder="Name" name="name" onChange={handleChange}/>
        <input type="text" className="register-input" placeholder="Surname" name="surname" onChange={handleChange}/>
        <input type="email" className="register-input" placeholder="Email" name="email" onChange={handleChange}/>
        <input type="password" className="register-input" placeholder="Password" name="password" onChange={handleChange}/>
        <input type='submit' className="form-btn" name='Register'/>
    </form>
    <p className="sign-up-label">
        Already Registered?<span className="sign-up-link" onClick={() => navigate('/login')}>Log In</span>
    </p>
  </div>
    </div>
    )
}
export default Register