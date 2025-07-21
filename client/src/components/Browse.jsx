import { useParams } from "react-router-dom";
import { FollowButton, BlockButton } from "./Button/Button";
import { Link } from "react-router-dom";
import BookList from "./books/BookList";

export default function Browse() {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1>Browse</h1>
      <BookList/>
    </div>
  );
}
