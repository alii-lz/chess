import Knight from "../Images/Knight.svg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo + Board Link */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="flex items-center gap-2">
                <img className="h-8 w-auto" src={Knight} alt="Logo" />
                <span className="text-white font-semibold hidden sm:block">
                  Chess
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  aria-current="page"
                >
                  Board
                </NavLink>
              </div>
            </div>
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Log in
            </NavLink>
            <Link
              to="/signup"
              className="rounded-md px-3 py-2 text-sm font-medium bg-gray-100/0 text-white border border-gray-600 hover:bg-gray-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
