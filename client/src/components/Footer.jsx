import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white py-12 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">LuggageFree</h2>
          <p className="mt-3 text-sm text-white/80">
            Effortless luggage delivery across India. Travel light, we’ll carry
            the load.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:text-white">
                Book Now
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-white">
                Track
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 7302724292
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@luggagefree.in
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Delhi , India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:scale-110 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-10 text-center text-sm text-white/70">
        © {new Date().getFullYear()} LuggageFree. All rights reserved.
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-center"
      >
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white text-sm tracking-wide"
        >
          Made with ❤️ by{" "}
          <span className="font-semibold text-white">Yash Saxena</span>
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
