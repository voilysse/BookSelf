import { Link } from "react-router-dom";
import { useGetPostsForThreadQuery } from "../../features/forumApi";

const ForumCard = ({ thread }) => {
  const { data, isLoading } = useGetPostsForThreadQuery(thread._id);
  if (isLoading) return <div>Loading...</div>;

  const posts = data?.posts || [];
  const latestPost = posts[posts.length - 1];
  const replyCount = posts.length;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white space-y-3 hover:shadow-lg transition flex justify-between">
      <div>
        <Link to={`/forum/thread/${thread._id}`} className="text-xl font-semibold text-rat_darkest">
          {thread.title}
        </Link>

        {thread.tags && thread.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {thread.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-rat_base text-white text-xs font-medium px-2 py-1 rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>

        <div className="flex justify-end gap-10 text-sm text-gray-700">
          <Link to={`/users/${thread.user._id}`}>
            <img
          src={thread.user.img}
          alt={thread.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
          </Link>
          <span className="mt-3">{replyCount}</span>
          <span className="mt-3">
            {latestPost ? new Date(latestPost.created).toLocaleString() : "No activity"}
          </span>
        </div>
    </div>
  );
};

export default ForumCard;
