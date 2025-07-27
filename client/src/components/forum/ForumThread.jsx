import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ForumPost from "./ForumPost";
import ForumSideMenu from "./ForumSideMenu";
import PostModal from "./PostModal";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { useLikeDislike } from "../hooks/useLikeDislike";
import { Element, scroller } from "react-scroll";

import {
  useGetThreadQuery,
  useLikeThreadMutation,
  useUnlikeThreadMutation,
  useDislikeThreadMutation,
  useUndislikeThreadMutation,
} from "../../features/forumApi";

const tags = ["Question", "Review", "Off-Topic", "Discussion"];
const categories = ["General", "Announcements", "Help", "Discussion", "Reviews", "Off-Topic"];

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
  const { id } = useParams();
  const { data, isLoading } = useGetThreadQuery(id);
  const user = useSelector((state) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);

  const [likeThread] = useLikeThreadMutation();
  const [unlikeThread] = useUnlikeThreadMutation();
  const [dislikeThread] = useDislikeThreadMutation();
  const [undislikeThread] = useUndislikeThreadMutation();

  const thread = data?.thread;

  const {
    liked,
    disliked,
    likeCount,
    dislikeCount,
    handleLike,
    handleDislike,
  } = useLikeDislike({
    item: thread,
    likeMutation: likeThread,
    unlikeMutation: unlikeThread,
    dislikeMutation: dislikeThread,
    undislikeMutation: undislikeThread,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data?.posts || data.posts.length === 0) return;

    const elements = document.querySelectorAll("[data-reply-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-reply-index"), 10);
            setCurrentIndex(idx);
          }
        });
      },
      {  threshold: 0.5}
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data?.posts]);

  const handleTimelineMove = (e) => {
    if (!isDragging || !data?.posts?.length) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    const y = clientY - rect.top;
    const percentage = y / rect.height;
    const targetIndex = Math.max(
      0,
      Math.min(data.posts.length - 1, Math.round(percentage * (data.posts.length - 1)))
    );

    setCurrentIndex(targetIndex);

    scroller.scrollTo(`reply-${targetIndex}`, {
      duration: 0,
      smooth: false,
      offset: -100,
    });

  };

  if (isLoading) return <div>Loading...</div>;
  if (!thread) return <div>Thread not found</div>;

  return (
    <div className="p-8 mx-20 grid grid-cols-6 gap-6">
      {/* Side menu */}
      <div className="col-span-1">
        <ForumSideMenu categories={categories} tags={tags} />
      </div>

      {/* Main thread content */}
      <div className="col-span-4">
        <div>
          <div className="flex gap-2">
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

          <div className="flex justify-between items-center text-sm mt-4">
            <LikeDislikeButtons
              liked={liked}
              disliked={disliked}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isDisabled={!user}
            />

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-rat_base text-white rounded-lg hover:bg-opacity-90"
            >
              Reply
            </button>
          </div>

          <PostModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            threadId={thread}
          />
        </div>

        <hr className="my-4 border-t border-rat_lightest" />

        {/* Replies */}
        <div className="flex flex-col gap-6">
          {data.posts && data.posts.length > 0 ? (
            data.posts
              .slice()
              .sort((a, b) => new Date(a.created) - new Date(b.created))
              .map((post, index) => (
                <Element key={post.id} name={`reply-${index}`}>
                  <div
                    id={`reply-${index}`}
                    data-reply-index={index}
                    className="rounded-xl border p-4"
                  >
                    <ForumPost post={post} />
                  </div>
                </Element>
              ))
          ) : (
            <p className="text-gray-500 italic text-center">The void.</p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div
        className="fixed top-1/2 right-44 -translate-y-1/2 h-[350px] flex justify-center items-center cursor-pointer select-none z-50"
        ref={timelineRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleTimelineMove(e);
        }}
        onMouseMove={handleTimelineMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleTimelineMove(e);
        }}
        onTouchMove={handleTimelineMove}
        onTouchEnd={() => setIsDragging(false)}

        onClick={(e) => {
          if (!data?.posts?.length) return;
          const rect = timelineRef.current.getBoundingClientRect();
          const y = e.clientY - rect.top;
          const percentage = y / rect.height;
          const targetIndex = Math.max(
            0,
            Math.min(data.posts.length - 1, Math.round(percentage * (data.posts.length - 1)))
          );

          setCurrentIndex(targetIndex);

          scroller.scrollTo(`reply-${targetIndex}`, {
            duration: 300,
            smooth: true,
            offset: -100,
          });
        }}
      >

        <div className="relative w-4 h-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-rat_lightest rounded-full" />

          {data.posts?.length > 1 && (
            <>
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-rat_base rounded-full transition-all duration-200"
                style={{
                  height: `${(currentIndex / (data.posts.length - 1)) * 100}%`,
                }}
              />

              {/*bubble */}
              <div
                className="absolute left-6 -translate-y-1/2 text-xs text-white transition-all duration-200 ease-in-out"
                style={{
                  top: `${(currentIndex / (data.posts.length - 1)) * 100}%`,
                }}
              >
                <div className="bg-rat_base px-4 py-3 rounded-lg shadow-xl text-white w-32 text-left leading-snug">
                  <div className="font-bold text-sm">
                    {currentIndex + 1} / {data.posts.length}
                  </div>
                  <div className="text-xs text-gray-300">
                    {formatDate(data.posts[currentIndex]?.created)}
                  </div>
                </div>
              </div>

              {/*circle */}
              <div
                className="absolute left-[0.3px] w-4 h-4 rounded-full bg-rat_dark border border-white transition-all duration-200"
                style={{
                  top: `calc(${(currentIndex / (data.posts.length - 1)) * 100}% - 8px)`,
                }}
              />
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default ForumThread;
