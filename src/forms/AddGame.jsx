import { useState } from 'react';
import { GameContext } from '../contexts/gameContext';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TodayIcon from '@material-ui/icons/Today';
import SelectTeam from './SelectTeam';
import DatePicker from './DateAndTimePicker';
import SelectField from './SelectField';


const useStyles = makeStyles((theme) => ({
  adminBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  button: {
    margin: theme.spacing(1)
  },
  options: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  optionButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px"
  }
}));

const AddGame = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("game", game)

  return (
    <GameContext.Provider value={{game, setGame}}>
      <div className={classes.adminBar}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<TodayIcon />}
          onClick={handleClickOpen}
        >
          Add Game
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          <DialogTitle id="alert-dialog-title">{"Schedule a game"}</DialogTitle>
          <DialogContent className={classes.options}>
            <DatePicker />
            <div className={classes.optionButtons}>
              <SelectTeam team={"Away"}/>
              <SelectField />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </GameContext.Provider>
  );
}

export default AddGame;