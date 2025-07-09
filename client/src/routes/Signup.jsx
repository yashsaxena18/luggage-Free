import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/api'; // ✅ Adjust path if needed


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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Create Account</h2>
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">Sign Up</button>
      </form>
    </div>
  );
}
// This code defines a Signup component that allows users to create an account.
// It uses React hooks to manage form state and Axios for making HTTP requests.