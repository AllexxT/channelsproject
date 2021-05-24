import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";



function Hallway() {  
  const nameInput = useRef(null)
  let history = useHistory();
  useEffect(() => {
    nameInput.current.focus()
  }, []);
  const createRoom = (e) => {
    const roomName = nameInput.current.value
    console.log(roomName)
    history.push(`/${roomName}`)
  }
  return (
    <div className="Hallway">
      What chat room would you like to enter?
      <br />
      <input ref={nameInput} id="room-name-input" type="text" size="100" />
      <br />
      <input onClick={e => createRoom(e)} id="room-name-submit" type="button" value="Enter" />
    </div>
  );
}

export default Hallway;
