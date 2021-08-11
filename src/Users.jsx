import { useState, useEffect } from 'react';
import User from './User';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([])

  const apiURL = 'http://localhost:3001/api/v1/users'
  
  useEffect(() => {
    getUsers()
  }, [])
  
  async function getUsers() {
    try {
      const response = await axios.get(apiURL);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("users", users)

  const userMap = users.map(user => {
    return (
      <User
        key={user.id}
        email={user.email}
      />
    )
  })

  return (
    <div>
      <ul>
        {userMap}
      </ul>
    </div>
  )
}

export default Users
