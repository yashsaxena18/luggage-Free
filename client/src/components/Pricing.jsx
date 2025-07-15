import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Heart, Zap } from "lucide-react";

export default function Price() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 299,
      icon: <Check className="w-8 h-8 text-cyan-400" />,
      features: [
        "Pickup & delivery",
        "Up to 15kg",
        "Track via ID",
        "Email support",
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "priority",
      name: "Priority",
      price: 499,
      icon: <Zap className="w-8 h-8 text-pink-400" />,
      features: [
        "Faster delivery",
        "Up to 20kg",
        "Live GPS tracking",
        "Priority support",
      ],
      buttonText: "Choose Plan",
      popular: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "wedding",
      name: "Wedding Pack",
      price: 999,
      icon: <Heart className="w-8 h-8 text-orange-400" />,
      features: [
        "Multiple bags",
        "Up to 50kg",
        "Group delivery",
        "Dedicated agent",
      ],
      popular: false,
      gradient: "from-rose-500 to-orange-500",
    },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-2xl">
              <Star className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {"Transparent Pricing for Every Journey".split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  damping: 25,
                }}
                whileHover={{
                  scale: 1.05,
                  color: "#ffffff",
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your laundry needs with our affordable and transparent pricing
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="flex flex-row gap-6 sm:gap-8 mb-12 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible no-scrollbar"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`
                relative group cursor-pointer
                ${plan.popular ? "md:scale-105 md:-translate-y-4" : ""}
                flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-auto
              `}
              variants={cardVariants}
              whileHover={
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? { scale: 1.05, y: -10 }
                  : {}
              }
              whileTap={{ scale: 0.97 }}
            >
              {/* Glow */}
              <div
                className={`
                  absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500
                  bg-gradient-to-r ${plan.gradient} blur-xl -z-10
                `}
              />

              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", damping: 15 }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={`
                  relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 h-full
                  border border-white/20 shadow-2xl
                  transition-all duration-300 group-hover:bg-white/15
                  ${plan.popular ? "ring-2 ring-purple-500/50" : ""}
                  ${selectedPlan === plan.id ? "ring-2 ring-yellow-400" : ""}
                `}
              >
                {/* Icon */}
                <motion.div
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} 
                    flex items-center justify-center mb-4 sm:mb-6 shadow-lg
                  `}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-white">{plan.icon}</div>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                <motion.div className="mb-6 sm:mb-8">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    ₹{plan.price}
                  </span>
                  <span className="text-slate-300 ml-2 text-sm sm:text-base">
                    per service
                  </span>
                </motion.div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-slate-200"
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={featureVariants}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} 
                          flex items-center justify-center mr-3 flex-shrink-0
                        `}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`
                    w-full py-3 sm:py-4 px-6 rounded-2xl font-semibold transition-all duration-300
                    ${plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"}
                    ${selectedPlan === plan.id ? "ring-2 ring-yellow-400" : ""}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Choose Now"}
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-slate-300 mb-4 text-sm sm:text-base">
            All plans include free pickup and delivery within city limits
          </p>
          <motion.button
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Need a custom plan? Contact us →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
