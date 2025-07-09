import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// FAQ Data
const faqs = [
  {
    question: "What is LuggageFree?",
    answer: "LuggageFree is a smart delivery service that picks up and delivers your luggage safely between cities, saving you from carrying heavy bags.",
  },
  {
    question: "How early should I book a luggage pickup?",
    answer: "We recommend booking at least 12–24 hours before your travel time to ensure on-time pickup and delivery.",
  },
  {
    question: "Is my luggage insured during transit?",
    answer: "Yes! All packages are insured against damage or loss based on the declared value at booking.",
  },
  {
    question: "What cities do you currently cover?",
    answer: "We operate in all major metro and tier-2 cities across India. More cities are added every month.",
  },
  {
    question: "Can I track my luggage in real-time?",
    answer: "Yes, we offer live tracking through your account dashboard with real-time location updates.",
  },
  {
    question: "What items are not allowed to be sent?",
    answer: "Restricted items include liquids, flammables, perishable food, sharp objects, and anything banned by Indian transport laws.",
  },
];

function FAQItem({ faq, isOpen, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Animated gradient border */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, #a855f7, #ec4899, #f97316, #a855f7)",
            "linear-gradient(90deg, #ec4899, #f97316, #a855f7, #ec4899)",
            "linear-gradient(135deg, #f97316, #a855f7, #ec4899, #f97316)",
            "linear-gradient(180deg, #a855f7, #ec4899, #f97316, #a855f7)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Outer glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 15px rgba(168, 85, 247, 0.2)",
            "0 0 25px rgba(236, 72, 153, 0.2)",
            "0 0 20px rgba(249, 115, 22, 0.2)",
            "0 0 15px rgba(168, 85, 247, 0.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-[3px] rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"
      />

      {/* Main card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Header with thin glow border */}
        <div className="relative">
          {/* Thin glowing border for question area */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(90deg, #a855f7, #ec4899, #f97316, #a855f7)",
                "linear-gradient(180deg, #ec4899, #f97316, #a855f7, #ec4899)",
                "linear-gradient(270deg, #f97316, #a855f7, #ec4899, #f97316)",
                "linear-gradient(360deg, #a855f7, #ec4899, #f97316, #a855f7)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          <motion.button
            onClick={onClick}
            whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 flex justify-between items-center text-left transition-colors duration-200 relative z-10"
          >
            <motion.span 
              className="font-semibold text-gray-800 text-lg pr-4"
              animate={isOpen ? { color: "#7c3aed" } : { color: "#1f2937" }}
              transition={{ duration: 0.3 }}
            >
              {faq.question}
            </motion.span>
            <motion.div
              animate={{ 
                rotate: isOpen ? 180 : 0,
                color: isOpen ? "#7c3aed" : "#a855f7"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="px-6 pb-6 text-gray-600 leading-relaxed"
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle inner glow when opened */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-orange-50/30 pointer-events-none rounded-2xl"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) =>
    setOpenIndex(index === openIndex ? null : index);

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-orange-200/20 to-purple-200/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <motion.span 
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Frequently Asked Questions
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Everything you need to know about LuggageFree
            </motion.span>
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-gray-600 mb-6"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Still have questions? We're here to help!
          </motion.p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Redirect to contact route
              window.location.href = '/contact';
            }}
            className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:via-white/30"
            />
            <span className="relative z-10">Contact Support</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;