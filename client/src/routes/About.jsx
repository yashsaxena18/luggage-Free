import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#0f0f0f] text-white">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We Carry, So You Don’t Have To
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          LuggageFree is on a mission to make your travel stress-free by delivering your bags ahead of you — be it for weddings, business trips, or bike rides.
        </motion.p>
      </section>

      {/* Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 blur-sm my-16"></div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-pink-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="text-center text-gray-300 leading-loose max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The idea for LuggageFree came during a chaotic wedding event, where we saw guests struggling with heavy bags across cities. What if your luggage could just... arrive before you? That’s when we decided to build a platform that makes luggage delivery secure, fast, and seamless.
        </motion.p>
      </section>

      {/* Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-sm my-16"></div>

      {/* Why Choose Us */}
      <section className="bg-[#181818] py-20 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-purple-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Why LuggageFree?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: 'Secure & Insured',
              desc: 'Your luggage is tracked and insured from pickup to delivery.'
            },
            {
              title: 'Time-Saving',
              desc: 'We deliver before you arrive — no more waiting at airports.'
            },
            {
              title: 'Pan-India Service',
              desc: 'From metro cities to small towns, we’ve got you covered.'
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-pink-400">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 blur-sm my-16"></div>

      {/* CTA */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to lighten your load?
        </motion.h2>
        <motion.p
          className="mb-8 text-indigo-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Let us take the weight off your shoulders. Book your luggage pickup today.
        </motion.p>
        <motion.a
          href="/book"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-indigo-800 font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition"
        >
          Book Now
        </motion.a>
      </section>
    </div>
  );
};

export default About;
