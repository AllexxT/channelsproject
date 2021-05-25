import { useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";

const roomName = window.location.pathname.split("/")[1];
const chatSocket = new WebSocket(
  "ws://" + "127.0.0.1:8000" + "/ws/chat/" + roomName + "/"
);

function Room() {
  let inputText = useRef(null);
  let chatField = useRef(null);

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if(data.message) document.querySelector("#chat-log").value += data.message + "\n";
  };

  chatSocket.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
  };

  const sendMessage = (e) => {
    const messageToSend = JSON.stringify({
      message: inputText.current.value,
      room: roomName,
    });
    chatSocket.send(messageToSend);
    inputText.current.value = "";
  };
  console.log("render");
  return (
    <div className="Room">
      <textarea className="w-5" ref={chatField} id="chat-log" cols="80" rows="20" /> <br />
      <input
        ref={inputText}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
        id="chat-message-input"
        type="text"
        size="75"
      />{" "}
      <br />
      <Button onClick={(e) => sendMessage(e)} className="w-5 ml-1 mt-1" size="sm">
        Send
      </Button>
    </div>
  );
}

export default Room;
