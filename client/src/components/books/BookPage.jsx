import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import BookComments from "./BookComments";


export default function BookPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  
    if (isLoading) return <div>Loading...</div>;
  return (
    <div className="Position">
            <div className="BookCard">
              <img src={data.book.cover} alt={`Book cover of ${data.book.title}`} />
            </div>
            <div className="InfoTag">
                <p className="Title">{data.book.title}</p>
              {data.book.author.map((a) => (
                <p className="Author"> <Link to={`/authors/${a._id}`}>{a.name}</Link> </p>
              ))}
              <p>{data.book.summary}</p>
    
              <div className="Rating">
                <StarRating rating={data.book.rating} size={60} />
              </div>
              <BookComments book={data.book._id}></BookComments>
            </div>
          </div>
  );
}
