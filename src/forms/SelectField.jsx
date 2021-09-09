import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/gameContext'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '29ch',
    },
  },
}));

const SelectField = () => {
  const classes = useStyles();
  const [field, setField] = useState("");
  const { game, setGame } = useContext(GameContext);

  useEffect(() => {
    setGame({
      ...game,
      field: field
    })
  }, [field, setGame])

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <TextField
        id="standard-basic" 
        label="Field"
        value={field}
        onChange={e => {setField(e.target.value)}}
        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
      />
    </form>
  );
}

export default SelectField;