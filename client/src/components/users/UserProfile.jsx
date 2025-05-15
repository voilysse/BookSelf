import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/userApi";
import { FollowButton, BlockButton } from "../Button/Button";
import { Link } from "react-router-dom";


export default function UserProfile() {
  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id);
  
    if (isLoading) return <div>Loading...</div>;
    console.log(data.user.followers)
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">{data.user.username}</h1>
      <div className="flex space-x-2">
            <FollowButton text="Follow" userId={data.user._id} />
            <BlockButton text="Block" userId={data.user._id} />
          </div>
          <div>
            <Link to={`/users/${data.user._id}/followers`}>Followers: {data.user.followers.length}</Link>
            <Link to={`/users/${data.user._id}/following`}>Following: {data.user.following.length}</Link>
          </div>
      <p className="text-gray-600">{data.user.email}</p>
      <p className="mt-2 italic">{data.user.biography}</p>
      <h2 className="mt-4 font-semibold">Shelves:</h2>
      <ul className="list-disc ml-6">
        {data.user.shelves.map((s) => (
          <li key={s._id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
