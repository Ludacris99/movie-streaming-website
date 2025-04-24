import { useState, useEffect } from "react";
import axios from "axios";

//these are imports from swiper library from their documentation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const base_url_images = "https://media.themoviedb.org/t/p/original";

const Banner = ({ fetchURL }) => {
  const [movies, setMovies] = useState([]);
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

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "95vh",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${base_url_images}${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  opacity: "0.6",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              ></div>
              <div className="text-white absolute top-1/2 translate-y-[-50%] left-100 w-150">
                <h2 className="text-6xl font-extrabold mb-6 font-tektur">
                  {movie.title || movie.name}
                </h2>
                <p className="text-[16px] mb-6">{movie.overview}</p>
                <a
                  href={
                    movie.media_type === "movie"
                      ? `https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=de`
                      : `https://vidsrc.xyz/embed/tv?tmdb=${movie.id}&ds_lang=de`
                  }
                >
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* smooth blur at bottom with three colors */}
        <div className="absolute bottom-0 bg-gradient-to-t from-[#0d0d0d] to-transparent h-75 w-full z-1 "></div>
      </Swiper>
    </>
  );
};

export default Banner;
