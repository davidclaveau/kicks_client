import { 
  useState,
  useEffect,
  useCallback,
  useContext
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [teams, setTeams] = useState([]);
  const [away, setAway] = useState({name: "Away Team"});
  const [home, setHome] = useState({name: "Home Team"});
  const { game, setGame } = useContext(GameContext);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setName = (homeAway, team) => {
    if (homeAway === "Home") {
      // setGame
      setHome(team)
    }

    setAway(team)
    handleClose()
  }

  return (
    <div className={classes.buttons}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <span className={classes.icon}>
          {props.team === "Home" ? <HomeIcon /> : <CardTravelIcon />}
        </span>
        {props.team === "Home" ? home.name : away.name }
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {teams.filter(team => team.active === true).map(team => {
            return (
              <StyledMenuItem onClick={() => setName(props.team, team)}>
                <ListItemIcon>
                  {props.team === "Home" ? <HomeIcon fontSize="small" /> : <CardTravelIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText primary={team.name} />
              </StyledMenuItem>
            )
          })}
      </StyledMenu>
    </div>
  );
}

export default SelectTeam; 