import { useGetAllGroupsQuery  } from "../../features/groupsApi";
import GroupCard from "./GroupCard";

export default function GroupList() {
    const { data, isLoading } = useGetAllGroupsQuery();
  if (isLoading) return <div>Loading groups...</div>;
    return (
       <div className="max-w-xl mx-auto mt-8">
        <ul role="list" class="divide-y divide-gray-100">
            <h1 >All Groups</h1>
            {data.groups.map((group) => (
                <GroupCard key={group._id} group={group} />
            ))}
        </ul>
        </div>
    );
}
