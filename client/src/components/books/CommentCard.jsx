import { useEffect, useState } from "react";
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up-solid.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down-solid.svg";
import "./CommentCard.css";
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
    <div
      className="CardContainer"
      style={{
        width: "100%",
        backgroundColor: "white",
        margin: "2px",
        display: "flex",
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      <div
        className="ProfilePicture"
        style={{
          width: `${imgWidth}px`,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={comment.profilePic}
          style={{
            borderRadius: "50%",
            aspectRatio: "1",
            width: `${imgWidth}px`,
            height: `${imgWidth}px`,
          }}
        />
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div
            style={{
              height: "100%",
              width: "10px",
              transform: "translateX(50%)",
              borderLeft: "2px solid rgba(0,0,0,0.1)",
              borderBottom: "2px solid rgba(0,0,0,0.1)",
              borderRadius: "0  0 0 20px",
            }}
          ></div>
        )}
      </div>
      <div className="RightSide">
        <div
          className="NameTag"
          style={{
            height: `${imgWidth}px`,
            alignContent: "center",
            color: "rgba(0,0,0,0.8)",
            margin: "0 10px 0 10px",
            fontWeight: 600,
          }}
        >
         <bold><Link to={`/users/${comment.user._id}`}> @{comment.user.username}</Link></bold>

         
          <bold
            style={{
              marginLeft: "10px",
              fontSize: "14px",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {time}
          </bold>
        </div>
        <div className="TextContent">
          <p
            style={{
              color: "rgba(0,0,0,0.8)",
              margin: "5px",
              fontSize: "15px",
            }}
          >
            {comment.text}
          </p>
        </div>
        <div className="InfoTag" style={{ display: "flex" }}>
          <ThumbsUp
            className="Thumb"
            style={{ width: "16px", margin: "0 5px 0 5px" }}
          />
          <ThumbsDown
            className="Thumb"
            style={{ width: "16px", margin: "0 5px 0 5px" }}
          />
        </div>
        <div
          className="Replies"
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {showReplies &&
            comment.replies &&
            comment.replies.length > 0 &&
            comment.replies.map((rep, index) => (
              <CommentCard id={index} comment={rep} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default CommentCard;
