import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './Errors.css';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  alertList: {
    width: '100%',
    listStyle: 'none',
    paddingLeft: '0'
  }
}));



const Errors = (props) => {
  const classes = useStyles();
  const [error, setError] = useState("")

  useEffect(() => {
    setError(props.error)

    setTimeout(() => {
      setError("")
    }, 5000);
  }, [props.error])
  
  return (
    <div className={"fade-out"}>
      {error && 
        <ul className={classes.alertList}>
          {error.messages.map(message => {
            return (
              <li>
                <Alert className={classes.alert} variant="filled" severity="error">{message}
                </Alert>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default Errors
