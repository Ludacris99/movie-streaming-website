import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const base_url_images = "https://media.themoviedb.org/t/p/w500";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
        );
        console.log("Search results:", res.data.results);
        setResults(res.data.results || []);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: <span className="text-blue-400">"{query}"</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.length > 0 ? (
          results.map((item) => (
            <a
              key={item.id}
              href={
                item.media_type === "movie"
                  ? `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`
                  : `https://vidsrc.xyz/embed/tv?tmdb=${item.id}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition"
            >
              <img
                src={
                  item.poster_path
                    ? `${base_url_images}${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-auto rounded"
              />
              <p className="text-center mt-1 text-sm">
                {item.title || item.name}
              </p>
            </a>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
