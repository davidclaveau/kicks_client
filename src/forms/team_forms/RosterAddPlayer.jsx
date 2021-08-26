import { useState, useEffect, createRef } from 'react';
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
  const searchTerm = useDebounce(value, 400);
  const addPlayerRef = createRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const url = `http://localhost:3001/api/v1/users/${searchTerm}`;
    axios
      .get(url)
      .then(response => {
      console.log("response",response)})
  }, [searchTerm])

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
        <DialogContentText>
          {}
        </DialogContentText>
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