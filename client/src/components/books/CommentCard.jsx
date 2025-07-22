import { useEffect, useState } from "react";
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up-solid.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down-solid.svg";
import StarRating from "./StarRating";
import { Link } from "react-router";

function CommentCard({ comment, showReplies = true }) {
  const imgWidth = 40;
  const n = new Date();
  const [now, setNow] = useState(n);
  const posted = new Date(comment.created);
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
    <div className="flex gap-4 w-full pt-4">
      <div className="flex flex-col items-center relative">

        <img
          src={comment.user.img}
          alt={comment.user.username}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />

        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div
            style={{
              height: "55%",
              width: "10px",
              transform: "translateX(50%)",
              borderLeft: "2px solid rgba(0,0,0,0.1)",
              borderBottom: "2px solid rgba(0,0,0,0.1)",
              borderRadius: "0  0 0 20px",
            }}
          ></div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Link
                to={`/users/${comment.user._id}`}
                className="font-semibold text-gray-800 hover:text-rat_base"
              >
                @{comment.user.username}
              </Link>
              {comment.rating ?
                (<>
                  <span className="text-rat_light">•</span>
                  <StarRating rating={comment.rating} size={60} />
                </>) : (<></>)}
            </div>
            <div>
              <span className="text-rat_light"> {time}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-800 text-base leading-relaxed">
          {comment.text}
        </p>

        <div className="flex gap-4 text-gray-500 items-center text-sm">
          <button className="flex items-center gap-1 fill-rat_lightest hover:fill-rat_base hover:cursor-pointer transition">
            <ThumbsUp className="w-4  " />
            <span>{comment.likes.length || 0}</span>
          </button>

          <button className="flex items-center gap-1 fill-rat_lightest hover:fill-rat_base hover:cursor-pointer transition">
            <ThumbsDown className="w-4  " />
            <span>{comment.dislikes.length || 0}</span>
          </button>
        </div>

        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 pl-4 space-y-4">
            {comment.replies.map((rep, index) => (
              <CommentCard key={index} comment={rep} showReplies={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CommentCard;
