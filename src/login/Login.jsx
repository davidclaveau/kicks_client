import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/userContext'

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {setUser} = useContext(UserContext);
  const { history } = props;

  const handleLogin = (event) => {
    event.preventDefault();

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
        if (response.data.logged_in) {
          setUser({
            isLoggedIn: true,
            user: response.data.user
          })
          history.push('/')
        } else {
          setError({
            message: response.data.errors[0],
            code: response.data.status
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      });

    setEmail("")
    setPassword("")
  };
  
  return (
    <div>
      <h1>Log In</h1>        
      <span>
        {error ? `${error.code} - ${error.message}` : ""}
      </span>
      <form onSubmit={handleLogin}>
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
        <button placeholder="submit" type="submit">Log In</button>          
        <div>
          or <Link to='/signup'>sign up</Link>
        </div>
        
      </form>
    </div>
  );
};

export default Login;