import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/userContext';
import Errors from '../pages/Errors';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {setUser} = useContext(UserContext);
  const { history } = props;

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        user: {
          email: email,
          password: password,
        }
      },
      { withCredentials: true}
      )
      .then(response => {
        if (response.data.logged_in) {
          setUser({
            isLoggedIn: true,
            user: response.data.user,
            role: response.data.role
          })
          history.push('/')
        } else {
          setError({
            messages: [...response.data.errors],
            code: response.data.status
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {error && 
          <Errors error={error}/>
        }
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={event => {setEmail(event.target.value)}}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={event => {setPassword(event.target.value)}}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © BCGECSS 2021.'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;