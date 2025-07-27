import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { useLikeDislike } from "../hooks/useLikeDislike";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useDislikePostMutation,
  useUndislikePostMutation
} from "../../features/forumApi";

import useFormattedDate from "../utils/useFormattedDate";

function ForumPost({ post }) {
  const { user } = useSelector((state) => state.auth);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [undislikePost] = useUndislikePostMutation();

  const {
     liked,
     disliked,
     likeCount,
     dislikeCount,
     handleLike,
     handleDislike,
   } = useLikeDislike({
     item: post,
     likeMutation: likePost,
     unlikeMutation: unlikePost,
     dislikeMutation: dislikePost,
     undislikeMutation: undislikePost,
   });
const timeDisplay = useFormattedDate(post.created);

  return (
    <div className="flex gap-4 w-ful">
      <div className="flex flex-col items-center relative">

        <img
          src={post.user.img}
          alt={post.user.username}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Link
                to={`/users/${post.user._id}`}
                className="font-semibold text-gray-800 hover:text-rat_base"
              >
                @{post.user.username}
              </Link>
            </div>
            <div>
              <span className="text-rat_light"> {timeDisplay}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-800 text-base leading-relaxed">
          {post.text}
        </p>

        <div className="flex justify-between text-gray-500 items-center text-sm">
          <div className="flex gap-4 text-gray-500 items-center text-sm">
            <LikeDislikeButtons
              liked={liked}
              disliked={disliked}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isDisabled={!user}
            />

          </div>
        </div>
      </div>
    </div >
  );
}
export default ForumPost;
