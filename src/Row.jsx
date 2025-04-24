import { useState, useEffect } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

const base_url_images = "https://media.themoviedb.org/t/p/original";

const Row = ({ title, fetchURL, type }) => {
  //useState -> It gives you a variable (state) and a way to change it. When you update the state, React knows it should re-run your component so the UI reflects the new state.
  const [movies, setMovies] = useState([]);

  // useEffect → A React hook that runs side effects (e.g., fetching data, updating the DOM) after rendering.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [fetchURL]);
  
  //[] is a dependency array : its blank means run once when row loads, and dont run again
  //if [fetchURL] : means run once when row loads, then run every time 'fetchURL' changes as it is 'dependent' on that now

  // console.table(movies); only used to see the response we got from fetch
  return (
    <>
      <div className="max-h-100 mx-4 mt-4">
        {/* title */}
        <div className="title mb-5 ml-3">
          <h2 className="text-3xl font-bold text-white font-tektur">{title}</h2>
        </div>
        {/* poster for all movies in a slider */}
        <Swiper
          slidesPerView={6}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          scrollbar={false}
          navigation={true}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          className="mySwiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <a
                href={
                  type == "movie"
                    ? `https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=de`
                    : `https://vidsrc.xyz/embed/tv?tmdb=${movie.id}&ds_lang=de`
                }
              >
                <img
                  className="w-full max-h-90 object-contain transition-transform hover:scale-[1.05]"
                  src={`${base_url_images}${movie.poster_path}`}
                  alt={`${movie.title}`}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Row;
