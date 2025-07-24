import { Link } from "react-router-dom";
import { useGetPostsForThreadQuery } from "../../features/forumApi";
import { useEffect, useState } from "react";

const ForumCard = ({ thread }) => {
  const { data, isLoading } = useGetPostsForThreadQuery(thread._id);
  
  const n = new Date();
  const [now, setNow] = useState(n);
  const posted = new Date(data.posts[0].created);
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

    if (isLoading) return <div>Loading...</div>;


  const posts = data?.posts || [];
  const latestPost = posts[0];
  const replyCount = posts.length;

  

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white space-y-3 hover:shadow-lg transition flex justify-between">
      <div>
        <Link to={`/forum/thread/${thread._id}`} className="text-xl font-semibold text-rat_darkest">
          {thread.title}
        </Link>

        {thread.tags && thread.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {thread.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-rat_base text-white text-xs font-medium px-2 py-1 rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>

        <div className="flex justify-end gap-10 text-sm text-gray-700">
          <Link to={`/users/${thread.user._id}`}>
            <img
          src={thread.user.img}
          alt={thread.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
          </Link>
          <span className="mt-3">{replyCount}</span>
          <span className="mt-3">
            {latestPost ? time : "No activity"}
          </span>
        </div>
    </div>
  );
};

export default ForumCard;
