import { useState, useEffect } from 'react';
import axios from 'axios';

import Game from './Game'

const Schedule = () => {
  const [schedule, setSchedule] = useState([])

  const apiURL = 'http://localhost:3001/api/v1'
  
  useEffect(() => {
    getSchedule()
  }, [])
  
  async function getSchedule() {
    try {
      const response = await axios.get(`${apiURL}/schedules`);
      setSchedule(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const gamesMap = schedule.map(game => {
    return (
      <Game 
        key={game.id}
        awayTeam={game.away_team.name}
        homeTeam={game.home_team.name}
        field={game.field}
        gameTime={game.game_time}
        gameDate={game.game_date}
        holiday={game.holiday}
      />
    )
  })  

  return (
    <div>
      This is the Schedules component.
      <table className="tableClass">
        <tbody>
          <tr>
            <th>Game Date</th>
            <th>Game Time</th>
            <th>Away Team</th>
            <th>Home Team</th>
            <th>Field</th>
          </tr>
          {gamesMap}
        </tbody>
      </table>
    </div>
  )
}; 

export default Schedule;
