import "./BookCard.css";
import StarRating from "./StarRating";
import { Link } from "react-router";

export default function BookCard({ book }) {
  return (
    <>
      <div className="Position">
        <div className="BookCard">
          <Link to={`/books/${book._id}`}><img src={book.cover} alt={`Book cover of ${book.title}`} /></Link>
        </div>
        <div className="InfoTag">
          <Link to={`/books/${book._id}`}>
            <p className="Title">{book.title}</p>

          </Link>
          {book.author.map((a) => (
            <p className="Author"> <Link to={`/authors/${a._id}`}>{a.name}</Link> </p>
          ))}

          <div className="Rating">
            <StarRating rating={book.rating} size={60} />
          </div>
        </div>
      </div>
    </>
  );
}
