import { useParams } from "react-router-dom";
import { FollowButton, BlockButton } from "./Button/Button";
import { Link } from "react-router-dom";
import UserList from "./users/UserList";
import GroupList from "./groups/GroupList";

export default function Community() {
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Community</h1>
<UserList></UserList>
<GroupList></GroupList>
</div>
  );
}
