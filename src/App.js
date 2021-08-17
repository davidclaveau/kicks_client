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
import Roster from './pages/Schedule';

import { makeStyles } from '@material-ui/core/styles'
import './App.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  content: {
    marginTop: '64px'
  }
})

const App = () => {
  const classes = useStyles();
  return (
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
            <Route exact path='/roster' render={props =>  <Roster {...props} />} />

            <Route exact path='/scrimmage' render={props =>  <Notices {...props} />} />
            <Route exact path='/safety' render={props =>  <Notices {...props} />} />
            <Route exact path='/awards' render={props =>  <Notices {...props} />} />
            <Route exact path='/rules' render={props =>  <Notices {...props} />} />
            <Route exact path='/membership' render={props =>  <Notices {...props} />} />
            <Route exact path='/discipline' render={props =>  <Notices {...props} />} />
            <Route exact path='/documents' render={props =>  <Notices {...props} />} />
            <Route exact path='/sponsorship' render={props =>  <Notices {...props} />} />
            <Route exact path='/contacts' render={props =>  <Notices {...props} />} />

            <Route exact path='/login' render={props =>  <Notices {...props} />} />
          </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
