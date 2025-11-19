import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieProviders } from "../services/api"; // Import new function
import { useMovieContext } from "../contexts/MovieContext";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [watchProvider, setWatchProvider] = useState(null); // New State
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 1. Fetch Movie Details
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        // 2. Find a trailer (YouTube)
        const trailerVideo = movieData.videos.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailer(trailerVideo);

        // 3. Fetch Watch Providers
        const providers = await getMovieProviders(id);
        // We check for 'US' providers by default, or you can detect locale.
        // 'flatrate' means subscription streaming (like Netflix).
        if (providers && providers.US) {
            setWatchProvider(providers.US.link);
        } else if (providers && Object.keys(providers).length > 0) {
            // Fallback: take the first available country if US isn't there
            const firstCountry = Object.keys(providers)[0];
            setWatchProvider(providers[firstCountry].link);
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
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
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-60 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Poster Column */}
            <div className="w-64 flex-shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full h-auto block"
                />
            </div>

            {/* Details Column */}
            <div className="flex-1 mt-4 md:mt-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                    <span className="bg-gray-800 px-2 py-1 rounded">{movie.release_date?.split('-')[0]}</span>
                    <span>•</span>
                    <span>{movie.runtime} min</span>
                    <span>•</span>
                    <div className="flex items-center text-yellow-400 font-bold">
                        <span>★ {movie.vote_average?.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres?.map(g => (
                        <span key={g.id} className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm text-white border border-gray-600">
                            {g.name}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white">Overview</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                    {movie.overview}
                </p>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap gap-4">
                    {/* 1. Watch Trailer Button (if available) */}
                    {trailer && (
                        <a 
                            href={`https://www.youtube.com/watch?v=${trailer.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2 shadow-lg"
                        >
                            ▶ Watch Trailer
                        </a>
                    )}

                    {/* 2. Watch Now (Streaming) Button */}
                    {watchProvider && (
                        <a 
                            href={watchProvider}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 shadow-lg"
                        >
                            📺 Watch Options
                        </a>
                    )}

                    {/* 3. Favorites Button */}
                    <button 
                        onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg ${
                            favorite 
                            ? "bg-gray-700 hover:bg-gray-600 text-white" 
                            : "bg-white text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                        {favorite ? "♥ Remove" : "♡ Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;