import { Link } from "react-router-dom";
import { FollowButton, BlockButton } from "../Button/Button";

export default function UserCard({user}) {
    return (
      <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="size-12 flex-none rounded-full bg-gray-50" src={user.img} alt=""/>
          <div class="min-w-0 flex-auto">
            <Link to={`/users/${user._id}`} class="text-sm/6 font-semibold text-gray-900">{user.username}</Link>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{user.biography}</p>
          <Link to={`/users/${user._id}/followers`} class="mt-1 truncate text-xs/5 text-gray-500">Followers: {user.followers.length}</Link>
          <Link to={`/users/${user._id}/following`} class="mt-1 truncate text-xs/5 text-gray-500">Following: {user.following.length}</Link>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <FollowButton text="Follow" userId={user._id} />
        </div>
      </li>
    );
}
