import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Book() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    bags: "1",
    type: "Suitcase",
    weight: "",
    name: "",
    phone: "",
    email: "",
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingCreated, setBookingCreated] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

     const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);
     setError("");

     try {
       const token = localStorage.getItem('token');
       if (!token) {
         throw new Error('Please login to create a booking');
       }

       const bookingData = {
         source: formData.pickup,
         destination: formData.drop,
         date: formData.date,
         luggageType: formData.type,
         weight: formData.weight,
         customerName: formData.name,
         customerPhone: formData.phone,
         customerEmail: formData.email,
         bags: formData.bags,
         time: formData.time
       };

       console.log("📦 Sending booking data:", bookingData);

       const response = await fetch(`${BASE_URL}/api/bookings/create`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(bookingData)
       });

       if (!response.ok) {
         let errorMessage = 'Failed to create booking';
         try {
           const errorData = await response.json();
           errorMessage = errorData.message || errorMessage;
         } catch (parseError) {
           errorMessage = response.statusText || errorMessage;
         }
         throw new Error(errorMessage);
       }

       const responseText = await response.text(); // Get response as text
       console.log("Response Text:", responseText); // Log the response text

       if (!responseText) {
         throw new Error('Empty response from server');
       }

       let data;
       try {
         data = JSON.parse(responseText);
       } catch (parseError) {
         console.error("❌ JSON Parse Error:", parseError);
         console.error("❌ Response text:", responseText);
         throw new Error('Invalid response format from server');
       }

       console.log("✅ Booking created successfully:", data);
       setTrackingId(data.booking?.trackingId || data.trackingId || 'N/A');
       setBookingCreated(true);
       setTimeout(() => setShowPayment(true), 1000);
       
     } catch (error) {
       console.error("❌ Booking error:", error);
       setError(error.message || "Something went wrong. Please try again.");
     } finally {
       setIsLoading(false);
     }
   };
   
  const handlePaymentComplete = () => {
    // After payment, redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleViewBookings = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-3 animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Success Message */}
        {bookingCreated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-8 p-6 bg-green-900/50 border border-green-500 text-green-200 rounded-xl backdrop-blur-sm text-center"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Booking Created Successfully!</h2>
            <p className="text-xl mb-4">Tracking ID: <span className="font-mono font-bold text-green-300">{trackingId}</span></p>
            <button
              onClick={handleViewBookings}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-bold transition-all"
            >
              View My Bookings
            </button>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          variants={cardVariants}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Book Your Luggage Pickup
          </motion.h1>
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🧳
          </motion.div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fast, secure, and reliable luggage transport service
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={cardVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                {error}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pickup & Drop Info */}
            <motion.div
              variants={cardVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">📍</span>
                <h2 className="text-2xl font-bold text-white">
                  Pickup & Drop Info
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="pickup"
                      placeholder="Pickup Location"
                      value={formData.pickup}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="drop"
                      placeholder="Drop Location"
                      value={formData.drop}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Luggage Details */}
            <motion.div
              variants={cardVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">🧳</span>
                <h2 className="text-2xl font-bold text-white">
                  Luggage Details
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    name="bags"
                    value={formData.bags}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-gray-800">
                        {i + 1} Bag(s)
                      </option>
                    ))}
                  </select>
                  
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Suitcase" className="bg-gray-800">Suitcase</option>
                    <option value="Backpack" className="bg-gray-800">Backpack</option>
                    <option value="Duffle" className="bg-gray-800">Duffle</option>
                  </select>
                </div>
                
                <input
                  type="text"
                  name="weight"
                  placeholder="Approx Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            variants={cardVariants}
            className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">👤</span>
              <h2 className="text-2xl font-bold text-white">
                Your Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={cardVariants}
            className="mt-10 text-center"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={isLoading || bookingCreated}
              className={`relative px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                isLoading || bookingCreated
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black shadow-lg hover:shadow-2xl'
              }`}
            >
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full mr-3"
                    />
                    Creating Booking...
                  </>
                ) : bookingCreated ? (
                  <>
                    <span className="text-2xl mr-3">✅</span>
                    Booking Created!
                  </>
                ) : (
                  <>
                    <span className="text-2xl mr-3">🚚</span>
                    Book My Luggage
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Payment Section */}
        {showPayment && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Select Payment Method
                </h2>
                <span className="text-4xl">💳</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "UPI", icon: "📱" },
                  { name: "Credit Card", icon: "💳" },
                  { name: "Debit Card", icon: "💳" },
                  { name: "Cash on Pickup", icon: "💰" }
                ].map((method) => (
                  <motion.button
                    key={method.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPaymentMethod(method.name)}
                    className={`p-6 rounded-xl font-semibold transition-all duration-300 border-2 ${
                      paymentMethod === method.name
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400 shadow-lg"
                        : "bg-gray-700/50 text-white border-gray-600 hover:border-yellow-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="text-sm">{method.name}</div>
                  </motion.button>
                ))}
              </div>

              {paymentMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 text-center"
                >
                  <div className="inline-flex items-center px-6 py-3 bg-green-900/50 border border-green-500 text-green-200 rounded-xl mb-4">
                    <span className="text-xl mr-2">✅</span>
                    Payment method selected: {paymentMethod}
                  </div>
                  <div>
                    <button
                      onClick={handlePaymentComplete}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
                    >
                      Complete Payment & View Booking
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}