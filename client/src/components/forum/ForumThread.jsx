import React from "react";
import { useParams } from "react-router-dom";
import { useGetThreadQuery } from "../../features/forumApi";
import ForumPost from "./ForumPost";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const ForumThread = ({ thread, showReplies = true, allowReply = true, isReply = false }) => {
const n = new Date();
  const [now, setNow] = useState(n);
  const posted = new Date(thread.created);
  var secondsAgo = Math.floor((now - posted) / 1000);
  const timeSince = () => {
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    var count = secondsAgo;
    for (const i of intervals) {
      count = Math.floor(secondsAgo / i.seconds);
      if (count >= 1) {
        return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };
  const [time, setTime] = useState(() => timeSince());

  useEffect(() => {
    setNow(() => Date());
    secondsAgo = Math.floor((now - posted) / 1000);
    setTime(() => timeSince());
  }, 60000);


  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* thread Card */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
        <div className="flex gap-2 max-w-xs">
          {thread.tags.map((g) => (
            <Link
              to={`/tags/${g.toLowerCase()}`}
              key={g}
              className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-rat_lightest text-gray-800 hover:bg-rat_base hover:text-white transition"
            >
              {g}
            </Link>
          ))}
        </div>
        <div className="flex items-start justify-between my-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{thread.user?.username} • {time}</p>
          </div>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">{thread.text}</p>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Replies</h3>
        {thread.posts.length === 0 ? (
          <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
        ) : (
          thread.posts.map((post) => (
            <div key={post.id} className="rounded-xl border p-4 mx-4">
              <ForumPost
                post={post}
                showReplies={true}
                allowReply={true}
                isReply={false}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ForumThread;
