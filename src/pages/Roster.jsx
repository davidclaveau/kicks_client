import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
import Remove from '@material-ui/icons/RemoveCircle';

import RosterAddPlayer from '../forms/team_forms/RosterAddPlayer';
import Errors from './Errors';
import './Roster.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Provide player information for each team
// Roster ID is passed as location.state.id from the Team component
const Roster = (props) => {
  const classes = useStyles();
  const [roster, setRoster] = useState([{
    team: {
      id: 0,
      manager: {
        manager_id: 0,
        manager_first_name: "Manager",
        manager_last_name: "Manager"
      },
      name: "team"
    },
    user: {
      id: 0,
      email: "email@email.com",
      first_name: "First",
      last_name: "Last",
      password_digest: "",
      phone_number: "555-555-5555",
      public_sector: "Public Sector",
      winter_team: "Winter Team"
    }
  }]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState("")

  const apiURL = 'http://localhost:3001/api/v1';  
  const getRoster = useCallback(() => {
    axios
    .get(`${apiURL}/rosters/${props.location.state.id}`)
    .then(response => {
      setRoster([
        ...response.data
      ]);
    })
  }, [props.location.state.id])
  
  useEffect(() => {
    getRoster()
  }, [getRoster])

  // Selecting "Add Player" button will render the RosterAddPlayer component
  // The user can select the player to add, the team_id and user_is returned
  // This selected player is added to the team, Roster component rerenders
  const addPlayer = (team_id, user_id) => {
    const url = `${apiURL}/rosters`;
    axios
      .post(url,
        { 
          user_id: user_id,
          team_id: team_id
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
        getRoster();
      })
  }

  // Player is removed using their roster id
  // Roster component is rerendered
  const removePlayer = (roster_id) => {
    const url = `${apiURL}/rosters/${roster_id}`;
    axios
      .delete(url)
      .then(response => {
        getRoster();
      })
  }

  const  createData = (rosterId, userId, teamId, player, winterTeam, publicSector, remove) => {
    return { rosterId, userId, teamId, player, winterTeam, publicSector, remove };
  }
  const rows = roster.map(roster => {
    return (
      createData(roster.id, roster.user.id, roster.team.id, `${roster.user.first_name} ${roster.user.last_name}`, roster.user.winter_team, roster.user.public_sector, <Remove />)
    )
  });

  // Need to specify that only managers of this team can add/remove players
  let adminAllowed = false
  if (user.role === "Admin") {
    adminAllowed = true;
  }

  return (
      <>
      {adminAllowed && <RosterAddPlayer roster={roster} addPlayer={addPlayer}/>}
       {error && 
         <Errors error={error}/>
       }
      <h2>{roster[0].team.name}</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <caption>Active roster for the {roster[0].team.name}</caption>
            <TableHead>
              <TableRow>
                <TableCell>Player Name</TableCell>
                <TableCell align="left">Winter Team</TableCell>
                <TableCell align="right">Public Sector</TableCell>
                {user.role === "Admin" &&
                  <TableCell align="center">Remove</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.rosterId}>
                  <TableCell component="th" scope="row">
                    {row.player}
                  </TableCell>
                  <TableCell align="right">{row.winterTeam}</TableCell>
                  <TableCell align="right">{row.publicSector}</TableCell>
                  {user.role === "Admin" &&
                    <TableCell align="center">
                      <IconButton onClick={() => removePlayer(row.rosterId)}>
                        {row.remove}
                      </IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
};

export default Roster;
