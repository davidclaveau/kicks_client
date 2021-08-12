import { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team';

const Teams = () => {
  const [teams, setTeams] = useState([])

  const apiURL = 'http://localhost:3001/api/v1'
  
  useEffect(() => {
    getTeams()
  }, [])
  
  async function getTeams() {
    try {
      const response = await axios.get(`${apiURL}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("teams", teams)

  const teamMap = teams.map(team => {
    return (
      <Team
        key={team.id}
        teamName={team.name}
        managerID={team.manager.manager_id}
        managerFirstName={team.manager.manager_first_name}
        managerLastName={team.manager.manager_last_name}
      />
    )
  })

  return (
    <div>
      This is the Teams component.
      <ul>
        {teamMap}
      </ul>
    </div>
  )
}

export default Teams;
