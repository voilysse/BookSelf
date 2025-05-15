import { useParams } from "react-router-dom";
import { useGetFollowersQuery } from "../../features/userApi";
import UserCard from "./UserCard";

export default function UserFollowersList() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetFollowersQuery(id);

  if (isLoading) return <div>Loading followers...</div>;
  if (error) return <div>Error loading followers.</div>;

  return (
        <div className="max-w-xl mx-auto mt-8">

    <ul role="list" class="divide-y divide-gray-100">
            <h1 >Followers</h1>
      {data.followers.length > 0 ? (
        data.followers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))
      ) : (
        <p>No followers found.</p>
      )}
    </ul>
            </div>

  );
}
