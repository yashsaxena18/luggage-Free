import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api"; // ✅ Adjust path if needed

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, formData);
      toast.success("Registered successfully!");
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 px-4">
      {/* Glowing Border Wrapper */}
      <div className="p-[3px] rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 animate-pulse shadow-lg">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-2xl w-full max-w-md space-y-5 shadow-inner"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-600">
            Create Account
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow focus:shadow-purple-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow focus:shadow-purple-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow focus:shadow-purple-300"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-indigo-600 transition-all duration-300 shadow hover:shadow-indigo-400"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
