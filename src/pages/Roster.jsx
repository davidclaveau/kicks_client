import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';
import RosterPlayer from './RosterPlayer';
import RosterAddPlayer from '../forms/team_forms/RosterAddPlayer';
import Errors from './Errors';
import './Roster.css'

// Provide player information for each team
// Roster ID is passed as location.state.id from the Team component
const Roster = (props) => {
  const [roster, setRoster] = useState([{
    team: {
      id: 0,
      manager: {
        manager_id: 0,
        manager_first_name: "",
        manager_last_name: ""
      },
      name: ""
    },
    user: {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      password_digest: "",
      phone_number: "",
      public_sector: "",
      winter_team: ""
    }
  }]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState("")

  const apiURL = 'http://localhost:3001/api/v1';  
  const getRoster = useCallback(() => {
    axios
    .get(`${apiURL}/rosters/${props.location.state.id}`)
    .then(response => {
      setRoster([
        ...response.data
      ]);
    })
  }, [props.location.state.id])
  
  useEffect(() => {
    getRoster()
  }, [getRoster])

  const addPlayer = (team_id, user_id) => {
    const url = `${apiURL}/rosters`;
    axios
      .post(url,
        { 
          user_id: user_id,
          team_id: team_id
        }
      )
      .then(response => {
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        getRoster();
      })
  }

  const removePlayer = (roster_id) => {
    const url = `${apiURL}/rosters/${roster_id.id}`;
    axios
      .delete(url)
      .then(response => {
        getRoster();
      })
  }  
  
  const rosterMap = roster.map(roster => {
    return (
      <RosterPlayer
        key={roster.id}
        firstName={roster.user.first_name}
        lastName={roster.user.last_name}
        publicSector={roster.user.public_sector}
        winterTeam={roster.user.winter_team}
        currentTeam={roster.team.name}
        onRemove={() => removePlayer(roster)}
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
      {adminAllowed && <RosterAddPlayer roster={roster} addPlayer={addPlayer}/>}
      {error && 
        <Errors error={error}/>
      }
      <h5>
        {roster.length !== 0 ? roster[0].team.name : "No Team Selected"}
        <table className="tableClass">
          <tbody>
            <tr>
              <th>Player</th>
              <th>Winter Team</th>
              <th>Public Sector</th>
              <th></th>
            </tr>
            {rosterMap.length !== 0 && rosterMap}
          </tbody>
        </table>
      </h5>
    </div>
  )
};

export default Roster;
