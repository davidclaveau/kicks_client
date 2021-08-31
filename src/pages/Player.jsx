const Player = (props) => {

  return (
    <tr onClick={props.onSelect}>
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.winterTeam}</td>
      <td>{props.publicSector}</td>
    </tr>
  )
}

export default Player;