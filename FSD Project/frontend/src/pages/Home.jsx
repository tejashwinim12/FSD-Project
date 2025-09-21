import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load popular movies after login
  useEffect(() => {
    if (!token) return; // only fetch if logged in

    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // --- Conditional Rendering ---
  if (!token) {
    return !showRegister ? (
      <Login toggleRegister={() => setShowRegister(true)} />
    ) : (
      <Register toggleLogin={() => setShowRegister(false)} />
    );
  }

  // --- Movie recommendation page ---
  return (
    <div className="home">
<form onSubmit={handleSearch} className="search-form">
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Search for movies..."
      className="search-input"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    {searchQuery && (
      <button
        type="button"
        className="clear-btn"
        onClick={async () => {
          setSearchQuery("");
          setLoading(true);
          try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            setError(null);
          } catch (err) {
            setError("Failed to load movies...");
          } finally {
            setLoading(false);
          }
        }}
      >
        ✕
      </button>
    )}
  </div>
  <button type="submit" className="search-button">Search</button>
</form>



  {error && <div className="error-message">{error}</div>}

  {loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  )}
</div>
  );
}
