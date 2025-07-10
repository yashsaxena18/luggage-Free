// React hooks
import { useState, useEffect } from "react";

// React Router DOM hooks & components
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Icons from lucide-react
import { Menu, X } from "lucide-react";

// Logo image
import suitcaseLogo from "../assets/logo.png";

// Navbar functional component
export default function Navbar() {
  // State to control mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // State to track if user is logged in based on token
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation(); // Used to detect route change

  // Runs once on mount: Checks token and listens for changes in localStorage
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // convert to boolean
    };

    checkToken();

    // Listen to changes in localStorage (for cross-tab logout/login)
    window.addEventListener("storage", checkToken);

    // Cleanup
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  // Runs on route change: Ensures login state is synced when navigating
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false);             // Update state
    navigate("/");                    // Redirect to home
  };

  // Toggles the mobile menu open/close
  const toggleMenu = () => setIsOpen(!isOpen);

  // List of main navigation links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Booking", path: "/book" },
    { label: "Track", path: "/track" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    ...(isLoggedIn ? [{ label: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav className="bg-gradient-to-br from-black via-[#1a1a1a] to-black border-b border-yellow-500 shadow-lg sticky top-0 z-50">
      {/* Top container with logo and nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo and brand name */}
        <div
          className="flex items-center cursor-pointer space-x-2 animate-pulse"
          onClick={() => navigate("/")}
        >
          <img
            src={suitcaseLogo}
            alt="LuggageFree"
            className="w-10 h-10 rounded-full shadow-md border border-yellow-500"
          />
          <span className="text-yellow-400 text-xl font-extrabold tracking-wider hover:animate-bounce">
            LuggageFree
          </span>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-white font-medium transition duration-200 ${
                  isActive
                    ? "border-b-2 border-yellow-400 pb-1 text-yellow-400"
                    : "hover:text-yellow-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Show login/signup if not logged in; else show logout */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="text-white hover:text-yellow-400 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-white hover:text-yellow-400 transition"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger menu icon (mobile only) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-yellow-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block text-white font-medium transition duration-200 px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-yellow-400 text-black border-l-4 border-yellow-600"
                    : "hover:text-yellow-400 hover:bg-gray-800"
                }`
              }
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile login/signup or logout */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block text-white font-medium transition duration-200 px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-yellow-400 text-black border-l-4 border-yellow-600"
                      : "hover:text-yellow-400 hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `block text-white font-medium transition duration-200 px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-yellow-400 text-black border-l-4 border-yellow-600"
                      : "hover:text-yellow-400 hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}