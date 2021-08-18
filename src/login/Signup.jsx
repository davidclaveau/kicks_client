import { useState } from 'react';
import axios from 'axios';

const handleSubmit = (event) => {
  event.preventDefault()
};

const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  return (
    <div>
      <h1>Log In</h1>        
      <form onSubmit={handleSubmit}>
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
        <button placeholder="submit" type="submit">Log In</button>          
      </form>
    </div>
  )
};

export default Signup;
