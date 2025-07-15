import { ShieldCheck, MapPin, Clock4, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const securityPoints = [
  {
    icon: <ShieldCheck className="text-purple-600 w-8 h-8 sm:w-8 sm:h-8" />,
    title: "Tamper-Proof Sealing",
    desc: "Each bag is sealed securely with tamper-evident tags.",
  },
  {
    icon: <MapPin className="text-purple-600 w-8 h-8 sm:w-8 sm:h-8" />,
    title: "Live Tracking",
    desc: "Track your luggage in real time using your Booking ID.",
  },
  {
    icon: <AlertCircle className="text-purple-600 w-8 h-8 sm:w-8 sm:h-8" />,
    title: "₹10,000 Insurance",
    desc: "All deliveries are insured up to ₹10,000 for peace of mind.",
  },
  {
    icon: <Clock4 className="text-purple-600 w-8 h-8 sm:w-8 sm:h-8" />,
    title: "24/7 Support",
    desc: "Always available via call, chat or email for your queries.",
  },
];

function SecurityInfo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-6 text-gray-800 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0ms' }}>Security</span>
            <span className="inline-block animate-fadeInUp mx-2" style={{ animationDelay: '200ms' }}>&</span>
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '400ms' }}>Trust</span>
            <span className="inline-block animate-fadeInUp mx-2" style={{ animationDelay: '600ms' }}>—</span>
            <span className="inline-block animate-fadeInUp" style={{ animationDelay: '800ms' }}>Built</span>
            <span className="inline-block animate-fadeInUp mx-2" style={{ animationDelay: '1000ms' }}>In</span>
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full transition-all duration-1000 delay-1200 transform ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>

        <style jsx>{`
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
            opacity: 0;
          }
        `}</style>

        {/* Cards Grid - Mobile: 2x2, Desktop: 1x4 */}
        <div className="grid gap-4 grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {securityPoints.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 min-h-[200px] sm:min-h-[280px] flex flex-col items-center text-center transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Permanent Stylish Border with Hover Glow Enhancement */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Card Background */}
              <div className="absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-sm transition-all duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative mb-3 sm:mb-6 p-2 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300 transform group-hover:scale-110">
                <div className="relative transform group-hover:rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-sm sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="relative text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {item.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-20"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            Your luggage is in safe hands with industry-leading security measures
          </p>
        </div>
      </div>
    </section>
  );
}

export default SecurityInfo;