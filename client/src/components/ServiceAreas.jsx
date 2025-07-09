import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Sparkles } from "lucide-react";

// City rows
const citiesRow1 = ["Delhi", "Mumbai", "Bengaluru", "Pune"];
const citiesRow2 = ["Hyderabad", "Kolkata", "Jaipur", "Goa"];
const citiesRow3 = ["Chandigarh", "Lucknow", "Ahmedabad", "Indore"];

// Enhanced floating animation with more dynamic movement
const floatingAnimation = (direction = "left", index = 0) => ({
  x: [0, direction === "left" ? -15 : 15, 0],
  y: [0, -8, 0],
  transition: {
    repeat: Infinity,
    duration: 4 + index * 0.3,
    ease: "easeInOut",
    delay: index * 0.2,
  },
});

// Card hover animation - removed unused variants
const cardHover = {
  scale: 1.05,
  y: -5,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

// Glow effect variants - removed unused variants
const glowVariants = {
  opacity: [0.3, 0.8, 0.3],
  transition: {
    repeat: Infinity,
    duration: 2,
    ease: "easeInOut",
  }
};

const CityCard = ({ city, index, direction }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: [0, direction === "left" ? -15 : 15, 0],
        transition: {
          opacity: { duration: 0.6, delay: index * 0.1 },
          y: { duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 },
          x: {
            repeat: Infinity,
            duration: 4 + index * 0.3,
            ease: "easeInOut",
            delay: index * 0.2,
          }
        }
      } : { opacity: 0, y: 50 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"
      />
      
      {/* Main card */}
      <motion.div
        className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl p-4 flex items-center justify-center space-x-3 hover:border-cyan-400/50 transition-all duration-300"
      >
        {/* Animated icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            delay: index * 0.1
          }}
        >
          <MapPin className="text-cyan-400 w-5 h-5" />
        </motion.div>
        
        <span className="text-white font-medium text-sm sm:text-base">
          {city}
        </span>
        
        {/* Sparkle effect */}
        <motion.div
          animate={{ 
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: index * 0.3
          }}
          className="absolute top-1 right-1"
        >
          <Sparkles className="text-yellow-400 w-3 h-3 opacity-70" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CityRow = ({ cities, direction, rowIndex }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    {cities.map((city, index) => (
      <CityCard 
        key={index} 
        city={city} 
        index={index} 
        direction={direction}
      />
    ))}
  </div>
);

function ServiceAreas() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const inputRef = useRef(null);
  
  const isTitleInView = useInView(titleRef, { once: true });
  const isSubtitleInView = useInView(subtitleRef, { once: true });
  const isInputInView = useInView(inputRef, { once: true });

  return (
    <section className="mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated Title */}
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isTitleInView ? { 
            opacity: 1, 
            y: 0, 
            scale: 1
          } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(236, 72, 153, 0.5)",
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            We Deliver Across INDIA 🇮🇳
          </motion.span>
        </motion.h2>

        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isSubtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 mb-12 max-w-xl mx-auto text-lg"
        >
          LuggageFree is available in the following cities with{" "}
          <span className="text-cyan-400 font-semibold">lightning-fast</span> delivery:
        </motion.p>

        {/* Animated city rows */}
        <div className="space-y-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CityRow cities={citiesRow1} direction="left" rowIndex={0} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CityRow cities={citiesRow2} direction="right" rowIndex={1} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CityRow cities={citiesRow3} direction="left" rowIndex={2} />
          </motion.div>
        </div>

        {/* Enhanced pincode input */}
        <motion.div
          ref={inputRef}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isInputInView ? { 
            opacity: 1, 
            scale: 1, 
            y: 0 
          } : { opacity: 0, scale: 0.8, y: 50 }}
          transition={{ 
            delay: 0.4,
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 relative"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your pincode"
              className="px-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl w-full sm:w-[320px] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="absolute inset-0 border border-cyan-500/30 rounded-xl pointer-events-none"
            />
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(34, 211, 238, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden"
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            Check Coverage
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInputInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sm text-gray-400 mt-6"
        >
          <motion.span
            animate={{
              color: ["#9CA3AF", "#34D399", "#9CA3AF"]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            More cities launching soon! 🚀
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
}

export default ServiceAreas;