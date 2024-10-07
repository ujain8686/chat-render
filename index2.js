import { Server } from "socket.io";

let io = new Server({
  cors: {
    origin: "*",
  },
});

let onlineUsers = [];

const addUser = (username, socketID) => {
  !onlineUsers.some((user) => user.name == username) &&
    onlineUsers.push({ username, socketID });

  console.log(onlineUsers);
};

const removeUser = (socketID) => {
  onlineUsers = onlineUsers.filter((user) => {
    return user.socketID != socketID;
  });
};

const getUser = (username) => {
  let likedTo = username.split(" ")[0];
  console.log(likedTo, "abc");
  let user = onlineUsers.find((user) => user.username.toLowerCase() == likedTo.toLowerCase());
  return user;
};

io.on("connection", (socket) => {
  console.log("new user connected with id : " + socket.id);

  socket.on("new_user", (username) => {
    addUser(username, socket.id);
  });

  socket.on("like_post", ({ likedBy, likedTo }) => {
    let userTo = getUser(likedTo);
    console.log(userTo, "usrto");

    io.to(userTo?.socketID).emit("get_notification", { likedBy, likedTo });
  });

  socket.on("remove_user", () => {
    console.log("user disconneced : " + socket.id);

    removeUser(socket.id);
  });
});

io.listen(3001, () => {
  console.log("Server is running..");
});
