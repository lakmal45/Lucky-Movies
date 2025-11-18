import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 group">
      <div className="relative w-full h-[450px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <button
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
                favorite ? "bg-red-600 text-white" : "bg-white/30 text-white hover:bg-white/50"
                }`}
                onClick={onFavoriteClick}
            >
                <span className="text-xl">♥</span>
            </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;