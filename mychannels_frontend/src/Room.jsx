import { useRef, useEffect } from "react";

const roomName = window.location.pathname.split("/")[1];
const chatSocket = new WebSocket(
    "ws://" + "127.0.0.1:8000" + "/ws/chat/" + roomName + "/"
    );


function Room() {
  let inputText = useRef(null);
  let chatField = useRef(null);

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    document.querySelector("#chat-log").value += data.message + "\n";
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
  console.log('render')
  return (
    <div className="Room">
      <textarea ref={chatField} id="chat-log" cols="100" rows="20" /> <br />
      <input
        ref={inputText}
        onKeyPress={e => e.key === "Enter" && sendMessage(e)}
        id="chat-message-input"
        type="text"
        size="100"
      />{" "}
      <br />
      <input
        onClick={(e) => sendMessage(e)}
        id="chat-message-submit"
        type="button"
        value="Send"
      />
    </div>
  );
}

export default Room;
