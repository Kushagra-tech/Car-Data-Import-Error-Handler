import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#46474A] pt-4 pb-10 z-50 flex flex-col items-center justify-between h-screen">
      <ul className="flex flex-col gap-2 p-4 justify-center w-full">
        <li>
          <Link
            to="/createcsv"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded cursor-pointer w-full text-center"
          >
            Upload Csv +
          </Link>
        </li>
        <li>
          <Link
            to="/bulk"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded cursor-pointer w-full text-center"
          >
            BulKUpload
          </Link>
        </li>
        <li>
          <Link
            to="/create"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded cursor-pointer w-full text-center"
          >
            Create +
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={`text-white hover:text-gray-200 
          }`}
        >
          List Pages
        </Link>
        <button onClick={logout} className="text-white hover:text-gray-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
