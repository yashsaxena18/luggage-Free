import React, { useState } from 'react';
import { Truck, Shield, Clock, MapPin } from 'lucide-react';

function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: Truck,
      title: "Door-to-Door Delivery",
      description: "Your luggage picked up and delivered directly, safely and on time.",
      gradient: "from-cyan-400 to-blue-500",
      hoverColor: "hover:shadow-cyan-500/30",
      iconColor: "text-cyan-500",
      bgGradient: "from-cyan-50 to-blue-50"
    },
    {
      icon: Shield,
      title: "100% Secure Handling",
      description: "Handled with care and tracked every step of the way.",
      gradient: "from-purple-400 to-pink-500",
      hoverColor: "hover:shadow-purple-500/30",
      iconColor: "text-purple-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Clock,
      title: "On-Time Guarantee",
      description: "We value your time and guarantee timely delivery.",
      gradient: "from-yellow-400 to-orange-500",
      hoverColor: "hover:shadow-yellow-500/30",
      iconColor: "text-yellow-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Stay updated with live tracking of your bag's journey.",
      gradient: "from-pink-400 to-rose-500",
      hoverColor: "hover:shadow-pink-500/30",
      iconColor: "text-pink-500",
      bgGradient: "from-pink-50 to-rose-50"
    }
  ];

  return (
    <section className="py-20 px-6 sm:px-10 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden sm:block absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-green-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <div className="mb-24 transform transition-all duration-700 hover:scale-105 px-2 sm:px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-transparent bg-clip-text sm:animate-pulse leading-tight break-words max-w-full">
            Why Choose Luggage Free?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full sm:animate-pulse"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className={`
                  relative group cursor-pointer transform transition-all duration-700
                  ${isHovered ? 'sm:scale-110 z-10' : 'sm:hover:scale-105'}
                `}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Floating Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg transform translate-y-2`}></div>

                {/* Border Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 sm:animate-pulse p-[2px] -z-10">
                  <div className="w-full h-full rounded-3xl bg-white/90"></div>
                </div>

                {/* Main Card */}
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border-2 border-gray-200/50 hover:border-transparent hover:shadow-2xl ${feature.hoverColor} transition-all duration-500 sm:hover:-translate-y-4`}>
                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-6 transform transition-all duration-500 sm:group-hover:scale-110 sm:group-hover:rotate-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-2xl opacity-50 blur-md sm:group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/90 rounded-2xl p-3 sm:p-4 w-fit mx-auto shadow-lg border border-gray-200/50 group-hover:border-transparent">
                      <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.iconColor} sm:group-hover:scale-125 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 sm:group-hover:text-transparent sm:group-hover:bg-gradient-to-r sm:group-hover:from-cyan-600 sm:group-hover:to-purple-600 sm:group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed sm:group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="hidden sm:block absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    <div className="hidden sm:block absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                    <div className="hidden sm:block absolute top-1/2 left-1/2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 sm:group-hover:animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 sm:animate-bounce">
          <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:rotate-1">
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              Experience the Magic
              <div className="hidden sm:block w-2 h-2 bg-white rounded-full animate-ping"></div>
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
