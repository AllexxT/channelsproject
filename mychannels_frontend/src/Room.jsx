import { useRef, useEffect, useState } from "react";

const Txtfield = ({ text }) => {
  return (
    <>
      <textarea id="chat-log" cols="100" rows="20">
        {text}
      </textarea>{" "}
      <br />
    </>
  );
};

function Room() {
  let inputText = useRef(null);
  const [room, setRoom] = useState();
  const [chatText, setChatText] = useState("");
  let ws = useRef(null);

  useEffect(() => {
    const roomName = window.location.pathname.split("/")[1];
    setRoom(roomName);
    ws.current = new WebSocket(
      "ws://" + "127.0.0.1:8000" + "/ws/chat/" + roomName + "/"
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("Chat socket closed unexpectedly");
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      document.querySelector("#chat-log").value = data.message + "\n";
    };
  }, []);

  //   const roomName = window.location.pathname.split("/")[1];

  //   const chatSocket = new WebSocket(
  //     "ws://" + "127.0.0.1:8000" + "/ws/chat/" + roomName + "/"
  //   );

  //   chatSocket.onmessage = function (e) {
  //     console.log("ON MESSAGE!");
  //     const data = JSON.parse(e.data);
  //     console.log(data.message);
  //     document.querySelector("#chat-log").value = data.message + "\n";
  //   };

  //   chatSocket.onclose = function (e) {
  //     console.error("Chat socket closed unexpectedly");
  //   };

  const sendMessage = (e) => {
    console.log("SEND MESSAGE CALLBACK");

    const messageToSend = JSON.stringify({
      message: inputText.current.value,
      room: room,
    });
    ws.current.send(messageToSend);
    inputText.current.value = "";
  };
  return (
    <div className="Room">
        <Txtfield text={chatText}/>
      <input
        ref={inputText}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
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
