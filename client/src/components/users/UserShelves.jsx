import { useParams } from "react-router-dom";
import { FollowButton, BlockButton } from "../Button/Button";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaSyncAlt, FaRegCheckCircle } from "react-icons/fa";
import BookCardLarge from "../books/BookCardLarge";
import { useGetUserShelvesByNameQuery } from "../../features/shelfApi";
import {
  useGetBookQuery,
  useGetBookReviewsQuery,
} from "../../features/bookApi.js";
import StarRating from "../books/StarRating";
import { PrimaryButton } from "../Button/Button";

const BookCardShelfWantToRead = ({ book }) => {
  const { data, isLoading } = useGetBookQuery(book._id);
  const { data: reviewData } = useGetBookReviewsQuery(book._id);

  const avgRating =
    reviewData?.reviews?.length > 0
      ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviewData.reviews.length
      : 0;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="group flex-col w-11/12 h-28 hover:h-40
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white transition-all duration-400 ease-in-out flex"
    >
      <div className="flex">
        {/*LEFT: COVER*/}
        <div className="w-16 h-24 bg-slate-600 my-2 mx-3 rounded-md drop-shadow-md shadow-rat_dark">
          <Link to={`/books/${book._id}`}>
            <img
              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 hover:scale-105"
              src={data.book.cover}
              alt={book.title}
            />
          </Link>
        </div>

        {/*RIGHT: TITLE*/}
        <div className="flex flex-col mt-3">
          <Link
            key={book._id}
            to={`/books/${book._id}`}
            className="text-base font-semibold text-rat_darkest hover:text-rat_dark truncate"
            title={book.title}
          >
            {book.title}
          </Link>
          <div className="flex flex-col space-y-1">
            {data.book.author.map((a) => (
              <Link
                key={a._id}
                to={`/authors/${a._id}`}
                className="text-sm text-gray-600 hover:text-gray-800 truncate"
                title={a.name}
              >
                {a.name}
              </Link>
            ))}
          </div>
          <span className="mt-1">
            <StarRating rating={avgRating} size={65} />
          </span>
        </div>
      </div>
      {/*Buttons*/}
      <div className="w-5/6 h-10 self-center flex justify-around items-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="flex bg-rat_base p-1 w-24 rounded-md hover:bg-rat_dark text-white">
          <FaSyncAlt className="text-sm m-1" />
          Reading
        </button>
        <button className="flex bg-rat_base p-1 w-24 rounded-md hover:bg-rat_dark text-white">
          <FaRegCheckCircle className="m-1" />
          Read it
        </button>
      </div>
    </div>
  );
};

export default function UserShelves() {
  const { data: reading, isLoading: readingIsLoading } =
    useGetUserShelvesByNameQuery("Currently Reading");
  const { data: read, isLoading: readIsLoading } =
    useGetUserShelvesByNameQuery("Read");
  const { data: wantToRead, isLoading: wantToReadIsLoading } =
    useGetUserShelvesByNameQuery("Want to Read");
  const { data: favourites, isLoading: favouritesIsLoading } =
    useGetUserShelvesByNameQuery("Favourites");
  if (
    favouritesIsLoading ||
    readingIsLoading ||
    readIsLoading ||
    wantToReadIsLoading
  )
    return <p>Loading forums...</p>;

  return (
    <div className="mx-auto mt-8 flex justify-center items-center">
      <div className="flex flex-col w-2/3 h-screen">
        <h1 className="text-xl text-rat_dark font-bold">Bookshelves</h1>
        {/*THE THREE COLUMNS*/}
        <div className="w-full h-4/5 flex gap-2">
          {/*Want to read*/}
          <div className="flex-col items-center rounded-xl f-full flex lg:w-1/3 md:w-1/2 w-full bg-rat_lightest">
            {/*TITLE*/}
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaRegBookmark className="m-1" />
              Want to read
            </div>
            <div className="gap-3 w-full flex flex-col items-center">
              {" "}
              {favourites.shelf.books.map((b) => (
                <BookCardShelfWantToRead book={b} />
              ))}
            </div>
          </div>
          {/*Reading*/}
          <div className="hidden flex-col items-center md:flex rounded-xl f-full lg:w-1/3 md:w-1/2 bg-rat_lightest">
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaSyncAlt className="m-1" />
              Reading
            </div>
          </div>
          {/*Read*/}
          <div className="hidden  flex-col items-center lg:flex rounded-xl f-full lg:w-1/3 bg-rat_lightest">
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaRegCheckCircle className="m-1" />
              Read
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
