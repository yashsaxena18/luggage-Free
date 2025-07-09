import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('📨 Thank You For Your Message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4 py-24 overflow-hidden">

      <Toaster position="top-center" reverseOrder={false} />


      {/* 🔵 Background Floating Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-80 left-[40%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* 🔥 Glowing Border */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-[3px] rounded-2xl animate-glow hover:animate-hoverGlow transition-all duration-500">
        
        {/* 🧊 Contact Card */}
        <motion.div
          className="max-w-5xl w-full bg-[#0f172a] text-white rounded-2xl p-10 shadow-2xl grid md:grid-cols-2 gap-8 backdrop-blur-xl bg-opacity-60"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 📝 Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-300 mb-6">Have questions or need help? Reach out to us anytime.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-600 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-gray-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-600 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-gray-400"
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-600 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-gray-400 resize-none"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-md font-semibold shadow-lg"
              >
                Send Message
              </motion.button>

              {/* ✅ Beautiful Feedback Line */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-gray-400 mt-2 italic"
              >
                Your positive feedback brings us true satisfaction. 💖
              </motion.p>
            </form>
          </div>

          {/* 📞 Contact Info */}
          <motion.div
            className="bg-[#1e293b] rounded-xl p-6 flex flex-col justify-center shadow-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Reach Us At</h3>
            <p className="mb-2">📧 yashkishu505@gmail.com</p>
            <p className="mb-2">📞 +91 7302724292</p>
            <p className="mb-2">📍 Delhi, India</p>
            <p className="mt-4 text-sm text-gray-400">Available 7 days a week, 9AM – 8PM</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
