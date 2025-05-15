import { useGetAllUsersQuery } from "../../features/userApi";
import UserCard from "./UserCard";

export default function UserList() {
    const { data, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <div>Loading users...</div>;
    return (
            <div className="max-w-xl mx-auto mt-8">

        <ul role="list" class="divide-y divide-gray-100">
            <h1 >All Users</h1>
            {data.users.map((user) => (
                <UserCard key={user._id} user={user} />
            ))}
        </ul>
        </div>
    );
}
