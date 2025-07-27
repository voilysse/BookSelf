import { Link } from "react-router-dom";
import { useGetPostsForThreadQuery } from "../../features/forumApi";
import { useEffect, useState } from "react";
import useFormattedDate from "../utils/useFormattedDate";

const ForumCard = ({ thread }) => {
  const { data, isLoading } = useGetPostsForThreadQuery(thread._id);
  const timeDisplay = useFormattedDate(thread.created);

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
            <Link to={`/forum?category=${thread.category}`} className="text-sm mt-2.5 text-rat_base hover:text-rat_light">{thread.category} </Link>
            {thread.tags && thread.tags.length > 0 && (
              <>
                <span className="text-sm mt-2.5 text-rat_base">•</span>

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
              </>
            )}
          </div>
        </div>

        <div className="flex items-center capitalize gap-6 justify-end text-sm text-rat_base">
          <div className="w-16 flex justify-center items-center">
            <Link to={`/users/${thread.user._id}`}>
              <img
                src={thread.user.img}
                alt={thread.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          </div>
          <div className="w-16 flex justify-center items-center">
            <span>{replyCount}</span>
          </div>
          <div className="w-16 flex justify-center items-center text-center">
            <span>{latestPost ? timeDisplay : "No activity"}</span>
          </div>
        </div>

      </div>
    </Link>

  );
};

export default ForumCard;
