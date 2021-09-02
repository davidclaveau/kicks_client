import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const AddPlayer = (props) => {

  return (
    <tr>
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.winterTeam}</td>
      <td>{props.publicSector}</td>
      {props.onRemove &&
        <td>
          <IconButton>
            <CancelIcon onClick={props.onRemove} color="secondary"/>
          </IconButton>
        </td>
      }
    </tr>
  )
}

export default AddPlayer;