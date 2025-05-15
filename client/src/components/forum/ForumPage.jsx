import React from "react";
import { useParams } from "react-router-dom";
import { useGetThreadQuery } from "../../features/forumApi";
import PostCard from "./PostCard";

const ForumPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetThreadQuery(id);
  if (isLoading) return <p>Loading...</p>;
  if (error || !data?.thread) return <p>Forum not found</p>;

  return (
    <div>
      <h2>{data.thread.title}</h2>
      <p>{data.thread.text}</p>
      <p>By: {data.thread.user?.username}</p>

      <h3>Replies</h3>
      {data.thread.replies?.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        data.posts.map((p) => <PostCard key={p._id} post={p} />)

      )}

    </div>
  );
};

export default ForumPage;
