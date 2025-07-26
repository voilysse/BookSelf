import { useParams } from "react-router";
import { useGetShelfQuery } from "../../../features/shelfApi";
import { useGetUserQuery } from "../../../features/userApi";
const Divider = ({}) => {
  return (
    <div className="flex self-center items-center justify-center my-4 lg:w-2/3 w-full">
      <hr className="flex-grow h-0.5 border-t-0  bg-rat_lightest" />
    </div>
  );
};

function BookshelfPage() {
  //Getting shelf
  const { id } = useParams();
  const { data, isLoading } = useGetShelfQuery(id);
  const userId = data?.shelf?.user;
  const { data: udata, isLoading: uIsLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });
  if (isLoading || uIsLoading) return <div>Loading...</div>;
  //Getting the info
  const numberBooks = data.shelf.books.length || 0;
  const cover =
    "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5921.jpg";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim nisi, rhoncus eleifend felis pharetra, pulvinar scelerisque ipsum. Donec in. ";
  return (
    <div className="m-4 absolute place-self-center w-2/3 h-screen">
      <div className=" bg-white shadow-lg shadow-rat_base border-solid border border-rat_lightest p-4 rounded-xl w-full h-full flex flex-col">
        {/*Upper banner*/}
        <div className="flex justify-center items-center self-center h-40">
          <img
            className="hidden md:block w-40 h-40 object-cover rounded-md transform transition-transform duration-300 shadow-md shadow-rat_dark"
            src={cover}
            alt="Shelf Cover"
          ></img>
          <div className="lg:w-full md:w-1/2 sm:w-1/3 flex flex-col justify-center w-full h-full m-2">
            <h1 className="text-ellipsis overflow-hidden font-semibold text-5xl text-rat_dark truncate">
              {data.shelf.name}
            </h1>
            <h2 className="text-rat_dark">
              {`${
                data.shelf.public ? "Public" : "Private"
              } Bookshelf  made by `}
              <span className="font-medium text-rat_darkest">{`${udata?.user.username}`}</span>
            </h2>
            <h2 className="text-xl font-medium text-rat_dark">{`${numberBooks} books`}</h2>
          </div>
        </div>
        <Divider />
        <div className="w-full h-full bg-gradient-to-b from-white via-white to-rat_lightest"></div>
      </div>
    </div>
  );
}
export default BookshelfPage;
