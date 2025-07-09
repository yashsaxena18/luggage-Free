import { motion } from "framer-motion";
import { Users, GraduationCap, Bike, Briefcase } from "lucide-react";

const useCases = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Weddings",
    desc: "Send wedding outfits and gifts ahead of time — hassle free.",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Students",
    desc: "Move between home and hostel easily during vacations.",
  },
  {
    icon: <Bike className="w-8 h-8" />,
    title: "Bike Trips",
    desc: "Travel light. Get your bags delivered to your next destination.",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Business Travelers",
    desc: "Send your luggage or presentation material before you land.",
  },
];

function UseCases() {
  return (
    <section className="mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse"
        >
          Who It's For
        </motion.h2>

        {/* Card Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="group relative rounded-2xl p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 shadow-xl transition-transform hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(255,105,180,0.4)]"
            >
              <div className="bg-white rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center transition-all duration-300">
                {/* Icon with hover grow + color */}
                <div className="mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-pink-600 text-indigo-600">
                  {item.icon}
                </div>

                {/* Title with animated gradient text on hover */}
                <h3 className="text-lg font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>

                {/* Description stays subtle */}
                <p className="text-gray-600 text-sm mt-2 group-hover:text-gray-700 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCases;
