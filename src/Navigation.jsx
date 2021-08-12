import React, { useContext } from 'react';
import { ComponentContext } from "./contexts/componentContext";

import Home from './pages/Home'
import Notices from './pages/Notices'
import Schedule from './pages/Schedule'
import Teams from './pages/Teams'

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import NoticeIcon from '@material-ui/icons/Announcement';
import ScheduleIcon from '@material-ui/icons/DateRange';
import MapIcon from '@material-ui/icons/Map';
import TeamsIcon from '@material-ui/icons/Group';
import ScrimmageIcon from '@material-ui/icons/SportsSoccer';
import SafetyIcon from '@material-ui/icons/Security';
import AwardsIcon from '@material-ui/icons/EmojiEvents';
import RulesIcon from '@material-ui/icons/Assignment';
import MembershipIcon from '@material-ui/icons/Stars';
import DisciplineIcon from '@material-ui/icons/Gavel';
import DocumentsIcon from '@material-ui/icons/Description';
import SponsorsIcon from '@material-ui/icons/AccountBalance';
import ContactsIcon from '@material-ui/icons/RecentActors';
import LoginIcon from '@material-ui/icons/LockOpen';

const Navigation = () => {
  const { setComponent } = useContext(ComponentContext);

  return (
    <>
      <List>
        <ListItem button key={'Home'} onClick={() => setComponent(<Home />)} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Notices'} onClick={() => setComponent(<Notices />)}>
          <ListItemIcon>
            <NoticeIcon />
          </ListItemIcon>
          <ListItemText primary={'Notices'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Schedule'} onClick={() => setComponent(<Schedule />)}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary={'Schedule'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Maps'}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary={'Maps to Fields'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Teams'} onClick={() => setComponent(<Teams />)}>
          <ListItemIcon>
            <TeamsIcon />
          </ListItemIcon>
          <ListItemText primary={'Team'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Over40s'}>
          <ListItemIcon>
            <ScrimmageIcon />
          </ListItemIcon>
          <ListItemText primary={'Over-40s: Scrims'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'PlayerSafety'}>
          <ListItemIcon>
            <SafetyIcon />
          </ListItemIcon>
          <ListItemText primary={'Player Safety'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Awards'}>
          <ListItemIcon>
            <AwardsIcon />
          </ListItemIcon>
          <ListItemText primary={'Awards'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'LeagueRules'}>
          <ListItemIcon>
            <RulesIcon />
          </ListItemIcon>
          <ListItemText primary={'League Rules'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Membership'}>
          <ListItemIcon>
            <MembershipIcon />
          </ListItemIcon>
          <ListItemText primary={'Membership'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Discipline'}>
          <ListItemIcon>
            <DisciplineIcon />
          </ListItemIcon>
          <ListItemText primary={'Discipline'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Documents'}>
          <ListItemIcon>
            <DocumentsIcon />
          </ListItemIcon>
          <ListItemText primary={'Documents'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Sponsors'}>
          <ListItemIcon>
            <SponsorsIcon />
          </ListItemIcon>
          <ListItemText primary={'Sponsors'} />
        </ListItem>
      </List>
      <List>
        <ListItem button key={'Contacts'}>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary={'Contacts'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Login'}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary={'Login'} />
        </ListItem>
      </List>
    </>
  )
}

export default Navigation
