const Player = (props) => {

  console.log("props", props)

  return (
    <tr onClick={props.onSelect}>
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.winterTeam}</td>
      <td>{props.publicSector}</td>
      {props.onRemove &&
        <td onClick={props.onRemove}>Remove</td>
      }
    </tr>
  )
}

export default Player;