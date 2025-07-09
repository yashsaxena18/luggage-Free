import { motion } from "framer-motion";
import { Check, Star, Zap, Heart } from "lucide-react";

function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "₹299",
      features: [
        "Pickup & delivery",
        "Up to 15kg",
        "Track via ID",
        "Email support",
      ],
      icon: <Check className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Priority",
      price: "₹499",
      features: [
        "Faster delivery",
        "Up to 20kg",
        "Live GPS tracking",
        "Priority support",
      ],
      highlight: true,
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Wedding Pack",
      price: "₹999",
      features: [
        "Multiple bags",
        "Up to 50kg",
        "Group delivery",
        "Dedicated agent",
      ],
      icon: <Heart className="w-6 h-6" />,
      gradient: "from-rose-500 to-orange-500",
    },
  ];

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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
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
    hidden: { 
      opacity: 0, 
      y: -30,
    },
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
          <motion.h2 
            className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.05,
                  color: "#ffffff",
                  transition: { duration: 0.2 }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your laundry needs with our affordable and transparent pricing
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`
                relative group cursor-pointer
                ${plan.highlight 
                  ? 'md:scale-105 md:-translate-y-4' 
                  : ''
                }
              `}
              variants={cardVariants}
              whileHover={{ 
                scale: plan.highlight ? 1.02 : 1.05,
                y: plan.highlight ? -20 : -10,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect */}
              <div className={`
                absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500
                bg-gradient-to-r ${plan.gradient} blur-xl -z-10
              `} />
              
              {/* Highlight badge */}
              {plan.highlight && (
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
              <div className={`
                relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 h-full
                border border-white/20 shadow-2xl
                transition-all duration-300 group-hover:bg-white/15
                ${plan.highlight ? 'ring-2 ring-purple-500/50' : ''}
              `}>
                {/* Icon */}
                <motion.div
                  className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} 
                    flex items-center justify-center mb-6 shadow-lg
                  `}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.title}
                </h3>

                {/* Price */}
                <motion.div 
                  className="mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-300 ml-2">per service</span>
                </motion.div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-slate-200"
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={featureVariants}
                    >
                      <div className={`
                        w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} 
                        flex items-center justify-center mr-3 flex-shrink-0
                      `}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <motion.button
                  className={`
                    w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300
                    ${plan.highlight
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Choose Plan
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-slate-300 mb-4">
            All plans include free pickup and delivery within city limits
          </p>
          <motion.button
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
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

export default Pricing;