import { ReactComponent as ThumbsUp } from "../assets/thumbs-up-solid.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down-solid.svg";

const LikeDislikeButtons = ({
  liked,
  disliked,
  likeCount,
  dislikeCount,
  handleLike,
  handleDislike,
  isDisabled = false,
}) => {
  return (
    <div className="flex gap-4 items-center text-sm text-gray-500">
      {isDisabled ? (
        <>
          <div className="flex items-center gap-1 cursor-not-allowed fill-rat_lightest text-rat_base">
            <ThumbsUp className="w-4" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center gap-1 cursor-not-allowed fill-rat_lightest text-rat_base">
            <ThumbsDown className="w-4" />
            <span>{dislikeCount}</span>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${liked ? "fill-rat_base" : "fill-rat_lightest hover:fill-rat_base"
              }`}
          >
            <ThumbsUp className="w-4" />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 transition ${disliked
                ? "fill-rat_base"
                : "fill-rat_lightest hover:fill-rat_base"
              }`}
          >
            <ThumbsDown className="w-4" />
            <span>{dislikeCount}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default LikeDislikeButtons;
