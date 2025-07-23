import { useParams } from "react-router-dom";
import { FollowButton, BlockButton } from "../Button/Button";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaSyncAlt, FaRegCheckCircle } from "react-icons/fa";
import BookCard from "../books/BookCard";
import { useGetUserShelvesByNameQuery } from "../../features/shelfApi";
export default function UserShelves() {
  const { data: reading, isLoading: readingIsLoading } =
    useGetUserShelvesByNameQuery("Currently Reading");
  const { data: read, isLoading: readIsLoading } =
    useGetUserShelvesByNameQuery("Read");
  const { data: wantToRead, isLoading: wantToReadIsLoading } =
    useGetUserShelvesByNameQuery("Want To Read");
  if (!readIsLoading && !readingIsLoading && !wantToReadIsLoading) {
    return (
      <div className="mx-auto mt-8 flex justify-center items-center">
        <div className="flex flex-col w-2/3 h-screen">
          <h1 className="text-xl text-rat_dark font-bold">Bookshelves</h1>
          {/*THE THREE COLUMNS*/}
          <div className="w-full h-4/5 flex gap-2">
            {/*Want to read*/}
            <div className="bg-opacity-50 rounded-xl f-full flex lg:w-1/3 md:w-1/2 sm:w-full bg-rat_lightest">
              {/*TITLE*/}
              <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
                <FaRegBookmark className="m-1" />
                Want to read
              </div>
              {/*wantToRead.map((b) => (
              <BookCard book={b} />
              ))*/}
            </div>
            {/*Reading*/}
            <div className="bg-opacity-75 rounded-xl f-full lg:w-1/3 md:w-1/2 bg-rat_lightest">
              <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
                <FaSyncAlt className="m-1" />
                Reading
              </div>
            </div>
            {/*Read*/}
            <div className="rounded-xl f-full lg:w-1/3 bg-rat_lightest">
              <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
                <FaRegCheckCircle className="m-1" />
                Read
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
