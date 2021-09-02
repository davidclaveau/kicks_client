import './AddPlayer.css';

const RosterPlayer = (props) => {

  
  return (
    <tr className={props.active ? "roster-table-row highlight" : "roster-table-row"} onClick={() => {
      props.onChosen()
      return (props.onSelect)
      }}
    >
      <td>{props.firstName} {props.lastName}</td>
      <td>{props.winterTeam}</td>
      <td>{props.publicSector}</td>
    </tr>
  )
}

export default RosterPlayer;