import mockComments from "../mockComments.js";
import { ReactComponent as BoldIcon } from "../assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "../assets/underline-solid.svg";
import { useGetBookReviewsQuery } from "../../features/bookApi";
import CommentCard from "./CommentCard.jsx";
import OrangeLabel from "../OrangeLabel.jsx";
import OrangeButton from "../OrangeButton.jsx";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

function BookComments({ book, titleVisible = true }) {
    const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useGetBookReviewsQuery(book);
  if (isLoading) return <div>Loading...</div>;

  const commentsNum = data.reviews.length;


  const handleReviewSubmit = ({ rating, text }) => {
      console.log("Review Submitted:", rating, text);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6">
      
      <div className="flex justify-between">
      <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
          <OrangeLabel content={commentsNum} size={14} />
        </div>
      <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-rat_base text-white rounded-lg hover:bg-opacity-90"
      >
        Leave a Review
      </button>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReviewSubmit}
        bookId={book}
      />
    </div>
    </div>

      {/* Comments */}
      <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-1">
        {commentsNum === 0 ? (
          <p className="text-gray-500 italic text-center">No reviews yet. Be the first to leave one!</p>
        ) : (
          data.reviews.map((com, index) => (
            <CommentCard key={index} comment={com} />
          ))
        )}
      </div>
    </div>
  );
}

export default BookComments;