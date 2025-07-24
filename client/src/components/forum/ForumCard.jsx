import { Link } from "react-router-dom";
import { useGetPostsForThreadQuery } from "../../features/forumApi";
import { useEffect, useState } from "react";

const ForumCard = ({ thread }) => {
  const { data, isLoading } = useGetPostsForThreadQuery(thread._id);

  const [now, setNow] = useState(new Date());
  const [time, setTime] = useState("Loading...");

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data || !data.posts?.length) return;

    const posted = new Date(data.posts[0].created);
    const secondsAgo = Math.floor((now - posted) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const i of intervals) {
      const count = Math.floor(secondsAgo / i.seconds);
      if (count >= 1) {
        setTime(`${count} ${i.label}${count > 1 ? "s" : ""} ago`);
        return;
      }
    }
    setTime("just now");
  }, [now, data]);

  if (isLoading || !data) return <div>Loading...</div>;

  const posts = data.posts || [];
  const latestPost = posts[0];
  const replyCount = posts.length;
  return (
    <Link to={`/forum/thread/${thread._id}`} className="text-xl font-semibold text-rat_darkest">

      <div className="border py-2 space-y-3 flex justify-between mb-4">
        <div>
          {thread.title}

          <div className="flex gap-2">
            <Link to={`/forum?category=${thread.category}`}  className="text-sm mt-2.5 text-rat_base hover:text-rat_light">{thread.category} </Link>
            <span className="text-sm mt-2.5 text-rat_base">•</span>
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {thread.tags.map((tag, index) => (
                  <Link to={`/forum?tag=${tag}`}
                    key={index}
                    className="bg-rat_base text-white text-xs font-medium px-2 py-1 rounded-xl hover:bg-rat_lightest hover:text-rat_darkest"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>


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
    </Link>

  );
};

export default ForumCard;
