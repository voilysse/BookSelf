import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";

export default function Forum() {
  const { data, isLoading } = useGetAllThreadsQuery();
  if (isLoading) return <div>Loading...</div>;
  console.log(data)
  return (
    <div className="p-6 px-20">
        <div>
          {data.threads.map((t) => (
            <ForumCard key={t._id} thread={t} />
          ))}
        </div>
    </div>
  );
}

