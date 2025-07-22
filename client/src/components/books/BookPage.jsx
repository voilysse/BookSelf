import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/bookApi";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import BookComments from "./BookComments";
import { useGetBookReviewsQuery } from "../../features/bookApi";




const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function BookPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);

  const { data: reviewData } = useGetBookReviewsQuery(id);
  const avgRating =
    reviewData?.reviews?.length > 0
      ? reviewData.reviews.reduce((sum, r) => sum + r.rating, 0) /
      reviewData.reviews.length
      : 0;

  const reviewCount = reviewData.reviews.length;
  console.log(reviewData)

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
      {/* Left column */}
      <div className="col-span-1">
        <div className="sticky top-40 flex justify-center">
          <div className="relative w-64">
            <svg
              height="360"
              width="360"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            >
              <circle r="175" cx="180" cy="180" fill="#BEB9C5" />
            </svg>

            <img
              src={data.book.cover}
              alt={`Book cover of ${data.book.title}`}
              className="w-full rounded shadow-lg relative z-10"
            />

            <div className="flex flex-col gap-2 mt-4 relative z-10">
            </div>
          </div>
        </div>
      </div>


      {/* Right column */}
      <div className="md:col-span-2 space-y-6 px-10">
        <div className="text-gray-800 font-sans mt-4" >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            {data.book.title}
          </h1>

          <div className="text-lg  text-gray-600 mt-3 flex flex-wrap items-center gap-2">
            <span className="italic">by</span>
            {data.book.author.map((a) => (
              <Link
                key={a._id}
                to={`/authors/${a._id}`}
                className="uppercase font-semibold text-gray-800 hover:text-rat_base transition"
              >
                {a.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <StarRating rating={avgRating} size={120} />
            <div className="flex items-center gap-2 mt-1">
              <p className="text-md text-gray-700 font-medium">{avgRating.toFixed(1)} / 5</p>
              <p className="text-md text-gray-500">({reviewCount} ratings)</p>
            </div>
          </div>


          <p className="mt-6 text-base leading-relaxed text-gray-700">
            {data.book.summary}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-16 text-sm text-gray-700">

          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">Language</span>
              <span className="uppercase">{data.book.language}</span>
            </div>

            <div className="flex justify-between items-start mt-2 w-full">
              <span className="uppercase font-semibold text-gray-500">Genre</span>
              <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                {data.book.genre.map((g) => (
                  <Link
                    to={`/genres/${g.toLowerCase()}`}
                    key={g}
                    className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-rat_lightest text-gray-800 hover:bg-rat_base hover:text-white transition"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>


          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">Release Date</span>
              <span className="uppercase">{formatDate(data.book.released)}</span>
            </div>

            <div className="flex justify-between">
              <span className="uppercase font-semibold text-rat_base">ISBN</span>
              <span className="uppercase">{data.book.ISBN}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        {/* Author */}
        <div className="mt-8">
          <h2 className="text-xl text-gray-700 mb-2 italic">Written by</h2>

          <div className="space-y-8">
            {data.book.author.map((a) => (
              <div
                key={a._id}
                className="flex flex-row gap-6 py-4 rounded"
              >
                <div className="w-40 shrink-0">
                  <img
                    src={a.img}
                    alt={`Portrait of ${a.name}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <Link
                    to={`/authors/${a._id}`}
                    className="text-lg font-bold text-gray-900 uppercase hover:text-rat_base transition"
                  >
                    {a.name}
                  </Link>

                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(a.birthDate)}{a.deathDate ? ` – ${formatDate(a.deathDate)}` : ''}
                  </p>

                  <p className="mt-3 text-base text-gray-700 leading-relaxed">
                    {a.biography}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
        </div>

        {/* Reviews */}
        <div>
          <BookComments book={data.book._id} />
        </div>
      </div>
    </div>
  );
}

