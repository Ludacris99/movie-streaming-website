import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?q=${search}`);
      setSearch(""); // optional  clear input after searching
    }
  };

  return (
    <header className="bg-black text-white flex items-center justify-around h-14 px-4">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-2xl tracking-widest font-tektur shadow-[-20px_0px_10px_purple,20px_0px_10px_purple_inset,-20px_-10px_10px_blue,-20px_-10px_10px_blue_inset] rounded-[50%]"
        >
          NEXUS
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-10">
          <li className="text-xl hover:scale-[1.05] hover:text-blue-700 transition">
         
            <Link to="/movies">Movies</Link>
          </li>
          <li className="text-xl hover:scale-[1.05] hover:text-blue-700 transition">
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li className="text-xl hover:scale-[1.05] hover:text-blue-700 transition">
            <Link to="/login">Sign Up</Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="px-3 py-1 rounded w-60 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 bg-blue-800 rounded hover:bg-blue-800 transition"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
