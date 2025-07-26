import { FaList, FaEdit, FaLock } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserShelf,
  useGetUserShelvesQuery,
} from "../../../features/shelfApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BookshelfCardList = ({ shelf }) => {
  const [edit, setEdit] = useState(false);
  const description =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
  const created = new Date(shelf.created);
  const cover =
    "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5921.jpg";
  return (
    <div
      className="group flex-col w-11/12 h-40
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white flex hover:shadow-lg"
    >
      <div className="flex w-full">
        {/*LEFT: COVER*/}
        <div className="w-60 h-32  my-2 mx-3 rounded-md drop-shadow-md shadow-rat_dark">
          <Link to="">
            <img
              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 hover:scale-105"
              src={cover}
              alt="Shelf Cover"
            />
          </Link>
        </div>
        {/*RIGHT: TITLE*/}
        <div className="flex flex-col mt-3">
          <Link
            key={shelf._id}
            to={`/shelves/${shelf._id}`}
            className="text-base font-semibold text-rat_darkest hover:text-rat_dark truncate"
            title={shelf.title}
          >
            {shelf.name}
          </Link>
          <span className="text-rat_base text-sm">
            created {created.getDate()}.{created.getMonth() + 1}.
            {created.getFullYear()}
          </span>
          <p className="text-rat_dark">{description}</p>
        </div>
        {!shelf.public && (
          <span className="flex items-center text-sm absolute top-0 right-0 m-3 text-rat_base">
            Private <FaLock className="m-1" />
          </span>
        )}
        <button
          className="absolute right-0 bottom-0 m-2"
          onClick={() => setEdit(true)}
        >
          <Link to={`/shelves/${shelf.name}/edit`}>
            {" "}
            <FaEdit className="text-xl opacity-0 text-rat_base hover:text-rat_dark group-hover:opacity-100 duration-200 transition-all" />
          </Link>
        </button>
      </div>
    </div>
  );
};
const ShelfCardBox = ({ shelf }) => {
  const [edit, setEdit] = useState(false);
  const description =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
  const created = new Date(shelf.created);
  const cover =
    "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5921.jpg";
  return (
    <div
      className="group flex-col w-11/12 h-40
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white flex hover:shadow-lg"
    >
      <div className="flex w-full">
        {/*LEFT: COVER*/}
        <div className="w-60 h-32  my-2 mx-3 rounded-md drop-shadow-md shadow-rat_dark">
          <Link to="">
            <img
              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 hover:scale-105"
              src={cover}
              alt="Shelf Cover"
            />
          </Link>
        </div>
        {/*RIGHT: TITLE*/}
        <div className="flex flex-col mt-3">
          <Link
            key={shelf._id}
            to={`/shelves/${shelf._id}`}
            className="text-base font-semibold text-rat_darkest hover:text-rat_dark truncate"
            title={shelf.title}
          >
            {shelf.name}
          </Link>
          <span className="text-rat_base text-sm">
            created {created.getDate()}.{created.getMonth() + 1}.
            {created.getFullYear()}
          </span>
          <p className="text-rat_dark">{description}</p>
        </div>
        {!shelf.public && (
          <span className="flex items-center text-sm absolute top-0 right-0 m-3 text-rat_base">
            Private <FaLock className="m-1" />
          </span>
        )}
        <button
          className="absolute right-0 bottom-0 m-2"
          onClick={() => setEdit(true)}
        >
          <Link to={`/shelves/${shelf.name}/edit`}>
            {" "}
            <FaEdit className="text-xl opacity-0 text-rat_base hover:text-rat_dark group-hover:opacity-100 duration-200 transition-all" />
          </Link>
        </button>
      </div>
    </div>
  );
};
function BookshelvesTab() {
  //States
  const [view, setView] = useState("List");
  //Getting User ID
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  //Getting the Bookshelves
  const { data: shelves, isLoading: shelvesLoading } =
    useGetUserShelvesQuery(userId);
  if (shelvesLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-[550px] m-2">
      {/*View type buttons: List or boxes*/}
      <div className="w-full h-12 flex gap-4 items-center justify-end">
        <button
          className={`${
            view === "List" ? "bg-rat_lightest" : "hover:border-rat_dark "
          } border-rat_base rounded-md w-8 h-8 border border-solid  flex items-center justify-center`}
          onClick={() => {
            setView("List");
          }}
        >
          {" "}
          <FaList
            className={`
             h-full text-xl text-rat_base ${
               view === "List" ? "" : " hover:text-rat_dark"
             }`}
          />
        </button>
        <button
          className={`${
            view === "Box" ? "bg-rat_lightest" : "hover:border-rat_dark"
          } border-rat_base  rounded-md w-8 h-8 border border-solid  flex items-center justify-center mr-16`}
          onClick={() => {
            setView("Box");
          }}
        >
          {" "}
          <MdGridView
            className={`
             h-full text-xl text-rat_base ${
               view === "Box" ? "" : " hover:text-rat_dark"
             }`}
          />
        </button>
      </div>
      {view === "List" && (
        <div className="flex flex-col items-center gap-2">
          {shelves.shelves.slice(4).map((s) => (
            <BookshelfCardList shelf={s} />
          ))}
        </div>
      )}
      {view === "Box" && (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {shelves.shelves.slice(4).map((s) => (
            <ShelfCardBox shelf={s} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookshelvesTab;
