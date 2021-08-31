import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext'
import axios from 'axios';
import Player from './Player'
import RosterAddPlayer from '../forms/team_forms/RosterAddPlayer'
import './Roster.css'

// Provide player information for each team
// Roster ID is passed as location.state.id from the Team component
const Roster = (props) => {
  const [roster, setRoster] = useState([]);
  const { user } = useContext(UserContext);

  const apiURL = 'http://localhost:3001/api/v1'
  
  useEffect(() => {
    async function getRoster() {
      try {
        const response = await axios.get(`${apiURL}/rosters/${props.location.state.id}`);
        setRoster(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getRoster()
  }, [props.location.state.id])
  

  const rosterMap = roster.map(player => {
    return (
      <Player
        key={player.id}
        firstName={player.user.first_name}
        lastName={player.user.last_name}
        publicSector={player.user.public_sector}
        winterTeam={player.user.winter_team}
      />
    )
  })

  // Need to specify that only managers of this team can add/remove players
  let adminAllowed = false
  if (user.role === "Admin") {
    adminAllowed = true;
  }

  return (
    <div>
      {adminAllowed && <RosterAddPlayer roster={roster}/>}

      <h5>
        {roster.length !== 0 ? roster[0].team.name : "No Team Selected"}
        <table className="tableClass">
          <tbody>
            <tr>
              <th>Player</th>
              <th>Winter Team</th>
              <th>Public Sector</th>
            </tr>
            {rosterMap}
          </tbody>
        </table>
      </h5>
    </div>
  )
};

export default Roster;
