import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../contexts/gameContext';

import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const DateAndTimePicker = () => {
  // const classes = useStyles();
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
    // Date as yyyy-mm-dd
    const gameDate = selectedDate.toISOString().slice(0,10)
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
    })
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
      <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DateAndTimePicker;