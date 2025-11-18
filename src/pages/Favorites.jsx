import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="min-h-screen pt-24 px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-red-500">Your Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">No Favorites Yet</h1>
      <p className="text-gray-400 text-lg">Start adding movies to your collection!</p>
    </div>
  );
}

export default Favorites;