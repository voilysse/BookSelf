import { useParams } from "react-router-dom";
import { useGetAuthorQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import StarRating from "./StarRating";


export default function AuthorPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetAuthorQuery(id);
  
    if (isLoading) return <div>Loading...</div>;
  return (
    <div className="Position">
            <div className="BookCard">
              <img src={data.author.pic} alt={`Pic of ${data.author.name}`} />
            </div>
            <div className="InfoTag">
                <p className="Title">{data.author.name}</p>
                <p>{data.author.biography}</p>
                <p>{data.author.birthDate}-{data.author.deathDate}</p>

<h1>Books</h1>
              {data.author.books.map((b) => (
                <BookCard key={b._id} book={b} />
              ))}
    
            </div>

            
          </div>
  );
}
