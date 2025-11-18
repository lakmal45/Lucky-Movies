import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getGenres, getMoviesByGenre } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // Empty string for "All"
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Load Genres and Popular Movies on Initial Mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
        
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load initial data.");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // 2. Your Manual Search Function (Restored)
  const handleSearch = async (e) => {
    e.preventDefault();
    // If input is empty and we have a genre selected, don't block. 
    // But if truly empty and no genre, return.
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setSelectedGenre(""); // Reset genre when searching by text
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Genre Change (Triggers fetch immediately)
  const handleGenreChange = async (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    setSearchQuery(""); // Clear search text when switching genres
    
    setLoading(true);
    try {
        if (value === "") {
            // If "All Categories" selected, go back to popular
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } else {
            // Fetch by Genre ID
            const genreMovies = await getMoviesByGenre(value);
            setMovies(genreMovies);
        }
        setError(null);
    } catch (err) {
        console.log(err);
        setError("Failed to load genre movies.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 pb-8">
      
      {/* Search & Filter Bar (Single Line Layout) */}
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 max-w-5xl mx-auto">
        
        {/* 1. Order - Category Selection */}
        <div className="w-full md:w-1/4">
            <select 
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer"
                onChange={handleGenreChange}
                value={selectedGenre}
            >
                <option value="">All Categories</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>

        {/* 2. Search Bar */}
        <input
          type="text"
          placeholder="Search for movies..."
          className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 3. Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Search
        </button>

      </form>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        /* Movie Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;