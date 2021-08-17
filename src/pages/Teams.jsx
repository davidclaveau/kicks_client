import { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team';

// Render all teams in the league using the Team component
// Provide the team name, manager, and manager name
const Teams = (props) => {
  const [teams, setTeams] = useState([]);

  const apiURL = 'http://localhost:3001/api/v1';
  
  useEffect(() => {
    getTeams()
  }, []);
  
  async function getTeams() {
    try {
      const response = await axios.get(`${apiURL}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const teamMap = teams.map(team => {
    return (
      <Team
        key={team.id}
        id={team.id}
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
