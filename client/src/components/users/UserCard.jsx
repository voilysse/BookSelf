import { Link } from "react-router-dom";
import { FollowButton, BlockButton } from "../Button/Button";

export default function UserCard({ user }) {
  return (
    <li class="flex lg:max-w-[800px] w-4/5 rounded-md justify-between p-2 hover:shadow-md hover:shadow-rat_lightest">
      <div class="flex justify-center items-center min-w-0 gap-x-4">
        <img
          class="size-12 flex-none rounded-full bg-gray-50"
          src={user.img}
          alt="Profile Picture"
        />
        <div class=" flex flex-col gap-0.5">
          <Link
            to={`/users/${user._id}`}
            class="text-md font-semibold text-gray-900"
          >
            {user.username}
          </Link>
          <p class=" truncate text-xs text-gray-500">{user.biography}</p>
          <div className="flex gap-3">
            <Link
              to={`/users/${user._id}/followers`}
              class="truncate text-xs text-gray-500"
            >
              Followers: {user.followers.length}
            </Link>
            <Link
              to={`/users/${user._id}/following`}
              class="truncate text-xs text-gray-500"
            >
              Following: {user.following.length}
            </Link>
          </div>
        </div>
      </div>
      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-center sm:justify-center ">
        <FollowButton text="Follow" userId={user._id} />
      </div>
    </li>
  );
}
