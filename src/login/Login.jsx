import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/userContext'

const handleSubmit = (event) => {
  event.preventDefault()
};

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {user, setUser} = useContext(UserContext);

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/login", {
        user: {
          email: email,
          password: password,
        }
      },
      { withCredentials: true}
      )
      .then(response => {
        console.log("response from login", response)
        if  (response.data.logged_in) {
          console.log("response", response.data.user)
          setUser({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        } else {
          console.log("not logged in")
        }
      })
      .catch(error => {
        console.log("error", error)
      });
  };
  
  return (
    <div>
      <h1>Log In</h1>        
      <form onSubmit={event => event.preventDefault()}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={event => {setEmail(event.target.value)}}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={event => {setPassword(event.target.value)}}
        />         
        <button placeholder="submit" type="submit" onClick={handleLogin}>Log In</button>          
        <div>
          or <Link to='/signup'>sign up</Link>
        </div>
        
      </form>
    </div>
  );
};

export default Login;