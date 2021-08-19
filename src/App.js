import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './contexts/userContext';

import Dashboard from './Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home';
import Notices from './pages/Notices';
import Schedule from './pages/Schedule';
import Teams from './pages/Teams';
import Roster from './pages/Roster';
import Scrimmage from './pages/Scrimmage';
import Safety from './pages/Safety';
import Awards from './pages/Awards';
import Login from './login/Login';
import SignupRevamp from './login/Signup';

import { makeStyles } from '@material-ui/core/styles'
import './App.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    marginTop: '64px',
    paddingBottom: '50px'
  }
})

const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    user: {}
  });

  useEffect(() => {
    loginStatus();
  }, [])

  const loginStatus = () => {
    axios
      .get('http://localhost:3001/logged_in',
        {withCredentials:true})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data)
        } else {
          handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  const handleLogin = (data) => {
    setUser({
      isLoggedIn: true,
      user: data.user
    })
  }
  const handleLogout = () => {
    setUser({
    isLoggedIn: false,
    user: {}
    })
  }

  const classes = useStyles();

  console.log("current user", user)
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <div className={classes.container}>
          <Dashboard />
          <div className={classes.content}>
              <Switch>
                <Route exact path='/' render={props =>  <Home {...props} />} />
                <Route exact path='/notices' render={props =>  <Notices {...props} />} />
                <Route exact path='/schedule' render={props =>  <Schedule {...props} />} />
                <Route exact path='/map' render={props =>  <Notices {...props} />} />
                <Route exact path='/teams' render={props =>  <Teams {...props} />} />
                <Route exact path='/roster/:id' render={props =>  <Roster {...props} />} />

                <Route exact path='/scrimmage' render={props =>  <Scrimmage {...props} />} />
                <Route exact path='/safety' render={props =>  <Safety {...props} />} />
                <Route exact path='/awards' render={props =>  <Awards {...props} />} />
                <Route exact path='/rules' render={props =>  <Notices {...props} />} />
                <Route exact path='/membership' render={props =>  <Notices {...props} />} />
                <Route exact path='/discipline' render={props =>  <Notices {...props} />} />
                <Route exact path='/documents' render={props =>  <Notices {...props} />} />
                <Route exact path='/sponsorship' render={props =>  <Notices {...props} />} />
                <Route exact path='/contacts' render={props =>  <Notices {...props} />} />

                <Route exact path='/login' render={props =>  <Login {...props} />}/>
                <Route exact path='/signup' render={props =>  <SignupRevamp {...props} />}/>
              </Switch>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
