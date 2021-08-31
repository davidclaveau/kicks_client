import { useState, useEffect, createRef, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import useDebounce from "../../hooks/useDebounce";
import Player from '../../pages/Player';

const useStyles = makeStyles((theme) => ({
  adminBar: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Form = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const searchTerm = useDebounce(value, 500);
  const addPlayerRef = createRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const url = `http://localhost:3001/user_search?q=${searchTerm}`;
    axios
      .get(url)
      .then(response => {
        console.log("response", response.data)
        setResults([...response.data])
      })
  }, [searchTerm])
  
  const playerMap = results.map(player => {
    return (
      <Player
        key={player.id}
        firstName={player.first_name}
        lastName={player.last_name}
        publicSector={player.public_sector}
        winterTeam={player.winter_team}
      />
    )
  })

  return (
    <div className={classes.adminBar}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<PersonAddIcon />}
        onClick={handleClickOpen}
      >
        Add Player
      </Button>
      <Dialog ref={addPlayerRef} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please search for a player to add to the team.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Player Name"
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
            fullWidth
          />
        </DialogContent>
          <div>
            <table className="tableClass">
              <tbody>
                <tr>
                  <th>Player</th>
                  <th>Winter Team</th>
                  <th>Public Sector</th>
                </tr>
                {results.length > 0 ? playerMap : ""}
              </tbody>
            </table>
          </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;