import { 
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { GameContext } from '../contexts/gameContext';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    display: "flex",
    paddingRight: "3px"
  }
}));

const SelectTeam = (props) => {
  const classes = useStyles();
  const [anchorElAway, setAnchorElAway] = useState(null);
  const [anchorElHome, setAnchorElHome] = useState(null);
  const { game, setGame } = useContext(GameContext);
  const [teams, setTeams] = useState([]);
  const [away, setAway] = useState({
    id: 0,
    name: "Away Team"
  });
  const [home, setHome] = useState({
    id: 0,
    name: "Home Team"
  });

  const apiURL = 'http://localhost:3001/api/v1'
  const getTeams = useCallback(() => {
    const url =  `${apiURL}/teams`
    axios
      .get(url)
      .then(response => {
        console.log("teams res", response.data)
        setTeams(response.data)

      })
  }, [])
  
  useEffect(() => {
    getTeams();
  }, [getTeams])

  useEffect(() => {
    console.log("away", away)
    console.log("home", home)
    setGame({
      ...game,
      home_team_id: home.id,
      away_team_id: away.id
    });

  }, [away, home, setGame])

  const handleClickAway = (event) => {
    setAnchorElAway(event.currentTarget);
  };
  
  const handleClickHome = (event) => {
    setAnchorElHome(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAway(null);
    setAnchorElHome(null);
  };

  const setName = (homeOrAway, team) => {
    if (homeOrAway === "Home") {
      setHome(team)
    }
    if (homeOrAway === "Away") {
      setAway(team)
    }

    handleClose()
  }

  return (
    <>
      <div className={classes.buttons}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClickAway}
        >
          <span className={classes.icon}>
            <CardTravelIcon />
          </span>
          { away.name }
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorElAway}
          keepMounted
          open={Boolean(anchorElAway)}
          onClose={handleClose}
        >
            {teams.filter(team => team.active === true
                          && team.name !== away.name
                          && team.name !== home.name)
                  .map(team => {
              return (
                <StyledMenuItem onClick={() => setName("Away", team)}>
                  <ListItemIcon>
                    <CardTravelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={team.name} />
                </StyledMenuItem>
              )
            })}
        </StyledMenu>
      </div>

      <div className={classes.buttons}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClickHome}
      >
        <span className={classes.icon}>
          <HomeIcon />
        </span>
        {home.name}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorElHome}
        keepMounted
        open={Boolean(anchorElHome)}
        onClose={handleClose}
      >
          {teams.filter(team => team.active === true && team.name !== away.name && team.name !== home.name).map(team => {
            return (
              <StyledMenuItem onClick={() => setName("Home", team)}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={team.name} />
              </StyledMenuItem>
            )
          })}
      </StyledMenu>
    </div>
  </>
  );
}

export default SelectTeam; 