import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import BookComments from "./BookComments";
import { useGetBookReviewsQuery } from "../../features/bookApi";
import { ReactComponent as ArrowDown } from "../assets/arrow-down.png";
import { FaChevronDown } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

//DROP DOWN MENU
const MenuItem = ({ item, activeItem, setActiveItem, setActiveMenu }) => {
  return (
    <li
      onClick={() => {
        if (item != activeItem) {
          setActiveItem(item);
        } else {
          setActiveItem(null);
        }
        setActiveMenu(false);
      }}
      className={`${
        item === activeItem
          ? "bg-rat_base text-rat_darkest"
          : "hover:bg-rat_light"
      } px-3 py-1 rounded-md text-rat_dark
        hover:text-rat_darkest 
       duration-200 cursor-pointer`}
    >
      {item === activeItem ? (
        <>
          Remove from <i>{item}</i>
        </>
      ) : (
        item
      )}
    </li>
  );
};
const DropdownMenu = ({ itemInfo, activeItem, setActiveItem }) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div
      className={`${
        activeMenu
          ? "rounded-br-none rounded-bl-none"
          : "rounded-br-md rounded-bl-md"
      } ${
        activeItem
          ? "text-white border-rat_darkest bg-rat_dark"
          : "text-rat_dark border-rat_dark"
      } rounded-tl-md border border-solid rounded-tr-md p-2 w-full flex justify-between items-center relative duration-200`}
    >
      {activeItem === null ? (
        <p className="text-rat_dark">Add to shelf</p>
      ) : (
        <p>
          Added to <i>{activeItem}</i>
        </p>
      )}
      <button
        onClick={() => {
          setActiveMenu(!activeMenu);
        }}
        className="bg-rat_dark h-6 w-6 rounded-md grid place-items-center text-white hover:bg-blue-600 duration-200"
      >
        <FaChevronDown />
      </button>

      {/* menu */}
      <div
        className={`${
          activeMenu ? "top-full" : "top-1/2 opacity-0 pointer-events-none"
        } w-full border-2 border-solid border-rat_dark bg-white absolute left-0 duration-200 rounded-bl-md rounded-br-md`}
      >
        <ul className="p-1">
          {itemInfo.map((item, index) => {
            return (
              <MenuItem
                item={item}
                key={index}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setActiveMenu={setActiveMenu}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ShelvesButtons = () => {
  const shelves = ["Want to read", "Reading", "To be read"];
  const handleFavorite = () => {
    setLiked(!liked);
    {
      /*ADD OR REMOVE FROM FAVORITES*/
    }
  };
  const handleAdd = () => {
    {
      /*ADD OR REMOVE FROM SHELF*/
    }
  };
  const [liked, setLiked] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => handleAdd(), [activeItem]);
  return (
    <div className="w-[300px] h-10 mt-4 flex gap-3 justify-center items-center">
      <button
        onClick={() => handleFavorite()}
        className={`${
          liked ? "bg-rat_darkest" : "bg-rat_light hover:bg-rat_base"
        } flex h-full w-12 justify-center 
      items-center  text-lg pt-1 px-2 
      rounded-md  text-white`}
      >
        {!liked && <FiHeart />}
        {liked && <FaHeart />}
      </button>
      <DropdownMenu
        itemInfo={shelves}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </div>
  );
};

export default function BookPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);

  const { data: reviewData } = useGetBookReviewsQuery(id);

  const avgRating =
    reviewData?.reviews?.length > 0
      ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviewData.reviews.length
      : 0;

  const reviewCount = reviewData?.reviews?.length || 0;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
      {/* Left column */}
      <div className="col-span-1">
        <div className="sticky top-36 flex justify-center">
          <div className="relative w-64">
            <svg
              height="360"
              width="360"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            >
              <circle r="175" cx="180" cy="180" fill="#BEB9C5" />
            </svg>

            <img
              src={data.book.cover}
              alt={`Book cover of ${data.book.title}`}
              className="w-full rounded shadow-lg relative z-10"
            />
            <div className="flex flex-col gap-2 mt-4 relative z-10 leng"></div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="md:col-span-2 space-y-6 px-10">
        <div className="text-gray-800 font-sans mt-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            {data.book.title}
          </h1>

          <div className="text-lg  text-gray-600 mt-3 flex flex-wrap items-center gap-2">
            <span className="italic">by</span>
            {data.book.author.map((a) => (
              <Link
                key={a._id}
                to={`/authors/${a._id}`}
                className="uppercase font-semibold text-gray-800 hover:text-rat_base transition"
              >
                {a.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <StarRating rating={avgRating} size={120} />
            <div className="flex items-center gap-2 mt-1">
              <p className="text-md text-gray-700 font-medium">
                {avgRating.toFixed(1)}
              </p>
              <p className="text-md text-gray-500">({reviewCount} ratings)</p>
            </div>
          </div>
          <ShelvesButtons />
          <p className="mt-6 text-base leading-relaxed text-gray-700">
            {data.book.summary}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-16 text-sm text-gray-700">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">
                Language
              </span>
              <span className="uppercase">{data.book.language}</span>
            </div>

            <div className="flex justify-between items-start mt-2 w-full">
              <span className="uppercase font-semibold text-gray-500">
                Genre
              </span>
              <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                {data.book.genre.map((g) => (
                  <Link
                    to={`/genres/${g.toLowerCase()}`}
                    key={g}
                    className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-rat_lightest text-gray-800 hover:bg-rat_base hover:text-white transition"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">
                Release Date
              </span>
              <span className="uppercase">
                {formatDate(data.book.released)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">
                ISBN
              </span>
              <span className="uppercase">{data.book.ISBN}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        {/* Author */}
        <div className="mt-8">
          <h2 className="text-xl text-gray-700 mb-2 italic">Written by</h2>

          <div className="space-y-8">
            {data.book.author.map((a) => (
              <div key={a._id} className="flex flex-row gap-6 py-4 rounded">
                <div className="w-40 shrink-0">
                  <img
                    src={a.img}
                    alt={`Portrait of ${a.name}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <Link
                    to={`/authors/${a._id}`}
                    className="text-lg font-bold text-gray-900 uppercase hover:text-rat_base transition"
                  >
                    {a.name}
                  </Link>

                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(a.birthDate)}
                    {a.deathDate ? ` – ${formatDate(a.deathDate)}` : ""}
                  </p>

                  <p className="mt-3 text-base text-gray-700 leading-relaxed">
                    {a.biography}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        {/* Reviews */}
        <div>
          <BookComments book={data.book._id} />
        </div>
      </div>
    </div>
  );
}
