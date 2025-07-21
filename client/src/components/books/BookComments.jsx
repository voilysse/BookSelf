import mockComments from "../mockComments.js";
import { ReactComponent as BoldIcon } from "../assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "../assets/underline-solid.svg";
import { useGetBookReviewsQuery } from "../../features/bookApi";
import CommentCard from "./CommentCard.jsx";
import OrangeLabel from "../OrangeLabel.jsx";
import OrangeButton from "../OrangeButton.jsx";

function BookComments({ book, titleVisible = true }) {
  const { data, isLoading } = useGetBookReviewsQuery(book);

  if (isLoading) return <div>Loading...</div>;

  const commentsNum = data.reviews.length;

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6">
      {/*
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <textarea
          spellCheck="false"
          placeholder="Leave a review..."
          className="w-full h-24 resize-none rounded-lg border-none bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
        ></textarea>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <BoldIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
            <ItalicIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
            <UnderlineIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
          </div>
          <OrangeButton size={15} text="Submit" />
        </div>
      </div>

      <hr className="border-t border-gray-200" />
*/}
      {/* Title + Review Count */}
      {titleVisible && (
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
          <OrangeLabel content={commentsNum} size={14} />
        </div>
      )}

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