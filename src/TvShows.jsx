import React, { useState, useEffect } from "react";
import axios from "axios";

const base_url_images = "https://media.themoviedb.org/t/p/original";

const TVShows = ({ fetchURLs, type }) => {
  const [tvShowsData, setTVShowsData] = useState([]); // Store all TV shows in a flat array
  const [visibleRows, setVisibleRows] = useState(6); // Number of rows to display initially

  useEffect(() => {
    async function fetchTVShows() {
      try {
        const allTVShows = [];
        for (const fetchURL of fetchURLs) {
          const response = await axios.get(fetchURL);
          allTVShows.push(...response.data.results); // Flatten the results into a single array
        }
        setTVShowsData(allTVShows);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    }
    fetchTVShows();
  }, [fetchURLs]);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 6); // Load 6 more rows
  };

  // Group TV shows into rows of 6
  const groupedTVShows = [];
  for (let i = 0; i < tvShowsData.length; i += 6) {
    groupedTVShows.push(tvShowsData.slice(i, i + 6));
  }

  return (
    <div className="tvshows-page">
      {groupedTVShows.slice(0, visibleRows).map((tvShows, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 mx-5 mt-5">
          {/* TV Show posters */}
          {tvShows.map((tvShow) => (
            <a
              key={tvShow.id}
              href={`https://vidsrc.xyz/embed/tv?tmdb=${tvShow.id}&ds_lang=de`}
            >
              <img
                className="w-full h-auto object-contain transition-transform hover:scale-[1.05]"
                src={`${base_url_images}${tvShow.poster_path}`}
                alt={`${tvShow.name || tvShow.title}`}
              />
            </a>
          ))}
        </div>
      ))}
      {/* Show More Button */}
      {visibleRows < groupedTVShows.length && (
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

export default TVShows;