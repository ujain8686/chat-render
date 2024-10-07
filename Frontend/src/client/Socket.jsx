import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://chat-render-hrm1.onrender.com");

const Socket = () => {
  const [userID, setUserID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [input, setInput] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join_room", { roomNumber });
    setUserID(Math.random());
    setIsInRoom(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setInput("");
    socket.emit("send_message", {
      message: input,
      room: roomNumber,
      userID,
    });
    setMessages((msgs) => [
      ...msgs,
      {
        message: input,
        room: roomNumber,
        userID,
      },
    ]);
  };

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // return () => {
    //   socket.off("receive_message");
    // };
  }, []);

  return (
    <div style={{display: "flex"}}>
      <div style={{margin: "0px 10px"}}>
        <h1>Welcome to Chat Rooms!! </h1>
        <h2>Created by Ujjwal Jain</h2>
        <form onSubmit={joinRoom}>
          <label htmlFor="room">Enter room number: </label>
          <br />
          <input
            type="number"
            id="room"
            onChange={(e) => setRoomNumber(e.target.value)}
            value={roomNumber}
            readOnly={isInRoom}
          />
          <button disabled={isInRoom}>
            {isInRoom ? "Joined" : "Join Room"}
          </button>
        </form>

        <br />
        <br />
        <br />
        <form onSubmit={sendMessage}>
          <label htmlFor="messageBox">Type your message here :</label>
          <br />
          <input
            type="text"
            id="messageBox"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button disabled={!isInRoom}>Send Message</button>
        </form>
      </div>
      <div>
        <h1>Messages: </h1>
        <br />
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            minHeight: 100,
            height: "auto",
            width: "600px",
            padding: 20,
          }}
        >
          {messages.map((msg) => {
            return (
              <p
                style={
                  msg.userID == userID
                    ? {
                        color: "red",
                        textAlign: "right",
                        overflowWrap: "break-word",
                      }
                    : {
                        color: "blue",
                        textAlign: "left",
                        overflowWrap: "break-word",
                      }
                }
                key={Math.random()}
              >
                {msg.message}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Socket;
