import { useGetAllBooksQuery } from "../../features/bookApi";
import BookCard from "./BookCard";

export default function BookList() {
    const { data, isLoading } = useGetAllBooksQuery();
  if (isLoading) return <div>Loading books...</div>;
    return (
        <div className="smt">
            <h1 >All Books</h1>
            {data.books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
}
