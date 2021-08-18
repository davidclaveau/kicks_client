import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/userContext'

const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")

  const { setUser } = useContext(UserContext)

  const handleSignup = (event) => {
    event.preventDefault();

    // Make sure passwords match before attempting signup
    if (password === passwordConfirmation) {
      axios
        .post("http://localhost:3001/api/v1/users", {
          user: {
            email: email,
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
            password: password,
          }
        },
        { withCredentials: true}
        )
        .then(response => {
          if  (response.data.status === "created") {
            // If status comes back OK, log user in as well
            setUser({
              loggedInStatus: "LOGGED_IN",
              user: response.data.user
            })
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
    } else {
      setError({
        message: "Passwords don't match", 
        code: "403"
      })
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <span>
        {error ? `${error.code} - ${error.message}` : ""}
      </span>       
      <form onSubmit={handleSignup}>
        <input
          placeholder="first name"
          type="text"
          name="first_name"
          value={firstName}
          onChange={event => {setFirstName(event.target.value)}}
        />
        <input
          placeholder="last name"
          type="text"
          name="last_name"
          value={lastName}
          onChange={event => {setLastName(event.target.value)}}
        />
        <input
          placeholder="phone number"
          type="text"
          name="phone_number"
          value={phoneNumber}
          onChange={event => {setPhoneNumber(event.target.value)}}
        />
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
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={event => {setPasswordConfirmation(event.target.value)}}
        />         
        <button placeholder="submit" type="submit">Signup</button>          
      </form>
    </div>
  )
};

export default Signup;
