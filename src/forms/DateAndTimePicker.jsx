import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../contexts/gameContext';
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  dateAndTime: {
    margin: "16px 10px 8px 10px"
  }
}));


const DateAndTimePicker = () => {
  const classes = useStyles();
  const { game, setGame } = useContext(GameContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    const daysOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    }
    
    // Day of week as number  
    const gameDay = daysOfWeek[selectedDate.getDay()];
    // Date as dd/mm/yyyy
    const gameDate = selectedDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}).slice(0,10)
    // Get year to indicate the season
    const year = selectedDate.getFullYear();
    // Time as 24-hour, e.g. "18:00"
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    // Ensure time has two zeros for top of the hour
    const gameTime = `${hour}:${minutes === 0 ? "00" : minutes}`

    setGame({
      ...game,
      game_date: gameDate,
      game_day: gameDay,
      game_time: gameTime,
      season: year
    })
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <Grid container justifyContent="space-around">
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Game Date"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.dateAndTime}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Kickoff Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            className={classes.dateAndTime}
          />
        </Grid>
      </MuiPickersUtilsProvider>
  );
}

export default DateAndTimePicker;