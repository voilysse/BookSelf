import StarRating from "./StarRating";
import { Link } from "react-router";
import { useGetBookReviewsQuery } from "../../features/bookApi";

export default function BookCardLarge({ book }) {
  const { data: reviewData } = useGetBookReviewsQuery(book._id);
  
    const avgRating =
      reviewData?.reviews?.length > 0
        ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviewData.reviews.length
        : 0;
  
    const reviewCount = reviewData?.reviews?.length || 0;

  return (
    <div className="flex gap-4 p-4 bg-white shadow-md rounded-lg my-4 max-w-xl">


      <div className="flex flex-col space-y-2 flex-1">
        <Link key={book._id} to={`/books/${book._id}`} className="text-xl font-semibold text-gray-900 hover:underline">
          {book.title}
        </Link>

        <div className="flex flex-col space-y-1">
          {book.author.map((a) => (
            <Link key={a._id} to={`/authors/${a._id}`} className="text-sm text-gray-600 hover:text-gray-800" >
              {a.name}
            </Link>
          ))}
        </div>
        <StarRating rating={avgRating} size={60} />

        <p className="text-sm text-gray-700 line-clamp-4"> {book.summary} </p>
      </div>
    </div>
  );
}
