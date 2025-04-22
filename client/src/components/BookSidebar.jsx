import BookComments from "./BookComments.jsx";
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
            width: "100%",
            height: "100%",
          }}
        >
          <BookComments book={mockBooks[6]} />
        </div>
      </div>
    </>
  );
}
export default BookSidebar;
