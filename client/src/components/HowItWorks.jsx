import React, { useState } from 'react';
import { Package, Truck, MapPin, Smile } from 'lucide-react';

function HowItWorks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const steps = [
    {
      icon: Package,
      title: "1. Book Pickup",
      desc: "Schedule a pickup from your doorstep using our booking form.",
      gradient: "from-cyan-400 to-blue-500",
      bgGradient: "from-cyan-900/20 to-blue-900/20",
      iconColor: "text-cyan-400"
    },
    {
      icon: Truck,
      title: "2. We Collect",
      desc: "Our delivery partner collects your luggage securely.",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-900/20 to-pink-900/20",
      iconColor: "text-purple-400"
    },
    {
      icon: MapPin,
      title: "3. Track in Real-Time",
      desc: "Use your booking ID to track your luggage live.",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-900/20 to-orange-900/20",
      iconColor: "text-yellow-400"
    },
    {
      icon: Smile,
      title: "4. Arrives Ahead",
      desc: "Your bags arrive at your destination before you do!",
      gradient: "from-pink-400 to-rose-500",
      bgGradient: "from-pink-900/20 to-rose-900/20",
      iconColor: "text-pink-400"
    }
  ];

  return (
   <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated header */}
        <div className="mb-16 transform transition-all duration-700 hover:scale-105">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse leading-tight">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Steps grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                className={`
                  relative group cursor-pointer transform transition-all duration-700 
                  ${isHovered ? 'scale-110 z-10' : 'hover:scale-105'}
                  ${index % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}
                `}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '4s'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated border overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse p-[2px] -z-10">
                  <div className="w-full h-full rounded-3xl bg-slate-800/90"></div>
                </div>

                {/* Floating shadow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg transform translate-y-2`}></div>
                
                {/* Main card */}
                <div className={`
                  relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-700/50
                  hover:border-transparent hover:shadow-2xl hover:shadow-cyan-500/20
                  transition-all duration-500 transform hover:-translate-y-4
                  ${isHovered ? 'shadow-2xl border-transparent' : ''}
                  group-hover:bg-slate-800
                `}>
                  
                  {/* Step number indicator */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                    {index + 1}
                  </div>

                  {/* Animated icon container */}
                  <div className="relative mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.bgGradient} rounded-2xl opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className="relative bg-slate-900/80 rounded-2xl p-4 w-fit mx-auto shadow-lg border border-slate-600/50 group-hover:border-transparent">
                      <IconComponent className={`w-10 h-10 ${step.iconColor} group-hover:scale-125 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {step.desc}
                  </p>

                  {/* Animated particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                    <div className="absolute top-1/2 right-6 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500"></div>
                  </div>

                  {/* Connection line to next step */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transform -translate-y-1/2 animate-pulse opacity-60"></div>
                  )}

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process flow indicator */}
        <div className="mt-16 flex justify-center items-center space-x-4">
          <div className="text-slate-400 text-sm font-medium">Simple Process</div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
            ))}
          </div>
          <div className="text-slate-400 text-sm font-medium">Fast Results</div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;