import Header from "./Header";
import Footer from "./Footer"; // Import Footer component
import Banner from "./Banner";
import Row from "./Row";
import Login from "./Login";
import SignUP from "./SignUp";
import Movies from "./Movies";
import TVShows from "./TVShows";
import SearchResults from "./SearchResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchURLs = [
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=53`,
  ];

  const tvShowsFetchURLs = [
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US`,
  ];

  return (
    <Router>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Banner
                fetchURL={`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US`}
              />
              <Row
                title="Top Rated"
                type="movie"
                fetchURL={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`}
              />
              <Row 
                title="Action"
                type="movie"
                fetchURL={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`}
              />
              <Row
                title="Comedy"
                type="movie"
                fetchURL={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`}
              />
              <Row
                title="Top TV"
                type="show"
                fetchURL={`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`}
              />
              <Row
                title="TV Shows"
                type="show"
                fetchURL={`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`}
              />
            </>
          }
        />

        {/* Movies Page */}
        <Route
          path="/movies"
          element={<Movies fetchURLs={fetchURLs} type="movie" />}
        />

        {/* TV Shows Page */}
        <Route
          path="/tv-shows"
          element={<TVShows fetchURLs={tvShowsFetchURLs} type="tv" />}
        />

        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;