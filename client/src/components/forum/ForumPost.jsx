import { useEffect, useState } from "react";
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up-solid.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down-solid.svg";
import { ReactComponent as MyIcon } from "../assets/forum.svg";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import {
  useLikePostMutation,
  useUnlikePostMutation,
  useDislikePostMutation,
  useUndislikePostMutation
} from "../../features/forumApi";

function ForumPost({ post }) {
  const n = new Date();
  const [now, setNow] = useState(n);
  const posted = new Date(post.created);
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


  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [disliked, setDisliked] = useState(post.dislikes.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes.length);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [undislikePost] = useUndislikePostMutation();

  const handleLike = async () => {
    if (!user) return;

    try {
      setLiked(!liked);
      if (liked) {
        await unlikePost(post._id);
        setLikeCount(prev => prev - 1)

      }
      if (!liked) {
        await likePost(post._id);
        setLikeCount(prev => prev + 1)
      }
      if (disliked) {
        await undislikePost(post._id)
        setDisliked(false);
        setDislikeCount(prev => prev - 1)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return;

    try {
      setDisliked(!disliked);
      if (disliked) {
        await undislikePost(post._id);
        setDislikeCount(prev => prev - 1)
      }
      if (!disliked) {
        await dislikePost(post._id);
        setDislikeCount(prev => prev + 1)
      }

      if (liked){ 
        await unlikePost(post._id)
        setLiked(false);
        setLikeCount(prev => prev - 1)
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="flex gap-4 w-ful">
      <div className="flex flex-col items-center relative">

        <img
          src={post.user.img}
          alt={post.user.username}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Link
                to={`/users/${post.user._id}`}
                className="font-semibold text-gray-800 hover:text-rat_base"
              >
                @{post.user.username}
              </Link>
            </div>
            <div>
              <span className="text-rat_light"> {time}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-800 text-base leading-relaxed">
          {post.text}
        </p>

        <div className="flex justify-between text-gray-500 items-center text-sm">
          <div className="flex gap-4 text-gray-500 items-center text-sm">
            {user ? (<button
              onClick={handleLike}
              className={`flex items-center gap-1 transition ${liked ? "fill-rat_base" : "fill-rat_lightest hover:fill-rat_base"}`}
            >
              <ThumbsUp className="w-4" />
              <span>{likeCount}</span>
            </button>
            ) : (
              <div className="flex items-center gap-1 text-rat_base fill-rat_lightest cursor-not-allowed">
                <ThumbsUp className="w-4" />
                <span>{likeCount}</span>
              </div>
            )}

            {user ? (
              <button
                onClick={handleDislike}
                className={`flex items-center gap-1 transition ${disliked ? "fill-rat_base" : "fill-rat_lightest hover:fill-rat_base"}`}
              >
                <ThumbsDown className="w-4" />
                <span>{dislikeCount}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-rat_base fill-rat_lightest cursor-not-allowed">
                <ThumbsDown className="w-4" />
                <span>{dislikeCount}</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div >
  );
}
export default ForumPost;
