import Typography from '@material-ui/core/Typography'

const Team = (props) => {
  return (
    <>
      <li>
        <Typography variant="h3">
          {props.teamName}
        </Typography>
        <Typography variant="h5">
          {props.managerFirstName} {props.managerLastName}
        </Typography>
      </li>
    </>
  )
}

export default Team;
