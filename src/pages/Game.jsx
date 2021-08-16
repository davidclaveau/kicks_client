const Game = (props) => {

  if (props.holiday) {
    return (
      <tr>
        <td>Holiday</td>
        <td>--</td>
        <td>--</td>
        <td>--</td>
        <td>--</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.gameDate}</td>
      <td>{props.gameTime}</td>
      <td>{props.awayTeam}</td>
      <td>{props.homeTeam}</td>
      <td>{props.field}</td>
    </tr>
  )
}

export default Game
