import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div>
                  <p>{post.text}</p>

      <p>Created by: <Link to={`/users/${post.user._id}`}>{post.user?.username}</Link> on {post.created}</p>

    </div>
  );
};

export default PostCard;
