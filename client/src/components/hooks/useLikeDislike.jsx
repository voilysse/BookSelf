import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useLikeDislike = ({
  item,
  likeMutation,
  unlikeMutation,
  dislikeMutation,
  undislikeMutation,
}) => {
  const user = useSelector((state) => state.auth.user);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    if (item && user) {
      setLiked(item.likes.includes(user._id));
      setDisliked(item.dislikes.includes(user._id));
    }
    setLikeCount(item?.likes.length || 0);
    setDislikeCount(item?.dislikes.length || 0);
  }, [item, user]);

  const handleLike = async () => {
    if (!user) return;

    try {
      if (liked) {
        await unlikeMutation(item._id);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likeMutation(item._id);
        setLiked(true);
        setLikeCount((prev) => prev + 1);

        if (disliked) {
          await undislikeMutation(item._id);
          setDisliked(false);
          setDislikeCount((prev) => prev - 1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return;

    try {
      if (disliked) {
        await undislikeMutation(item._id);
        setDisliked(false);
        setDislikeCount((prev) => prev - 1);
      } else {
        await dislikeMutation(item._id);
        setDisliked(true);
        setDislikeCount((prev) => prev + 1);

        if (liked) {
          await unlikeMutation(item._id);
          setLiked(false);
          setLikeCount((prev) => prev - 1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    liked,
    disliked,
    likeCount,
    dislikeCount,
    handleLike,
    handleDislike,
  };
};
