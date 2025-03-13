import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const NavBar = () => {
  const { user, signOutUser, Toast, setLoading, theme, setTheme, toggleTheme } =
    useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };
  const toggleProfileDropdown = () => {
    if (window.innerWidth <= 640) {
      setIsMenuOpen(false);
      return;
    }
    setIsProfileOpen((prevState) => !prevState);
  };
  const showSignOutModal = (event) => {
    event.preventDefault();
    document.getElementById("signout-modal").showModal();
    toggleProfileDropdown();
  };
  const hideSignOutModal = () => {
    document.getElementById("signout-modal").close();
  };
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Toast("Logged Out Successfully", "warning");
        navigate("/");
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
    hideSignOutModal();
  };
  const navElements = (
    <ul
      className={`flex flex-col text-center lg:flex-row items-center justify-center gap-2 sm:gap-5 font-medium text-lg ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      {
        <div className="flex sm:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
          >
            {theme == "light" ? (
              <FaMoon className="text-gray-800 dark:text-yellow-500 text-xl" />
            ) : (
              <FaSun className="text-yellow-500 dark:text-gray-200 text-xl" />
            )}
          </button>
        </div>
      }
      <NavLink onClick={toggleMenuDropdown} to="/">
        <span>Home</span>
      </NavLink>
      <NavLink onClick={toggleMenuDropdown} to="/all-visas">
        <span>All Visas</span>
      </NavLink>
      <NavLink to={"/add-visa"} onClick={toggleMenuDropdown}>
        <span>Add Visa</span>
      </NavLink>
      <NavLink onClick={toggleMenuDropdown} to="/my-visa">
        <span className="block text-center">My Visas</span>
      </NavLink>
      <NavLink onClick={toggleMenuDropdown} to="/my-applications">
        <span className="block text-center">My Applications</span>
      </NavLink>
      {user && (
        <Link className="sm:hidden text-red-600" onClick={showSignOutModal}>
          Logout
        </Link>
      )}
    </ul>
  );
  const navElementsEnd = (
    <div className="flex items-center justify-center sm:justify-left gap-2 mb-2 md:mb-0 sm:gap-5">
      {user && (
        <div
          className={` dropdown dropdown-end ${
            theme == "dark" ? "text-white" : "text-black"
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn border-2 border-primary btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                onClick={toggleProfileDropdown}
                alt="Profile Image"
                src={user.photoURL || "https://i.pravatar.cc/500"}
              />
            </div>
          </div>
          {isProfileOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-fit min-w-40 mt-4 mr-10 p-2 shadow"
            >
              <li className="block">
                <img
                  src={user.photoURL}
                  alt=""
                  className="block rounded-2xl mx-auto mb-2"
                />
              </li>
              <li className="hover:bg-gradient-to-t hover:from-green-200 hover:to-green-100">
                <h3 className="justify-between flex font-bold text-base">
                  {user.displayName}
                </h3>
              </li>
              <li className="font-semibold text-red-600 text-lg hover:bg-gradient-to-t hover:from-green-200 hover:to-green-100">
                <Link onClick={showSignOutModal}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center">
        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to={"/login"}
            className="bg-white px-2 mb-2 sm:mb-0 py-1 rounded-lg text-black font-semibold text-lg"
          >
            Login
          </Link>
        )}

        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to={"/signup"}
            className={`${
              scroll ? "bg-white text-black" : "bg-primary text-white"
            } px-2 py-1 rounded-lg font-semibold text-lg`}
          >
            Sign Up
          </Link>
        )}
      </div>
      <div className="hidden sm:flex">
        <button
          onClick={toggleTheme}
          className="p-2 bg-white shadow-lg rounded-full"
        >
          {theme === "light" ? (
            <>
              <FaMoon
                data-tooltip-id="theme-tooltip"
                data-tooltip-content="Switch to dark mode"
                data-tooltip-place="bottom"
                data-tooltip-offset={20}
                data-tooltip-variant="info"
                className="z-[100] dark:text-yellow-500 text-xl"
              />
              <Tooltip id="theme-tooltip" className="z-[110]" />
            </>
          ) : (
            <>
              <FaSun
                data-tooltip-id="theme-tooltip"
                data-tooltip-content="Switch to light mode"
                data-tooltip-place="bottom"
                data-tooltip-offset={20}
                data-tooltip-variant="info"
                className="text-yellow-500 dark:text-gray-200 text-xl"
              />
              <Tooltip id="theme-tooltip" className="z-[110]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
  return (
    <div
      className={`navbar shadow-md rounded-b-md container mx-auto center z-[70] w-[98%] sm:w-full md:w-[96%] py-3 px-3 md:py-4 md:px-5 flex justify-between items-center my-4 fixed top-0 left-[49.8%] sm:left-[50.7%] md:left-[50.7%] lg:left-1/2 xl:left-[50.1%]  transform -translate-x-1/2 transition-all duration-500 -translate-y-4 ${
        scroll
          ? "bg-primary mt-4 rounded-b-2xl"
          : `${theme == "dark" ? "bg-black" : "bg-white"}`
      }`}
    >
      <dialog
        id="signout-modal"
        className="modal flex justify-center items-center bg-black bg-opacity-50 z-50"
      >
        <div className="modal-box w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
            Sign Out
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to sign out? You can always come back later!
          </p>
          <div className="modal-action justify-between flex mx-auto items-center">
            <button
              onClick={hideSignOutModal}
              className="px-4 py-2 bg-green-500 font-semibold text-base rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 font-semibold text-base bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </dialog>
      <div className="navbar-start">
        <Link
          to={"/"}
          className="text-black flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-bold bg-white hover:border-2 hover:border-black text-lg sm:text-xl"
        >
          Visa <span className="text-primary">Ease</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">{navElements}</div>
      <div className="navbar-end gap-2">
        {/* {user && (
          <div
            tabIndex={0}
            role="button"
            className="sm:hidden btn btn-ghost btn-circle avatar"
          >
            <div className="w-[36px] rounded-full border-2 border-primary">
              <img
                onClick={toggleProfileDropdown}
                alt="Profile Image"
                src={user.photoURL || "https://i.pravatar.cc/500"}
              />
            </div>
          </div>
        )} */}
        <div className="hidden sm:flex">{navElementsEnd}</div>
        <div className="dropdown dropdown-left">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost lg:hidden ${
              theme == "dark" ? "text-white" : "text-black"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              onClick={toggleMenuDropdown}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul className="menu menu-sm dropdown-content text-black lg:text-white bg-base-100 rounded-box z-[1] mt-14 w-fit min-w-40 p-2 pb-4 space-y-2 shadow">
              {user ? (
                <div className="sm:hidden">{navElementsEnd}</div>
              ) : (
                <div>{navElements}</div>
              )}
              {user ? (
                <div>{navElements}</div>
              ) : (
                <div className="sm:hidden">{navElementsEnd}</div>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
