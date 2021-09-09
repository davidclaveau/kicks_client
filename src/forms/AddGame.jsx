import { useState } from 'react';

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
  optionForms: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "10px"
  }, teamButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

const AddGame = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { submitGame } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
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
          <div className={classes.optionForms}>
            <div className={classes.teamButtons}>
              <SelectTeam />
            </div>
            <SelectField />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={() => {
              handleClose();
              submitGame();
            }}
            color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddGame;