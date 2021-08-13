const Game = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Game Date</th>
          <th>Game Time</th>
          <th>Away Team</th>
          <th>Home Team</th>
          <th>Field</th>
        </tr>
        <tr>
          <td>{props.gameDate}</td>
          <td>{props.gameTime}</td>
          <td>{props.awayTeam}</td>
          <td>{props.homeTeam}</td>
          <td>{props.field}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Game
