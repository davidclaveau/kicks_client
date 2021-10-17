import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import { GameContext } from '../contexts/gameContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core'
import Remove from '@material-ui/icons/RemoveCircle';

import AddGame from '../forms/AddGame';
import Errors from './Errors';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    whiteSpace: 'nowrap',
    minWidth: 650,
  },
});

const Schedule = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const [game, setGame] = useState({
    season: "",
    game_date: "",
    game_day: "",
    game_time: "",
    home_team_id: 0,
    away_team_id: 0,
    field: "",
    holiday: false
  });

  const apiURL = 'http://localhost:3001/api/v1'
  
  const getSchedule = useCallback(() => {
    axios
      .get(`${apiURL}/schedules`)
      .then(response => {
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        setSchedule(response.data);
      })
  }, [error])

  const submitGame = () => {
    const url = `${apiURL}/schedules`
    axios
      .post(url,
        { 
          ...game
        })
      .then(response => {
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        console.log('game', game);
        getSchedule();
      })   
  }

  const removeGame = (gameId) => {
    const url = `${apiURL}/schedules/${gameId}`;
    axios
      .delete(url)
      .then(response => {
        console.log('response', response);
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        getSchedule();
      })
      .catch(errors => {
        setError({
          ...error,
          messages: [errors], 
          code: "500"
        })
      })
  }

  useEffect(() => {
    getSchedule()
  }, [getSchedule])

  const  createData = (gameId, gameDate, gameTime, awayTeam, homeTeam, field, remove) => {
    return { gameId, gameDate, gameTime, awayTeam, homeTeam, field, remove};
  }
  const rows = schedule.map(game => {
    return (
      createData(game.id, game.game_date, game.game_time, game.away_team.name, game.home_team.name, game.field, <Remove />)
    )
  });

  // Get human-readable date
  // Splice out the day of the week, add commas to the date
  // Output should be e.g. "Aug 30, 2021"
  const getDate = (date) => {
    console.log('date', date);
    let newDate = date.split('/');
    const months = {
      '01': "Jan",
      '02': "Feb",
      '03': "Mar",
      '04': "Apr",
      '05': "May",
      '06': "Jun",
      '07': "Jul",
      '08': "Aug",
      '09': "Sep",
      '10': "Oct",
      '11': "Nov",
      '12': "Dec"
    }

    return `${months[newDate[0]]} ${newDate[1]}, ${newDate[2]}`;
  }

  // Need to specify that only managers of this team can add/remove players
  let adminAllowed = false
  if (user.role === "Admin") {
    adminAllowed = true;
  }

  return (
    <GameContext.Provider value={{game, setGame}}>
      <div className="mobile-table">
        {adminAllowed && <AddGame submitGame={() => submitGame()}/>}
        {error && 
          <Errors error={error}/>
        }
        <h2>Schedule 2021</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <caption>Current Schedule for 2021</caption>
            <TableHead>
              <TableRow>
                <TableCell align="center">Game Date</TableCell>
                <TableCell align="center">Game Time</TableCell>
                <TableCell align="center">Away Team</TableCell>
                <TableCell align="center">Home Team</TableCell>
                <TableCell align="center">Field</TableCell>
                {user.role === "Admin" &&
                  <TableCell align="center">Options</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))
                .map((row) => (
                <TableRow key={row.gameId}>
                  <TableCell align="center" component="th" scope="row">
                    {row.gameDate ? getDate(row.gameDate) : ""}
                  </TableCell>
                  <TableCell align="center">{row.gameTime}</TableCell>
                  <TableCell align="center">{row.awayTeam}</TableCell>
                  <TableCell align="center">{row.homeTeam}</TableCell>
                  <TableCell align="center">{row.field}</TableCell>
                  {user.role === "Admin" &&
                    <TableCell align="center">
                      <IconButton onClick={() => removeGame(row.gameId)}>
                        {row.remove}
                      </IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </GameContext.Provider>
  )
}; 

export default Schedule;
