import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!movie) return <div className="min-h-screen flex items-center justify-center">Movie not found.</div>;

  const favorite = isFavorite(movie.id);
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] w-full">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-64 flex-shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full h-auto"
                />
            </div>

            {/* Details */}
            <div className="flex-1 pt-8 md:pt-32">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                    <span>{movie.release_date.split('-')[0]}</span>
                    <span>•</span>
                    <span>{movie.runtime} min</span>
                    <span>•</span>
                    <div className="flex items-center text-yellow-400">
                        <span>★ {movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map(g => (
                        <span key={g.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700">
                            {g.name}
                        </span>
                    ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                    {movie.overview}
                </p>

                <div className="flex gap-4">
                    <button 
                        onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                            favorite 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "bg-white text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                        {favorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;