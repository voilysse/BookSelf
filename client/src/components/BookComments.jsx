import mockComments from "./mockComments.js";
import { ReactComponent as BoldIcon } from "./assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "./assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "./assets/underline-solid.svg";
import "./BookComments.css";
import { useRef } from "react";
import CommentCard from "./CommentCard";
import OrangeLabel from "./OrangeLabel.jsx";
import OrangeButton from "./OrangeButton.jsx";
function BookComments({ book, inputVisible, titleVisible = true }) {
  const commentsNum = mockComments.length;
  const inputHeight = 65;
  const textareaRef = useRef(null);
  const handleClick = () => {
    const el = textareaRef.current;
    if (el) {
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  };
  return (
    <div
      className="CommentsContainer"
      style={{
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "2%",
        boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        padding: "2%",
      }}
    >
      <div
        className="CommentInput"
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "25%",
          backgroundColor: "#f1f1f1",
          borderRadius: "10px",
          padding: "8px",
        }}
      >
        <textarea
          spellCheck="false"
          placeholder="Leave a review..."
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: `${inputHeight}%`,
            borderRadius: "10px",
            resize: "none",
            background: "transparent",
            border: "none",
            color: "rgba(0,0,0,0.6)",
            fontFamily: "Arial, sans-serif",
            fontWeight: "normal",
            lineHeight: "1",
            letterSpacing: "0.5px",
            fontSize: "14px",
          }}
        ></textarea>
        <div
          className="IconBar"
          style={{
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
            height: `${100 - inputHeight}%`,
            borderRadius: `${50 - inputHeight / 2}px`,
          }}
        >
          <div
            className="EditIcons"
            style={{
              boxSizing: "border-box",
              justifySelf: "flex-start",
              alignContent: "center",
              height: "100%",
              paddingLeft: "15px",
            }}
          >
            <BoldIcon style={{ width: "10px", paddingRight: "10px" }} />
            <ItalicIcon style={{ width: "10px", paddingRight: "10px" }} />
            <UnderlineIcon style={{ width: "12px", paddingRight: "10px" }} />
          </div>
          <div style={{ marginRight: "3px" }}>
            <OrangeButton size={15} text="Submit" />
          </div>
        </div>
      </div>
      <div
        className="Divider"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "30px",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: " rgba(0,0,0,0.1)",
          }}
        ></div>
      </div>
      {titleVisible && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: "0 10px 0 10px",
              fontSize: "20px",
            }}
          >
            Reviews
          </h1>
          <OrangeLabel content={commentsNum} size={14} />
        </div>
      )}

      <div
        className="CommentsDisplay"
        style={{
          width: "100%",
          height: "60%",
          boxSizing: "border-box",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          alignItems: "stretch",
        }}
      >
        {mockComments.map((com, index) => (
          <CommentCard key={index} comment={com} />
        ))}
      </div>
    </div>
  );
}
export default BookComments;
