import "./Button.css";
import {
  useFollowUserMutation,
  useBlockUserMutation,
} from "../../features/userApi";

export function PrimaryButton({ text = "Primary", onClick, disabled }) {
  return (
    <button
      className="button button-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ text = "Secondary", onClick, disabled }) {
  return (
    <button
      className="button button-secondary"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export function FollowButton({ text = "Follow", userId, disabled }) {
  const [followUser] = useFollowUserMutation();
  const handleClick = async () => {
    if (userId) {
      try {
        await followUser(userId).unwrap();
        console.log("User followed.");
      } catch (error) {
        console.error("Follow error:", error);
      }
    }
  };

  return (
    <button
      className=" bg-rat_light p-1 px-3 rounded-md hover:bg-rat_base text-gray-700 hover:text-white"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export function BlockButton({ text = "Block", userId, disabled }) {
  const [blockUser] = useBlockUserMutation();

  const handleClick = async () => {
    if (userId) {
      try {
        await blockUser(userId).unwrap();
        console.log("User blocked.");
      } catch (error) {
        console.error("Block error:", error);
      }
    }
  };

  return (
    <button
      className="button button-secondary"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
