import { useParams } from "react-router-dom";
import { useGetGroupByIdQuery } from "../../features/groupsApi";
import { FollowButton, BlockButton, PrimaryButton } from "../Button/Button";
import { Link } from "react-router-dom";


export default function GroupPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetGroupByIdQuery(id);
  
    if (isLoading) return <div>Loading...</div>;
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">{data.group.name}</h1>
    <p className="mt-2 italic">{data.group.description}</p>
      <p className="text-gray-600">Members: {data.group.members.length}</p>

      <div className="flex space-x-2">
            <PrimaryButton text="Join" />
          </div>

      
    </div>
  );
}
