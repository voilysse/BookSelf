import React from "react";
import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";

const ForumList = () => {
  const { data, isLoading, error } = useGetAllThreadsQuery();

  if (isLoading) return <p>Loading forums...</p>;
  if (error) return <p>Error loading forums</p>;

  return (
    <div>
      <h2>Forum Discussions</h2>
      {data?.threads?.length === 0 ? (
        <p>No forums yet.</p>
      ) : (
        data.threads.map((thread) => <ForumCard key={thread._id} thread={thread} />)
      )}
    </div>
  );
};

export default ForumList;
