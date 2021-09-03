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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
    marginTop: theme.spacing(3),
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

const Signup = (props) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const { history } = props;

  const { setUser } = useContext(UserContext)

  const handleSignup = (event) => {
    event.preventDefault();

    // Make sure passwords match before attempting signup
    if (password === passwordConfirmation) {
      axios
        .post("http://localhost:3001/api/v1/users", {
          user: {
            email: email,
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
            password: password,
          }
        },
        { withCredentials: true}
        )
        .then(response => {
          if  (response.data.status === "created") {
            // If status comes back OK, log user in as well
            setUser({
              isLoggedIn: true,
              user: response.data.user
            })
            history.push('/')
          } else {
            // Spread the array of errors to share to user
            setError({
              ...error,
              messages: [...response.data.errors], 
              code: response.data.status
            })
          }
        })
        .catch(error => {
          console.log("error", error)
        });
    } else {
      setError({
        ...error,
        messages: ["Passwords do not match - please try again"], 
        code: "403"
      })
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && 
          <Errors error={error}/>
        }
        <form className={classes.form} onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={event => {setFirstName(event.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={event => {setLastName(event.target.value)}}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                label="Phone Number"
                name="phone_number"
                value={phoneNumber}
                onChange={event => {setPhoneNumber(event.target.value)}}
                autoComplete="phone_number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={event => {setEmail(event.target.value)}}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={event => {setPasswordConfirmation(event.target.value)}}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © BCGECSS 2021.'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;