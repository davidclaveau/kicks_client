import React from 'react';
import {
  withRouter,
} from 'react-router-dom'

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

// Contains all of the icons and Router history for the links
// Can add or remove additional icons and links in the dashboardList array
const Navigation = (props) => {
  const { history } = props;

  // Optional function to close drawer after selecting page
  // Just need to change the history.push to call this function instead
  // const historyAndCloseDrawer = (url) => {
  //   history.push(url);
  //   props.closeDrawer();
  // }

  const dashboardList = [
    {  
      text: 'Home',
      icon: <HomeIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Notices',
      icon: <NoticeIcon />,
      onClick: () => history.push('/notices')
    },
    {
      text: 'Schedule',
      icon: <ScheduleIcon />,
      onClick: () => history.push('/schedule')
    },
    {
      text: 'Map',
      icon: <MapIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Teams',
      icon: <TeamsIcon />,
      onClick: () => history.push('/teams')
    },
    {
      text: 'Scrimmage',
      icon: <ScrimmageIcon />,
      onClick: () => history.push('/scrimmage')
    },
    {
      text: 'Safety',
      icon: <SafetyIcon />,
      onClick: () => history.push('/safety')
    },
    {
      text: 'Awards',
      icon: <AwardsIcon />,
      onClick: () => history.push('/awards')
    },
    {
      text: 'Rules',
      icon: <RulesIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Membership',
      icon: <MembershipIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Discipline',
      icon: <DisciplineIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Documents',
      icon: <DocumentsIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Sponsorship',
      icon: <SponsorsIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Contacts',
      icon: <ContactsIcon />,
      onClick: () => history.push('/')
    },
    {
      text: 'Login',
      icon: <LoginIcon />,
      onClick: () => history.push('/')
    }
  ]

  return (
    <>
      {dashboardList.map((nav => {
        const { text,  icon, onClick } = nav;
        return (
          <ListItem button key={text} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
          </ListItem>
        )
      }))}
    </>
  )
};

export default withRouter(Navigation);
