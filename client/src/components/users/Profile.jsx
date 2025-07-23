import { useSelector } from "react-redux";
import { useState } from "react";
import bookStack from "../assets/book-stack.png";
import penReview from "../assets/review-pen.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../features/userApi";
import { useGetUserReviewsQuery } from "../../features/bookApi";
import UserCard from "./UserCard";
import { useGetFollowersQuery } from "../../features/userApi";
import { useGetFollowingQuery } from "../../features/userApi";
const About = () => {
  return <div>about</div>;
};

const Bookshelves = () => {
  return <div>bookshelves</div>;
};

const Reviews = () => {
  return <div>reviews</div>;
};

const Followers = ({ id }) => {
  const { data, isLoading } = useGetFollowersQuery(id);
  if (isLoading) {
    return <div>Loading..</div>;
  } else {
    return data.followers.map((u) => <UserCard user={u} />);
  }
};

const Following = ({ id }) => {
  const { data, isLoading } = useGetFollowingQuery(id);
  if (isLoading) {
    return <div>Loading..</div>;
  } else {
    return data.following.map((u) => <UserCard user={u} />);
  }
};

const Statistics = () => {
  return <>stats</>;
};

const Tabs = ({ id }) => {
  const tabs = [
    "About",
    "Bookshelves",
    "Reviews",
    "Followers",
    "Following",
    "Statistics",
  ];
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="w-full">
      {/*Tab Buttons*/}
      <div className="flex items-center justify-center">
        {tabs.map((tab) => (
          <div className="flex flex-col">
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
              }}
              className={`px-4 py-2 text-sm font-medium  
            ${
              activeTab === tab
                ? "text-gray-900"
                : "text-rat_light hover:text-rat_base"
            }`}
            >
              {tab}
            </button>
            {activeTab === tab && <span className="h-1 w-full bg-gray-900" />}
          </div>
        ))}
      </div>
      {/*Tab Contents*/}
      <div className="flex flex-col items-center justify-start w-full min-h-[200px]p-4 ">
        {activeTab === "About" && <About />}
        {activeTab === "Bookshelves" && <Bookshelves />}
        {activeTab === "Reviews" && <Reviews />}
        {activeTab === "Followers" && <Followers id={id} />}
        {activeTab === "Following" && <Following id={id} />}
        {activeTab === "Statistics" && <Statistics />}
      </div>
    </div>
  );
};

const Divider = ({}) => {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
    </div>
  );
};

const Profile = () => {
  {
    /*PERSONAL INFORMATION*/
  }
  const birthday = new Date("2002-05-13");
  const lifeMotto = "Always choose happiness 🌸🌼";
  {
    /**/
  }

  {
    /*ACTIVITY INFORMATION*/
  }
  const currentCover =
    "https://upload.wikimedia.org/wikipedia/en/c/c4/Eat%2C_Pray%2C_Love_%E2%80%93_Elizabeth_Gilbert%2C_2007.jpg";
  const currentTitle = "Eat,Pray,Love";
  const currentAuthor = "Elizabeth Gilbert";
  {
    /**/
  }

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const userId = id || user?._id;
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(userId);
  const { data: reviewData, isLoading: isLoadingReview } =
    useGetUserReviewsQuery(userId);
  if (isLoadingUser || isLoadingReview) return <div>Loading...</div>;

  const profilePic = userData.user.img;
  const username = userData.user.username;
  const date = new Date(userData.user.created);
  const followers = userData.user.followers.length;
  const following = userData.user.following.length;
  const numReviews = reviewData.reviews.length;
  const readBooks = 0;
  const genres = ["Fantasy", "Adventure", "Romance", "Horror"];

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-white pt-10">
        {/*Upper Info Card*/}
        <div className="flex last:h-80 w-4/6">
          {/*Profile Info*/}
          <div className=" flex flex-col items-center justify-start h-80 lg:w-1/5 md:w-1/3 w-full">
            <img
              src={profilePic}
              alt="Profile picture"
              className="w-32 h-32 p-1 rounded-full"
            ></img>
            <b className="text-gray-900">@{username}</b>
            <p className="text-xs text-gray-500">
              joined {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
            </p>
            <div className="flex items-center h-10 w-4/5">
              <div className="flex flex-col items-center justify-start h-10 w-1/2">
                <p className="text-md  text-gray-700">{followers}</p>
                <p className="text-xs  text-gray-500">followers</p>
              </div>
              <div className="flex flex-col items-center justify-start h-10 w-1/2">
                <p className="text-md  text-gray-700">{following}</p>
                <p className="text-xs  text-gray-500">following</p>
              </div>
            </div>
          </div>
          {/*Last activity*/}
          <div className="hidden lg:block h-80 w-2/5">
            {/*Reading*/}
            <div className="flex h-36 w-full p-3"></div>
          </div>
          {/*Likes and Stats*/}
          <div className="flex flex-col justify-center items-center hidden md:block h-80 lg:w-2/5 w-2/3">
            {/*Quick Stats*/}
            <div className="flex gap-4 justify-center items-center w-full h-20">
              <div className="flex gap-3 h-3/4 shadow-md hover:shadow-rat_light shadow-white p-2 rounded-lg">
                <img className="h-full" src={bookStack} alt="Books"></img>
                <div className="flex flex-col justify-center items-center">
                  <b className="text-xl text-gray-900">{readBooks}</b>
                  <p className="text-xs text-gray-600">books read</p>
                </div>
              </div>
              <div className="flex gap-3 h-3/4 shadow-md hover:shadow-rat_light shadow-white p-2 rounded-lg">
                <img className="h-full" src={penReview} alt="Books"></img>
                <div className="flex flex-col justify-center items-center">
                  <b className="text-xl text-gray-900">{numReviews}</b>
                  <p className="text-xs text-gray-600">written reviews</p>
                </div>
              </div>
            </div>
            {/*My genres*/}
            <div>
              <Divider />
              <h2 className="text-sm text-gray-700 mb-2 italic">
                MY GENRES
              </h2>{" "}
              {genres.map((g) => (
                <Link
                  to={`/genres/${g.toLowerCase()}`}
                  key={g}
                  className="inline-block mr-1 mb-1 text-sm font-medium px-3 py-1 rounded-full bg-rat_lightest text-gray-800 hover:bg-rat_base hover:text-white transition"
                >
                  {g}
                </Link>
              ))}
            </div>
            {/*My likes???*/}
          </div>
        </div>
        <div className="h-[500px] w-4/6">
          <Tabs id={userId} />
        </div>
      </div>
    </>
  );
};

export default Profile;
