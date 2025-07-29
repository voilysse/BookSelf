import { useParams } from "react-router-dom";
import { FollowButton, BlockButton } from "../Button/Button";
import BookshelvesTab from "./BookshelvesPage/BookshelvesTab";
import { Link } from "react-router-dom";
import {
  FaRegBookmark,
  FaSyncAlt,
  FaRegCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import BookCardLarge from "../books/BookCardLarge";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserShelvesByNameQuery } from "../../features/shelfApi";
import {
  useGetBookQuery,
  useGetBookReviewsQuery,
  useGetUserReviewsQuery,
} from "../../features/bookApi.js";
import StarRating from "../books/StarRating";
import { createPortal } from "react-dom";
import { PrimaryButton } from "../Button/Button";
import { FaHeart, FaPen, FaList, FaTrash } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdGridView } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ReviewModal from "../books/ReviewModal";
const SidebarNavigation = () => {
  return <div className="w-60 h-full fixed l-0 my-2 shadow-md"></div>;
};

const DeleteModal = ({ setAllowed, book, shelf, isOpen, onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  let shelfName = "";
  switch (shelf) {
    case "wtr":
      shelfName = "Want to read";
      break;
    case "reading":
      shelfName = "Reading";
      break;
    case "read":
      shelfName = "Read";
      break;
  }
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl p-6 w-1/2 max-w-xl transition-all duration-200 ease-in-out flex justify-center flex-col items-center"
      >
        <FaTrashAlt className="text-xl m-3 text-rat_dark" />
        <h2 className="text-rat_base text-center">
          Do you want to remove <br />
          <span className="font-semibold text-rat_dark">{book.title}</span> from
          your <span className="font-semibold text-rat_dark">{shelfName} </span>
          bookshelf?
        </h2>
        <div className="flex gap-4 mt-3 ">
          <button
            onClick={() => {
              onClose();
              setAllowed(true);
            }}
            className="flex bg-white border border-solid border-rat_base p-1 w-24 rounded-md hover:bg-rat_base hover:opacity-75 hover:text-white text-rat_dark items-center justify-center"
          >
            Remove
          </button>
          <button
            onClick={() => onClose()}
            className="flex bg-rat_base opacity-75 p-1 w-24 rounded-md hover:opacity-100 text-white justify-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Activity = () => {
  const { data: reading, isLoading: readingIsLoading } =
    useGetUserShelvesByNameQuery("Currently Reading");
  const { data: read, isLoading: readIsLoading } =
    useGetUserShelvesByNameQuery("Read");
  const { data: wantToRead, isLoading: wantToReadIsLoading } =
    useGetUserShelvesByNameQuery("Want to Read");
  const [readingList, setReadingList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [wtrList, setWtrList] = useState([]);
  useEffect(() => {
    if (reading) setReadingList(reading.shelf.books || []);
  }, [reading]);

  useEffect(() => {
    if (read) setReadList(read.shelf.books || []);
  }, [read]);

  useEffect(() => {
    if (wantToRead) setWtrList(wantToRead.shelf.books || []);
  }, [wantToRead]);
  if (readingIsLoading || readIsLoading || wantToReadIsLoading)
    return <p>Loading forums...</p>;
  {
    /*HANDLERS*/
  }
  const handleReading = (id) => {
    const newBook = wtrList.filter((book) => book._id === id);
    setWtrList((prevList) => prevList.filter((book) => book._id !== id));
    setReadingList((prevList) => [newBook[0], ...prevList]);
  };
  const handleRead = (id, from) => {
    const list = from === "wtr" ? wtrList : readingList;
    const newBook = list.filter((book) => book._id === id);
    if (from === "wtr")
      setWtrList((prevList) => prevList.filter((book) => book._id !== id));
    if (from === "reading")
      setReadingList((prevList) => prevList.filter((book) => book._id !== id));
    setReadList((prevList) => [newBook[0], ...prevList]);
  };
  const handleDelete = (id, from) => {
    if (from === "wtr") {
      setWtrList((prevList) => prevList.filter((book) => book._id !== id));
    }
    if (from === "reading") {
      setReadingList((prevList) => prevList.filter((book) => book._id !== id));
    }
    if (from === "read") {
      setReadList((prevList) => prevList.filter((book) => book._id !== id));
    }
  };
  return (
    <div className=" w-full mx-auto mt-2 flex justify-center items-center">
      <div className="flex flex-col w-full h-screen">
        {/*THE THREE COLUMNS*/}
        <div className="w-full h-4/5 flex gap-2">
          {/*Want to read*/}
          <div className="overflow-x-hidden overflow-y-auto flex-col items-center rounded-xl flex max-h-[550px] lg:w-1/3 md:w-1/2 w-full bg-rat_lightest">
            {/*TITLE*/}
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaRegBookmark className="m-1" />
              Want to read
            </div>
            <div className=" transition-all duration-300 gap-3 w-full flex flex-col items-center">
              <AnimatePresence>
                {wtrList.map((b) => (
                  <motion.div
                    key={b._id}
                    layout
                    initial={{ opacity: 0, y: 0, x: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full"
                  >
                    {" "}
                    <BookCardBoard
                      book={b}
                      shelf={"wtr"}
                      handleDelete={handleDelete}
                      handleRead={handleRead}
                      handleReading={handleReading}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/*Reading*/}
          <div className="hidden flex-col items-center md:flex rounded-xl max-h-[550px] lg:w-1/3 md:w-1/2 bg-rat_lightest">
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaSyncAlt className="m-1" />
              Reading
            </div>
            <div className=" transition-all duration-300 gap-3 w-full flex flex-col items-center">
              <AnimatePresence>
                {readingList.map((b) => (
                  <motion.div
                    key={b._id}
                    layout
                    initial={{ opacity: 0, y: 0, x: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full"
                  >
                    <BookCardBoard
                      book={b}
                      shelf={"reading"}
                      handleDelete={handleDelete}
                      handleRead={handleRead}
                      handleReading={handleReading}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/*Read*/}
          <div className="hidden  flex-col items-center lg:flex rounded-xl max-h-[550px] lg:w-1/3 bg-rat_lightest">
            <div className="m-2 text-md text-rat_dark border border-solid border-rat_dark w-40 h-8 flex justify-center items-center rounded-[20px]">
              <FaRegCheckCircle className="m-1" />
              Read
            </div>
            <div className=" transition-all duration-300 gap-3 w-full flex flex-col items-center">
              <AnimatePresence>
                {readList.map((b) => (
                  <motion.div
                    key={b._id}
                    layout
                    initial={{ opacity: 0, y: 0, x: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full"
                  >
                    {" "}
                    <BookCardBoard
                      book={b}
                      shelf={"read"}
                      handleDelete={handleDelete}
                      handleRead={handleRead}
                      handleReading={handleReading}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Favourites = () => {
  const [view, setView] = useState("List");
  const { data: favourites, isLoading: favouritesIsLoading } =
    useGetUserShelvesByNameQuery("Favourites");
  if (favouritesIsLoading) return <p>Loading forums...</p>;
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
          {favourites.shelf.books.map((b) => (
            <BookCardList book={b} />
          ))}
        </div>
      )}
      {view === "Box" && (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {favourites.shelf.books.map((b) => (
            <BookCardBox book={b} />
          ))}
        </div>
      )}
    </div>
  );
};

const Tabs = ({ id }) => {
  const tabs = ["Board", "Favourites", "Bookshelves"];
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div className="w-2/3 self-center mt-8">
      {/*Tab Buttons*/}
      <div className="flex items-center justify-start">
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
                ? "text-rat_darkest border-b-4 border-solid border-b-rat_darkest "
                : "text-rat_light hover:text-rat_base"
            }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
      {/*Tab Contents*/}
      <div className="flex w-full">
        {activeTab == "Favourites" && <Favourites />}
        {activeTab === "Board" && <Activity />}
        {activeTab === "Bookshelves" && <BookshelvesTab />}
      </div>
    </div>
  );
};

const BookCardBox = ({ book }) => {
  const [liked, setLiked] = useState(true);
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
      className="group flex-col w-full h-32
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white flex hover:shadow-lg"
    >
      <div className="flex w-full">
        {/*LEFT: COVER*/}
        <div className="w-16 h-24 my-2 mx-3 rounded-md drop-shadow-md shadow-rat_dark absolute left-0">
          <Link to={`/books/${book._id}`}>
            <img
              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 hover:scale-105"
              src={data.book.cover}
              alt={book.title}
            />
          </Link>
        </div>
        {/*RIGHT: TITLE*/}
        <div className="w-1/2 absolute left-20 ml-2 text-ellipsis overflow-hidden flex flex-col mt-3">
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
        <button
          onClick={() => {
            setLiked(!liked);
          }}
          className={`${
            liked ? "bg-rat_darkest" : "bg-rat_light hover:bg-rat_base"
          } flex h-8 w-8 justify-center 
              items-center  text-lg pt-1 px-2 
              rounded-md  text-white m-3 absolute bottom-0 right-0`}
        >
          {!liked && <FiHeart />}
          {liked && <FaHeart />}
        </button>
      </div>
    </div>
  );
};

const BookCardList = ({ book }) => {
  const [liked, setLiked] = useState(true);
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
      className="group flex-col w-11/12 h-28
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white flex hover:shadow-lg"
    >
      <div className="flex w-full">
        {/*LEFT: COVER*/}
        <div className="w-16 h-24  my-2 mx-3 rounded-md drop-shadow-md shadow-rat_dark">
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
        <button
          onClick={() => {
            setLiked(!liked);
          }}
          className={`${
            liked ? "bg-rat_darkest" : "bg-rat_light hover:bg-rat_base"
          } flex h-8 w-8 justify-center 
              items-center  text-lg pt-1 px-2 
              rounded-md  text-white m-3 ml-auto`}
        >
          {!liked && <FiHeart />}
          {liked && <FaHeart />}
        </button>
      </div>
    </div>
  );
};

const BookCardBoard = ({
  book,
  shelf,
  handleDelete,
  handleRead,
  handleReading,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAllowed, setDeleteAllowed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [review, setReview] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const { data: reviews, isLoading: reviewsLoading } =
    useGetUserReviewsQuery(userId);
  const { data, isLoading } = useGetBookQuery(book._id);
  const { data: reviewData } = useGetBookReviewsQuery(book._id);
  const avgRating =
    reviewData?.reviews?.length > 0
      ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviewData.reviews.length
      : 0;
  useEffect(() => {
    if (reviews && book?._id) {
      const reviewsOnBook = reviews.reviews.filter(
        (r) => r.book._id === book._id
      );
      setReview(() => reviewsOnBook[0]);
    }
  }, [reviews, book]);
  useEffect(() => {
    setTimeout(() => {
      if (deleteAllowed) {
        handleDelete(book._id, shelf);
      }
    }, 400);
  }, [deleteAllowed]);
  if (isLoading || reviewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`group flex-col w-11/12 h-28 ${
        review && shelf === "read" ? "hover:h-48" : "hover:h-40"
      }
    rounded-lg border border-solid
     border-rat_lightest 
     drop-shadow-sm shadow-rat_dark
      bg-white transition-all duration-400 ease-in-out flex`}
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
        <div className="flex flex-col mt-3 w-1/2">
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
      <div className="px-2 w-full h-10 self-center flex justify-end  gap-2 items-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {shelf === "wtr" && (
          <button
            onClick={() => handleReading(book._id)}
            className="flex bg-white border border-solid border-rat_base p-1 w-24 rounded-md hover:bg-rat_base hover:opacity-75 hover:text-white text-rat_dark"
          >
            <FaSyncAlt className="text-sm m-1" />
            Reading
          </button>
        )}
        {(shelf === "wtr" || shelf === "reading") && (
          <button
            onClick={() => handleRead(book._id, shelf)}
            className="flex bg-rat_base opacity-75 p-1 w-24 rounded-md hover:opacity-100 text-white"
          >
            <FaRegCheckCircle className="m-1" />
            Read it
          </button>
        )}
        {shelf === "read" && !review && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex bg-rat_base opacity-75 p-1 w-36 rounded-md hover:opacity-100 text-white"
          >
            <FaPen className="text-sm m-1" />
            Leave a review
          </button>
        )}
        {shelf === "read" && review && (
          <div className="overflow-hidden w-full h-16 absolute bottom-0 m-2  flex flex-col items-end">
            <h3 className="text-xs text-rat_base">Your review on this book</h3>
            <StarRating rating={review.rating} size={55} />
            <span className="block text-right w-10/12 text-xs text-rat_dark mt-1 ">
              "{review.text}"
            </span>
          </div>
        )}
      </div>
      {/*Deleting*/}
      <button
        onClick={() => {
          setDeleteOpen(true);
        }}
        className="absolute right-0 top-0 m-2 opacity-0 group-hover:opacity-100"
      >
        <FaTrash className="text-rat_light hover:text-rat_base" />
      </button>
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookId={book}
      />
      {deleteOpen && (
        <DeleteModal
          setAllowed={setDeleteAllowed}
          book={book}
          shelf={shelf}
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
};

export default function UserShelves() {
  const { id } = useParams();
  return (
    <div className="w-full flex justify-center">
      {" "}
      <div className="fixed left-0 h-screen">{/*<SidebarNavigation />*/}</div>
      <Tabs id={id} />
    </div>
  );
}
