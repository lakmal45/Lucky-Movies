import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent clicking the card link when clicking the heart
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 group h-full flex flex-col">
      <Link to={`/movie/${movie.id}`} className="relative w-full aspect-[2/3] block">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay with Favorite Button */}
        <div className="absolute top-0 right-0 p-2">
          <button
            className={`p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${
              favorite ? "text-red-500" : "text-white"
            }`}
            onClick={onFavoriteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/movie/${movie.id}`} className="hover:text-red-500 transition-colors">
          <h3 className="text-sm font-bold truncate">{movie.title}</h3>
        </Link>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;