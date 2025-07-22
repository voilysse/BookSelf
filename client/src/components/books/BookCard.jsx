import StarRating from "./StarRating";
import { Link } from "react-router";
import { useGetBookReviewsQuery } from "../../features/bookApi";

export default function BookCard({ book }) {
  const { data: reviewData } = useGetBookReviewsQuery(book._id);

  const avgRating =
    reviewData?.reviews?.length > 0
      ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
      reviewData.reviews.length
      : 0;

  const reviewCount = reviewData?.reviews?.length || 0;

  return (
    <div className="w-36 flex flex-col gap-1 p-4 rounded-lg my-4">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.cover}
          alt={`Book cover of ${book.title}`}
          className="h-44 w-28 object-cover rounded-md shadow"
        />
      </Link>

      <Link
        key={book._id}
        to={`/books/${book._id}`}
        className="text-base font-semibold text-gray-900 hover:underline truncate"
        title={book.title}
      >
        {book.title}
      </Link>

      <div className="flex flex-col space-y-1">
        {book.author.map((a) => (
          <Link
            key={a._id}
            to={`/authors/${a._id}`}
            className="text-sm text-gray-600 hover:text-gray-800 truncate"
            title={a.name}
          >
            {a.name}
          </Link>
        ))}
      </div>

      <StarRating rating={avgRating} size={60} />
    </div>
  );
}
