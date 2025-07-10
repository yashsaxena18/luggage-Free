import React, { useState } from 'react';
import { Check, Zap, Heart, Package, ArrowRight } from 'lucide-react';

const PricingCards = () => {
  const [selectedWeights, setSelectedWeights] = useState({
    basic: '10',
    priority: '15',
    wedding: '25'
  });

  const calculatePrice = (weight, luggageType) => {
    let basePrice = 200;
    const weightNum = parseInt(weight) || 10;
    if (weightNum > 20) basePrice += 200;
    else if (weightNum > 10) basePrice += 100;
    
    if (luggageType === "Premium") basePrice *= 1.5;
    else if (luggageType === "Express") basePrice *= 1.8;
    
    return `₹${Math.round(basePrice)}`;
  };

  const handleWeightChange = (plan, weight) => {
    setSelectedWeights(prev => ({
      ...prev,
      [plan]: weight
    }));
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: <Check className="w-6 h-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-blue-600',
      bgGradient: 'from-cyan-500/20 to-blue-600/20',
      borderGradient: 'from-cyan-400/50 to-blue-500/50',
      buttonGradient: 'from-cyan-500 to-blue-600',
      features: [
        'Pickup & delivery',
        'Track via ID',
        'Email support',
        'Insurance included'
      ],
      luggageType: 'Standard'
    },
    {
      id: 'priority',
      name: 'Priority',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-purple-400 via-pink-500 to-purple-600',
      bgGradient: 'from-purple-500/20 to-pink-600/20',
      borderGradient: 'from-purple-400/50 to-pink-500/50',
      buttonGradient: 'from-purple-500 to-pink-600',
      features: [
        'Faster delivery',
        'Live GPS tracking',
        'Priority support',
        'Express handling'
      ],
      luggageType: 'Premium',
      popular: true
    },
    {
      id: 'wedding',
      name: 'Wedding Pack',
      icon: <Heart className="w-6 h-6" />,
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      bgGradient: 'from-orange-500/20 to-red-600/20',
      borderGradient: 'from-orange-400/50 to-red-500/50',
      buttonGradient: 'from-orange-500 to-red-600',
      features: [
        'Multiple bags',
        'Group delivery',
        'Dedicated agent',
        'White-glove service'
      ],
      luggageType: 'Express'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 relative overflow-hidden">
            <span className="inline-block animate-pulse">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Transparent Pricing
              </span>
            </span>
            {/* Animated underline */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transform scale-x-0 animate-scale-x origin-left"></div>
            {/* Sparkle effects */}
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce"></div>
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in-up">
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-white">
              Choose the perfect plan for your luggage needs
            </span>
          </p>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }
          
          @keyframes scale-x {
            0% {
              transform: scaleX(0);
            }
            100% {
              transform: scaleX(1);
            }
          }
          
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
          }
          
          .animate-scale-x {
            animation: scale-x 2s ease-out 0.5s forwards;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.8s both;
          }
        `}</style>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                plan.popular ? 'md:-translate-y-4' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative overflow-hidden rounded-3xl backdrop-blur-md bg-gradient-to-br ${plan.bgGradient} border border-white/20 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-white/30`}>
                {/* Animated border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl mb-4 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    
                    {/* Weight selector */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-2">
                        Weight (kg)
                      </label>
                      <select
                        value={selectedWeights[plan.id]}
                        onChange={(e) => handleWeightChange(plan.id, e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      >
                        <option value="5" className="text-gray-800">5kg</option>
                        <option value="10" className="text-gray-800">10kg</option>
                        <option value="15" className="text-gray-800">15kg</option>
                        <option value="20" className="text-gray-800">20kg</option>
                        <option value="25" className="text-gray-800">25kg</option>
                        <option value="30" className="text-gray-800">30kg</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div className="text-4xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-110">
                      {calculatePrice(selectedWeights[plan.id], plan.luggageType)}
                    </div>
                    <p className="text-gray-300">per service</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 group/feature"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center transition-all duration-300 group-hover/feature:scale-110`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-200 group-hover/feature:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className={`w-full py-4 px-6 bg-gradient-to-r ${plan.buttonGradient} text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 group/button`}>
                    <span>Choose Plan</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>

                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${plan.gradient} opacity-20 blur-3xl transition-all duration-1000 group-hover:opacity-30 group-hover:rotate-12`}></div>
                  <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${plan.gradient} opacity-20 blur-3xl transition-all duration-1000 group-hover:opacity-30 group-hover:-rotate-12`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            All plans include insurance and 24/7 customer support
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Secure packaging</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Guaranteed delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;