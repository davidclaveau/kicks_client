import { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team';
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

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Render all teams in the league using the Team component
// Provide the team name, manager, and manager name
const Teams = (props) => {
  const [teams, setTeams] = useState([]);
  const apiURL = 'http://localhost:3001/api/v1';
  const classes = useStyles();
  const { history } = props

  useEffect(() => {
    getTeams()
  }, []);
  
  const getTeams = () => {
    axios
      .get(`${apiURL}/teams`)
      .then(response => setTeams(response.data))
  };

  // Each team will have its kit, name, and manager displayed
  // Teams are only visible if they're currently active
  // Team id is provided for users to visit roster page
  const  createData = (team, manager_name, jersey, roster, id, active) => {
    return { team, manager_name, jersey, roster, id, active };
  }
  const rows = teams.map(team => {
    return (
      createData(`${team.name}`,`${team.manager.manager_first_name} ${team.manager.manager_last_name}`,`${team.jersey_img}`, <PeopleAltIcon />, `${team.id}`, `${team.active}` )
    )
  });
    
  const getRoster = (id) => {history.push({ pathname: `/roster/${id}`, state: { id: id }})}

  return (
    <>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Teams;
