import { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { ComponentContext } from '../contexts/componentContext';

import Roster from './Roster';

const Team = (props) => {
  const { setComponent } = useContext(ComponentContext);

  return (
    <>
      <li>
        <Typography variant="h3">
          <div onClick={() => {setComponent(<Roster id={props.id}/>)}}>
            {props.teamName}
          </div>
        </Typography>
        <Typography variant="h5">
          {props.managerFirstName} {props.managerLastName}
        </Typography>
      </li>
    </>
  )
}

export default Team;
