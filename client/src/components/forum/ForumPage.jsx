import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import ForumThread from "./ForumThread";
import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";

const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function ForumPage() {
  const { data, isLoading } = useGetAllThreadsQuery();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
        <div>
          <ForumCard thread={data.thread._id} />
        </div>
    </div>
  );
}

