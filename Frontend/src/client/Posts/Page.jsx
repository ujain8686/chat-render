import React, { useEffect, useState } from "react";
import "./page.css";
import Card from "./Card";
import { posts } from "./data";
import { io } from "socket.io-client";

// let socket = io("http://localhost:3001");

const Login = () => {
  const [username, sestUsername] = useState("");
  const [user, sestUser] = useState("");
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit("new_user", username);
    }
  }, [user]);

  useEffect(() => {
    socket.on("get_notification", ({ likedBy, likedTo }) => {
      setNotifications((n) => [...n, { likedBy, likedTo }]);
    });
  }, [liked]);

  return (
    <>
      {user == "" ? (
        <div className="login-container">
          <span className="login">Login</span>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={(e) => sestUsername(e.target.value)} />
          <button onClick={() => sestUser(username)}>Login</button>
        </div>
      ) : (
        <div className="posts-container">
          <div className="navbarr">
            <span className="not" onClick={() => setOpen(!open)}>
              Notifications <span className="count">{notifications?.length}</span>
            </span>
          </div>
          <div className="posts">
            {posts?.map((post) => {
              return (
                <Card key={post.id} data={post} socket={socket} user={user} />
              );
            })}
          </div>
          {open && (
            <div className="notifications">
              {notifications?.map((not) => {
                return <p>{`${not.likedBy} liked your post`}</p>;
              })}
            </div>
          )}
          <span style={{ color: "green" }}>{user}</span>
        </div>
      )}
    </>
  );
};

export default Login;
