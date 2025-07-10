import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import suitcaseLogo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // watch route change

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // triggers when route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
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
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-yellow-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className="block text-white font-medium hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="block text-white hover:text-yellow-400"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block text-white hover:text-yellow-400"
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
              className="block w-full text-left text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}