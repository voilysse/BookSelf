import React from "react";
import { useParams } from "react-router-dom";
import ForumPost from "./ForumPost";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostModal from "./PostModal"
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up-solid.svg";
import { ReactComponent as ThumbsDown } from "../assets/thumbs-down-solid.svg";
import { useSelector } from "react-redux";

import {
  useGetThreadQuery,
  useLikeThreadMutation,
  useUnlikeThreadMutation,
  useDislikeThreadMutation,
  useUndislikeThreadMutation
} from "../../features/forumApi";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const ForumThread = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetThreadQuery(id);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const [likeThread] = useLikeThreadMutation();
  const [unlikeThread] = useUnlikeThreadMutation();
  const [dislikeThread] = useDislikeThreadMutation();
  const [undislikeThread] = useUndislikeThreadMutation();

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    if (data?.thread) {
      setLikeCount(data.thread.likes.length);
      setDislikeCount(data.thread.dislikes.length);
      setHasLiked(data.thread.likes.includes(user._id));
      setHasDisliked(data.thread.dislikes.includes(user._id));
    }
  }, [data, user]);

  if (isLoading) return <div>Loading...</div>;

  const thread = data.thread;


  const handleLike = async () => {
    if (!user || user._id === thread.user._id) return;

    try {
      if (hasLiked) {
        await unlikeThread(thread._id);
        setHasLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        if (hasDisliked) {
          await undislikeThread(thread._id);
          setHasDisliked(false);
        }
        await likeThread(thread._id);
        setHasLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user || user._id === thread.user._id) return;

    try {
      if (hasDisliked) {
        await undislikeThread(thread._id);
        setHasDisliked(false);
        setDislikeCount(prev => prev - 1);
      } else {
        if (hasLiked) {
          await unlikeThread(thread._id);
          setHasLiked(false);
          setLikeCount(prev => prev - 1);
        }
        await dislikeThread(thread._id);
        setHasDisliked(true);
        setDislikeCount(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* thread Card */}
      <div className="p-6">
        <div className="flex gap-2 max-w-xs">
          {thread.tags.map((g) => (
            <Link
              to={`/forum/?tag=${g}`}
              key={g}
              className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-rat_lightest text-gray-800 hover:bg-rat_base hover:text-white transition"
            >
              {g}
            </Link>
          ))}
        </div>
        <div className="flex justify-between my-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
             <Link
              to={`/forum/?category=${thread.category}`}
              key={thread.category}
              className="text-sm font-medium py-1 rounded-full text-rat_base hover:text-rat_darkest"
            >
              {thread.category}
            </Link>
            <div className="flex justify-end gap-2 text-sm text-gray-500 mt-1">
              <Link to={`/users/${thread.user._id}`}>{thread.user?.username}</Link>
              <span>•</span>
              <span>{formatDate(thread.created)}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">{thread.text}</p>

        <div className="flex justify-between text-gray-500 items-center text-sm mt-4">
          <div className="flex gap-4 text-gray-500 items-center text-sm">
            {user ? (
              user._id === thread.user._id ? (
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition ${hasLiked ? "fill-rat_base" : "fill-rat_lightest hover:cursor-default"}`}
                >
                  <ThumbsUp className="w-4" />
                  <span>{likeCount}</span>
                </button>
              ) : (
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition ${hasLiked ? "fill-rat_base" : "fill-rat_lightest hover:fill-rat_base"}`}
                >
                  <ThumbsUp className="w-4" />
                  <span>{likeCount}</span>
                </button>
              )
            ) : (
              <div className="flex items-center gap-1 text-rat_base fill-rat_lightest cursor-not-allowed">
                <ThumbsUp className="w-4" />
                <span>{likeCount}</span>
              </div>
            )}
            {user ? (
              user._id === thread.user._id ? (
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-1 transition ${hasDisliked ? "fill-rat_base" : "fill-rat_lightest hover:cursor-default"}`}
                >
                  <ThumbsDown className="w-4" />
                  <span>{dislikeCount}</span>
                </button>
              ) : (
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-1 transition ${hasDisliked ? "fill-rat_base" : "fill-rat_lightest hover:fill-rat_base"}`}
                >
                  <ThumbsDown className="w-4" />
                  <span>{dislikeCount}</span>
                </button>
              )
            ) : (
              <div className="flex items-center gap-1 text-rat_base fill-rat_lightest cursor-not-allowed">
                <ThumbsDown className="w-4" />
                <span>{dislikeCount}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-rat_base text-white rounded-lg hover:bg-opacity-90"
          >
            Reply
          </button>

          <PostModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            threadId={thread}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center my-2">
        <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
      </div>

      {/* Replies */}
      <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-1">

        {data.posts && data.posts.length === 0 ? (
          <p className="text-gray-500 italic text-center">The void.</p>
        ) : (
          data.posts.slice()
            .sort((a, b) => new Date(a.created) - new Date(b.created))
            .map((post) => (
              <div key={post.id} className="rounded-xl border p-4">
                <ForumPost post={post} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ForumThread;
