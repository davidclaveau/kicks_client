import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'


// Render each individual team in the league in Teams component
// Provide onClick to send user to team roster
const Team = (props) => {
  const { history } = props

  return (
    <li>
      <Typography variant="h3">
        <div onClick={() => history.push(
          {
            pathname: `/roster/${props.id}`,
            state: { id: props.id }
          }
        )}>
          {props.teamName}
        </div>
      </Typography>
      <Typography variant="h5">
        {props.managerFirstName} {props.managerLastName}
      </Typography>
    </li>
  )
}

export default withRouter(Team);
