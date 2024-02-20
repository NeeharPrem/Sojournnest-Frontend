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
import SearchBar from "./user/home/serchBar";

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
    <>
      <div className="shadow-md w-full top-0 left-0 fixed lg:px-6 px-5 md:px-5 bg-white z-50">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10">
          {/* logo section */}
          <div className="font-medium text-2xl cursor-pointer flex items-center gap-1">
            {/* <BookOpenIcon className="w-7 h-7 text-blue-600" /> */}
            <span>SojournNest</span>
          </div>
          <div>
            {/* <SearchBar /> */}
          </div>
          {/* Menu icon */}
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
          >
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>
          {/* link items */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-12" : "top-[-490px]"}`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 md:my-0 my-7 font-semibold">
                {link.name === "LOGOUT" ? (
                  <a
                    href="#"
                    onClick={link.action}
                    className="text-gray-800 hover:text-blue-400 duration-500"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.link}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
          {/* button */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
