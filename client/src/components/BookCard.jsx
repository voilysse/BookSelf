import "./BookCard.css";
import StarRating from "./StarRating";
function BookCard({ book }) {
  return (
    <>
      <div className="Position">
        <div className="BookCard">
          <img src={book.coverImage} alt={`Book cover of ${book.title}`} />
        </div>
        <div className="InfoTag">
          <p className="Title">{book.title}</p>
          <p className="Author">{book.author}</p>
          <div className="Rating">
            <StarRating rating={book.rating} size={60} />
          </div>
        </div>
      </div>
    </>
  );
}
export default BookCard;
