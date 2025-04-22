import "./BookSidebar.css";
import CommentCard from "./CommentCard";
import CoverCard from "./CoverCard.jsx";
import { mockBooks } from "./mockBooks.jsx";
function BookSidebar({ book }) {
  return (
    <>
      <div className="SidebarContainer">
        <div
          className="CommentsContainer"
          style={{
            color: "black",
          }}
        >
          <CommentCard comment={book.comments[0]} />
        </div>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            margin: "15px",
          }}
        ></div>
      </div>
    </>
    //<CoverCard source={book.coverImage} width={60} height={120} />
    //<h1>{book.title}</h1>
  );
}
export default BookSidebar;
