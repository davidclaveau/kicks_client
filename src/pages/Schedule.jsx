import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
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
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    getSchedule()
  }, [getSchedule])

  const  createData = (gameId, gameDate, gameTime, awayTeam, homeTeam, field) => {
    return { gameId, gameDate, gameTime, awayTeam, homeTeam, field };
  }
  const rows = schedule.map(game => {
    return (
      createData(game.id, game.game_date, game.game_time, game.away_team.name, game.home_team.name, game.field)
    )
  });

  // Get human-readable date
  // Splice out the day of the week, add commas to the date
  // Output should be e.g. "Aug 30, 2021"
  const getDate = (date) => {
    let newDate = new Date(date).toDateString().split('');
    newDate.splice(0,3);
    newDate.splice(-5,0,',');
    newDate = newDate.join('');

    return newDate;
  }

  return (
    <div className="mobile-table">
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
                <TableCell align="right">Field</TableCell>
                {user.role === "Admin" &&
                  <TableCell align="center">Options</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.gameId}>
                  <TableCell align="center" component="th" scope="row">
                    {row.gameDate ? getDate(row.gameDate) : ""}
                  </TableCell>
                  <TableCell align="center">{row.gameTime}</TableCell>
                  <TableCell align="center">{row.awayTeam}</TableCell>
                  <TableCell align="center">{row.homeTeam}</TableCell>
                  <TableCell align="right">{row.field}</TableCell>
                  {user.role === "Admin" &&
                    <TableCell align="center">
                      <IconButton>
                        !
                      </IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}; 

export default Schedule;
