import { useGetAllBooksQuery } from "../../features/bookApi";
import BookCardWrapper from "./BookCardWrapper";

export default function BookList() {
  const { data, isLoading } = useGetAllBooksQuery();
  if (isLoading) return <div>Loading books...</div>;

  return (
    <div className="flex flex-wrap gap-4">
      <h1 className="w-full text-2xl font-bold mb-4">All Books</h1>
      {data.books.map((book) => (
        <BookCardWrapper key={book._id} book={book} />
      ))}
    </div>
  );
}
