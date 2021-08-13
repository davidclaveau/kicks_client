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

  console.log("schedule", schedule)

  const games = schedule.map(game => {
    return (
      <Game 
        key={game.id}
        awayTeam={game.away_team.name}
        homeTeam={game.home_team.name}
        field={game.field}
        gameTime={game.game_time}
        gameDate={game.game_date}
      />
    )
  })  

  return (
    <div>
      This is the Schedules component.
      <ul>
        {games}
      </ul>
    </div>
  )
}; 

export default Schedule;
