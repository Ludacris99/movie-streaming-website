import React, { useState, useEffect } from "react";
import axios from "axios";

const base_url_images = "https://media.themoviedb.org/t/p/original";

const Movies = ({ fetchURLs, type }) => {
  const [moviesData, setMoviesData] = useState([]); // Store all movies in a flat array
  const [visibleRows, setVisibleRows] = useState(6); // Number of rows to display initially

  useEffect(() => {
    async function fetchMovies() {
      try {
        const allMovies = [];
        for (const fetchURL of fetchURLs) {
          const response = await axios.get(fetchURL);
          allMovies.push(...response.data.results); // Flatten the results into a single array
        }
        setMoviesData(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, [fetchURLs]);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 6); // Load 6 more rows
  };

  // Group movies into rows of 6
  const groupedMovies = [];
  for (let i = 0; i < moviesData.length; i += 6) {
    groupedMovies.push(moviesData.slice(i, i + 6));
  }

  return (
    <div className="movies-page">
      {groupedMovies.slice(0, visibleRows).map((movies, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 mx-5 mt-5">
          {/* Movie posters */}
          {movies.map((movie) => (
            <a
              key={movie.id}
              href={
                type === "movie"
                  ? `https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=de`
                  : `https://vidsrc.xyz/embed/tv?tmdb=${movie.id}&ds_lang=de`
              }
            >
              <img
                className="w-full h-auto object-contain transition-transform hover:scale-[1.05]"
                src={`${base_url_images}${movie.poster_path}`}
                alt={`${movie.title || movie.name}`}
              />
            </a>
          ))}
        </div>
      ))}
      {/* Show More Button */}
      {visibleRows < groupedMovies.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;