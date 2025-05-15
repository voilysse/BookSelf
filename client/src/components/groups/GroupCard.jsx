import { Link } from "react-router-dom";
import { FollowButton, BlockButton, PrimaryButton } from "../Button/Button";

export default function GroupCard({group}) {
    console.log(group)
    return (
      <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="size-12 flex-none rounded-full bg-gray-50" src={group.cover} alt=""/>
          <div class="min-w-0 flex-auto">
            <Link to={`/groups/${group._id}`} class="text-sm/6 font-semibold text-gray-900">{group.name}</Link>
            <p><Link to={`/users/${group.creator._id}`} class="mt-1 truncate text-xs/5 text-gray-500">Created by {group.creator.username}</Link></p>
          <p class="mt-1 truncate text-xs/5 text-gray-500">Group Members: {group.members.length}</p>          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <PrimaryButton text="Join" groupId={group._id}/>
        </div>
      </li>
    );
}
