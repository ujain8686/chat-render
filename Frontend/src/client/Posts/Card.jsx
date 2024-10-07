import React, { useState } from "react";

const Card = ({ data, socket, user }) => {

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
    socket.emit("like_post", {likedBy: user, likedTo : data.fullname})
  }
  return (
    <div className="card">
      <img src={data.postImg} />
      <div className="userinfo">
        <img src={data.userImg} />
        <p>{data.fullname}</p>
      </div>
      <div className="icons">
        <span onClick={handleLike}>Like</span>
      </div>
    </div>
  );
};

export default Card;
