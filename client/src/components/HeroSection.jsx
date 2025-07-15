import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [ripples, setRipples] = useState([]);
  const navigate = useNavigate();

  const words = ["Hassle-Free", "Secure", "Fast", "Reliable"];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-40" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-yellow-400 rounded-full animate-ping opacity-30" />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-900/20 via-transparent to-purple-900/20 animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Icon Section */}
          <div
            className={`mb-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-20 opacity-0 scale-95"
            }`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse" />
              <div className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl">
                <div className="text-5xl mb-3 animate-bounce">🧳</div>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="w-2 h-2 bg-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className={`mb-4 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
              <span className="block text-white text-4xl sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  We Deliver Your Luggage
                </span>
              </span>

              <span className="block text-xl sm:text-2xl lg:text-3xl font-medium mt-3 h-8">
                <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold transform transition-all duration-500">
                  {words[currentWord]}
                </span>
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <span className="block mb-2">
              Book your bags to arrive before you do.
            </span>
            <span className="text-cyan-400 font-semibold">
              •Secure •Stress-free •Always on time
            </span>
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {/* Book Now Button */}
            <button
              onClick={(e) => {
                createRipple(e);
                setTimeout(() => navigate("/book"), 200); // 🔁 Redirect to Book page
              }}
              className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 overflow-hidden min-w-[180px]"
            >
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full animate-ping"
                  style={{
                    left: ripple.x - 10,
                    top: ripple.y - 10,
                    width: "20px",
                    height: "20px",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">🚀</span>
                Book Now
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>

            {/* Track Bag Button */}
            <button
              onClick={() => navigate("/track")} // 🔁 Redirect to Track page
              className="group relative bg-transparent border-2 border-cyan-400/50 text-cyan-400 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 min-w-[180px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">📍</span>
                Track Bag
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-3 gap-3 sm:gap-6 max-w-[300px] sm:max-w-3xl mx-auto transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {[
              {
                number: "10K+",
                label: "Bags Delivered",
                icon: "📦",
                color: "from-cyan-400 to-blue-500",
              },
              {
                number: "99.9%",
                label: "On-Time Rate",
                icon: "⚡",
                color: "from-purple-400 to-pink-500",
              },
              {
                number: "24/7",
                label: "Support",
                icon: "🛡️",
                color: "from-yellow-400 to-orange-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-3 sm:p-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div
                  className={`text-lg sm:text-2xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </div>
                <p className="text-gray-300 font-medium text-xs sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center animate-bounce">
              <div className="text-cyan-400 mb-2 text-sm font-medium">
                Scroll
              </div>
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
