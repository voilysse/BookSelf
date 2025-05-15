import { useParams } from "react-router-dom";
import { useGetFollowingQuery } from "../../features/userApi";
import UserCard from "./UserCard";

export default function UserFollowingList() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetFollowingQuery(id);

  if (isLoading) return <div>Loading following...</div>;
  if (error) return <div>Error loading following.</div>;

  return (
        <div className="max-w-xl mx-auto mt-8">

    <ul role="list" class="divide-y divide-gray-100">
            <h1 >Following</h1>
      {data.following.length > 0 ? (
        data.following.map((user) => (
          <UserCard key={user._id} user={user} />
        ))
      ) : (
        <p>No following found.</p>
      )}
    </ul>
            </div>

  );
}
