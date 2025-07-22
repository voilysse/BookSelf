import { useParams } from "react-router-dom";
import { useGetAuthorQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function AuthorPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetAuthorQuery(id);

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading author...</div>;

  const author = data.author;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-10">
      <div className="flex justify-center">
        <img
          src={author.img}
          alt={`Picture of ${author.name}`}
          className="rounded-lg shadow-lg w-70 object-cover"
        />
      </div>

      <div className="col-span-2 space-y-4">
        <h1 className="text-4xl font-semibold text-gray-800">{author.name}</h1>

        <p className="text-gray-600 text-md italic">
          {formatDate(author.birthDate)} {author.deathDate ? `– ${formatDate(author.deathDate)}` : ""}
        </p>

        <p className="text-gray-700 leading-relaxed">{author.biography}</p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Books by {author.name}</h2>
          <div className="grid grid-cols-5 ">
            {author.books.length > 0 ? (
              author.books.map((b) => (
                <BookCard key={b._id} book={b} />
              ))
            ) : (
              <p className="text-gray-500 italic">No books found for this author.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
