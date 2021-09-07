import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core'
import { UserContext } from '../contexts/userContext';
import Errors from './Errors';
import './Teams.css';

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Remove from '@material-ui/icons/RemoveCircle';
import Add from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Render all teams in the league using the Team component
// Provide the team name, manager, and manager name
const Teams = (props) => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const { history } = props
  const { user } = useContext(UserContext);
  const [error, setError] = useState("")
  
  const apiURL = 'http://localhost:3001/api/v1';
  const getTeams = useCallback(() => {
    axios
      .get(`${apiURL}/teams`)
      .then(response => setTeams(response.data))
  }, [])

  useEffect(() => {
    getTeams()
  }, [getTeams]);
  

  // Each team will have its kit, name, and manager displayed
  // Teams are only visible if they're currently active
  // Team id is provided for users to visit roster page
  // Also have the add/remove buttons for admin to add or remove teams
  const  createData = (team, manager_name, jersey, roster, id, active, remove, add) => {
    return { team, manager_name, jersey, roster, id, active, remove, add };
  }
  const rows = teams.map(team => {
    return (
      createData(`${team.name}`,`${team.manager.manager_first_name} ${team.manager.manager_last_name}`,`${team.jersey_img}`, <PeopleAltIcon />, `${team.id}`, `${team.active}`, <Remove />, <Add /> )
    )
  });
    
  // Get the team roster when selecting the roster button
  const getRoster = id => {history.push({ pathname: `/roster/${id}`, state: { id: id }})}

  // Remove the team from the league
  // Set the team's "active" status to false
  const setInactive = (id) => {
    const url = `${apiURL}/teams/${id}`;
    axios
    .patch(url,
      { 
        active: false
      }
      )
      .then(response => {
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        getTeams();
      })
    }
    
  // Add the team to the league
  // Set the team's "active" status to true
  const setActive = (id) => {
    const url = `${apiURL}/teams/${id}`;
    axios
      .patch(url,
        { 
          active: true
        }
      )
      .then(response => {
        if (response.data.errors) {
          setError({
            ...error,
            messages: [...response.data.errors], 
            code: response.data.status
          })
        }
        getTeams();
      })
  }

  return (
    <div className="mobile-table">
      {error && 
        <Errors error={error}/>
      }
      <h2>2021 League</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <caption>Active teams for the 2021 season</caption>
          <TableHead>
            <TableRow>
              <TableCell>Kit</TableCell>
              <TableCell align="left">Team Name</TableCell>
              <TableCell align="right">Manager</TableCell>
              <TableCell align="right">Roster</TableCell>
              {user.role === "Admin" &&
                <TableCell align="center">Remove</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.filter(row => row.active === "true").map((row) => (
              <TableRow key={row.team}>
                <TableCell component="th" scope="row">
                  {row.jersey}
                </TableCell>
                <TableCell align="left">{row.team}</TableCell>
                <TableCell align="right">{row.manager_name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => getRoster(row.id)} >
                    {row.roster}
                  </IconButton>
                </TableCell>
                {user.role === "Admin" &&
                  <TableCell align="center">
                    <IconButton onClick={() => setInactive(row.id)}>
                      {row.remove}
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      {user.role === "Admin" && 
        <>
        <h2>Inactive Teams (Only Visible to Admin)</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <caption>Inactive teams</caption>
            <TableHead>
              <TableRow>
                <TableCell>Kit</TableCell>
                <TableCell align="left">Team Name</TableCell>
                <TableCell align="right">Manager</TableCell>
                <TableCell align="right">Roster</TableCell>
                {user.role === "Admin" &&
                  <TableCell align="center">Add</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.filter(row => row.active === "false").map((row) => (
                <TableRow key={row.team}>
                  <TableCell component="th" scope="row">
                    {row.jersey}
                  </TableCell>
                  <TableCell align="left">{row.team}</TableCell>
                  <TableCell align="right">{row.manager_name}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => getRoster(row.id)} >
                      {row.roster}
                    </IconButton>
                  </TableCell>
                  {user.role === "Admin" &&
                    <TableCell align="center">
                      <IconButton onClick={() => setActive(row.id)}>
                        {row.add}
                      </IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      }
    </div>
  );
}

export default Teams;
