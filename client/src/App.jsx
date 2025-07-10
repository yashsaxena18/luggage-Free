import { Routes, Route ,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";


import Home from "./routes/Home";
import Book from "./routes/Book";
import Track from "./routes/Track";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import Price from "./routes/Price";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/track" element={<Track />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Price />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
// This code defines the main App component for a React application.
// It sets up the routing for different pages using React Router.
// The Navbar component is included at the top, and various routes are defined for different pages like Home, Book, Track, Contact, About, Login, Signup, and Dashboard.
// Each route renders