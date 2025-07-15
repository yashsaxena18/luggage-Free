import { useState } from "react";

function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "LuggageFree made my wedding travel 10x easier. My bags reached before me!",
    },
    {
      name: "Priya Mehta",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "I booked LuggageFree during a bike trip and it was a smooth ride — no baggage!",
    },
    {
      name: "Rohan Kapoor",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
      quote:
        "Super secure and always on time. I'll never carry heavy bags again!",
    },
    {
      name: "Mia Uma",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote:
        "I had to fly urgently — LuggageFree handled my bags like pros. 10/10!",
    },
    {
      name: "Aryan",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      quote:
        "Their real-time tracking was a game changer during my Ladakh bike trip!",
    },
    {
      name: "Ankita",
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      quote:
        "Affordable, fast, and trustworthy. Exactly what I needed for college relocation.",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-3 w-full max-w-full">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`group flex-shrink-0 w-[85vw] sm:w-auto relative transform transition-all duration-500 ease-out ${
                hoveredIndex === index ? "sm:scale-105 z-20" : "scale-100"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 min-h-[200px] sm:min-h-[280px] border border-slate-700/50 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image with Glow */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 w-12 h-12 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-full mx-auto object-cover border-2 border-purple-400/50 group-hover:border-purple-300 transition-colors duration-500"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-sm sm:text-xl font-semibold text-white mb-2 sm:mb-4 group-hover:text-purple-200 transition-colors duration-300">
                    {t.name}
                  </h3>

                  {/* Quote */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    "{t.quote}"
                  </p>

                  {/* Decorative Stars */}
                  <div className="flex justify-center mt-3 sm:mt-6 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Gradient Line */}
        <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
