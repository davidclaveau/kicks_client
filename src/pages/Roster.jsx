import { useState, useEffect } from 'react';
import axios from 'axios';



const Roster = (props) => {
  const [rosters, setRoster] = useState([])

  const apiURL = 'http://localhost:3001/api/v1'
  
  useEffect(() => {
    getRoster()
  }, [])
  
  async function getRoster() {
    try {
      const response = await axios.get(`${apiURL}/rosters`);
      setRoster(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("rosters", rosters)

  // const rosterMap = rosters.map(team => {
  //   return (
  //     <Team
  //       key={team.id}
  //       id={team.id}
  //       teamName={team.name}
  //       managerID={team.manager.manager_id}
  //       managerFirstName={team.manager.manager_first_name}
  //       managerLastName={team.manager.manager_last_name}
  //     />
  //   )
  // })


  return (
    <div>
      This is the Roster component.

      <h5>
        {props.id}
      </h5>
    </div>
  )
};

export default Roster;
