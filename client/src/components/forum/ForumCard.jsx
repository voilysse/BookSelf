import React from "react";
import { Link } from "react-router-dom";

const ForumCard = ({ thread }) => {
  return (
    <div>
      <h3>{thread.title}</h3>
      <p>{thread.description}</p>
      
      <p>Created by: <Link to={`/users/${thread.user._id}`}>{thread.user?.username}</Link></p>
      <Link to={`/forum/thread/${thread._id}`}>View Discussion</Link>
    </div>
  );
};

export default ForumCard;
