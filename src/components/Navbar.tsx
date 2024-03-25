import { useState } from "react";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../api/userapi";
import { userLogout } from "../store/slice/authSlice";
import { toast } from "react-toastify";
// import SearchBar from "./user/home/SearchBar"; // Ensure the correct path is used

interface RootState {
  auth: {
    userLoggedin: boolean;
  };
}

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { userLoggedin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLogout());
      toast.success("Logout Success");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let Links = [
    { name: "HOME", link: "/" },
    ...(userLoggedin
      ? [
        ...(location.pathname !== "/Dashboard"
          ? [{ name: "SWITCH TO HOST", link: "/Dashboard" }]
          : []),
        ...(location.pathname === "/Dashboard"
          ? [{ name: "SWITCH TO USER", link: "/" }]
          : []),
        ...(location.pathname !== "/profile"
          ? [{ name: "PROFILE", link: "/profile" }]
          : []),
        { name: "LOGOUT", link: "/logout", action: handleLogout },
      ]
      : [{ name: "LOGIN", link: "/login" }]),
  ];

  return (
    <div className="shadow-md w-full top-0 left-0 fixed bg-white z-50">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-5">
        <div className="font-semibold text-xl cursor-pointer flex items-center text-gray-800">
          {/* Example place for a logo or brand name */}
          <span>SojournNest</span>
        </div>

        {/* Central search bar - only displayed in larger screens */}
        <div className="hidden md:block flex-grow mx-4">
          {/* <SearchBar /> */}
        </div>

        {/* Menu toggle icon for smaller screens */}
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden absolute right-8 top-6 cursor-pointer w-7 h-7"
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3BottomRightIcon className="w-6 h-6" />}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex items-center absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-in ${open ? "top-16" : "top-[-490px]"}`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-center md:my-0 my-7">
              {link.name === "LOGOUT" ? (
                <a
                  href="#"
                  onClick={link.action}
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  {link.name}
                </a>
              ) : (
                <Link to={link.link} className="text-gray-800 hover:text-blue-400 duration-500">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* Mobile search bar - displayed only on smaller screens */}
        {open && (
          <div className="md:hidden mt-4 px-5">
            {/* <SearchBar /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;