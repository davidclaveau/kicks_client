import { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player'
import './Roster.css'

const Roster = (props) => {
  const [roster, setRoster] = useState([])

  const apiURL = 'http://localhost:3001/api/v1'
  
  useEffect(() => {
    getRoster()
  }, [])
  
  async function getRoster() {
    try {
      const response = await axios.get(`${apiURL}/rosters/${props.id}`);
      setRoster(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("roster", roster)

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


  return (
    <div>
      This is the Roster component.

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
