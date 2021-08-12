import React, { useContext } from 'react';
import { ComponentContext } from './contexts/componentContext'

import './Content.css';

import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Content = () => {
  const classes = useStyles();
  const {component} = useContext(ComponentContext);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {component}
    </main>
  )
}

export default Content
