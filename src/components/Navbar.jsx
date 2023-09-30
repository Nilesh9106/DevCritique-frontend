/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { CgMenu, CgProfile, CgSun } from "react-icons/cg";
import { FiPlus, FiSearch } from "react-icons/fi";
import { PiMoonStarsDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../MyContext";

export default function Navbar({ isAuthenticated, setIsAuthenticated, sidebar, setSidebar }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDarkTheme(true);
    }
  }, []);
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  return (
    <>
      <nav className="dark:bg-neutral-900/60 sticky top-0 h-16 z-30 bg-neutral-100/60 backdrop-blur-sm flex  justify-between items-center sm:px-10 px-4 py-3 ">
        <div className="text-xl flex gap-2 items-center" >
          {location.pathname == "/" && <CgMenu className="lg:hidden text-xl mx-1" onClick={() => setSidebar(!sidebar)} />}
          <Link to={"/"} className="text-xl flex gap-2 items-center" >
            <img
              src="/icon2.png"
              className="h-9 aspect-square"
              alt="dev critique"
            />
            DEV CRITIQUE
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            to={"/search"}
            className="p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white"
          >
            <FiSearch className="text-2xl" />
          </Link>
          <button
            onClick={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
            className="p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white"
          >
            {isDarkTheme ? (
              <CgSun className="text-2xl" />
            ) : (
              <PiMoonStarsDuotone className="text-2xl" />
            )}
          </button>

          <button
            onClick={() => setDropDown(!dropDown)}
            className="p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white"
          >
            <CgProfile className="text-2xl" />
          </button>
        </div>
      </nav>
      <div
        className={` ${dropDown ? "scale-100 " : "scale-0"
          } transition-all fixed top-10 right-7 z-10 mt-10 w-80 origin-top-right rounded-md border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 dark:text-gray-100 shadow-lg`}
      >
        {!isAuthenticated && (
          <div className="p-2">
            <div className="flex justify-center">
              <CgProfile className="text-7xl my-3" />
            </div>
            <p className="text-2xl  text-center font-bold">
              Sign Up in your DevCritique Account
            </p>
            <div className="flex gap-3 my-4 justify-center ">
              <Link
                to="/signup"
                onClick={() => setDropDown(false)}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-violet-500 rounded-3xl shadow-md hover:bg-violet-400 hover:scale-95 transition-all"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                onClick={() => setDropDown(false)}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-violet-500 rounded-3xl shadow-md hover:bg-violet-400 hover:scale-95 transition-all"
              >
                Log in
              </Link>
            </div>
          </div>
        )}

        {isAuthenticated && (
          <ul className="p-2 flex flex-col ">
            <p className="text-lg px-3 py-2 ">{user?.username}</p>
            <hr />
            <Link
              to={"/post/create"}
              onClick={() => setDropDown(false)}
              className="p-2 rounded-full flex gap-2 dark:hover:bg-neutral-800 hover:bg-white"
            >
              <FiPlus className="text-2xl" />
              Post Project
            </Link>
            <Link
              to={`/@${user?.username}`}
              onClick={() => setDropDown(false)}
              className="p-2 rounded-full flex gap-2 dark:hover:bg-neutral-800 hover:bg-white"
            >
              <CgProfile className="text-2xl" /> Profile
            </Link>
            <Link
              to={"/"}
              onClick={async () => {
                localStorage.removeItem("token")
                setIsAuthenticated(false);
                await updateUser();
                setDropDown(false);
              }}
              className="px-3 py-2 text-red-500 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-all "
            >
              Logout
            </Link>
          </ul>
        )}
      </div>
    </>
  );
}
