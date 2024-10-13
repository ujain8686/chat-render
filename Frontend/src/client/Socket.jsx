import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./socket.css";

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
    Notification.requestPermission().then((per) => console.log(per)).catch((err)=>console.log(err));
    socket.on("receive_message", (newMessage) => {
      if (Notification.permission == "granted") {
        new Notification("New message...", { body: newMessage.message });
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // return () => {
    //   socket.off("receive_message");
    // };
  }, []);

  return (
    <div className="container">
      <div style={{ margin: "0px 10px" }}>
        <h1>Welcome to Chat Rooms!! </h1>
        <h2>Created by Ujjwal Jain</h2>
        <form onSubmit={joinRoom} className="room-form">
          {/* <label htmlFor="room">Enter room number: </label> */}
          <br />
          <input
            type="number"
            id="room"
            onChange={(e) => setRoomNumber(e.target.value)}
            value={roomNumber}
            readOnly={isInRoom}
            placeholder="Enter room number.."
            className="msg-input"
          />
          <button disabled={isInRoom || roomNumber == ""} className="button-23">
            {isInRoom ? "Joined" : "Join"}
          </button>
        </form>

        <br />
        <br />
        <br />
      </div>
      <div className="messages-container">
        <div className="heading">
          <h3>Chats... </h3>
        </div>
        <div className="msgs">
          {messages.map((msg) => {
            return (
              <span
                className={msg.userID == userID ? "msg-right" : "msg-left"}
                key={Math.random()}
              >
                {msg.message}
              </span>
            );
          })}
          <form onSubmit={sendMessage} className="msg-form">
            {/* <label htmlFor="messageBox">Type your message here :</label> */}
            {/* <br /> */}
            <input
              type="text"
              id="messageBox"
              className="msg-input"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter your message..."
              disabled={roomNumber == ""}
            />
            <button disabled={!isInRoom} className="button-23">
              <span className="btn-span">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Socket;
