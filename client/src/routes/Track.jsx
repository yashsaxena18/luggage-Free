import { useState } from 'react';
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Truck,
  Phone,
  Camera,
  Star,
  Navigation,
  RefreshCw,
  Shield,
  Zap
} from 'lucide-react';
import { BASE_URL } from '../utils/api'; // ✅ Adjust path if needed

export default function TrackLuggage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      alert('Please enter a tracking ID');
      return;
    }

    setIsTracking(true);
    try {
      const response = await fetch(`${BASE_URL}/api/track/${trackingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const dummyDriver = {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        vehicle: 'Tata Ace (DL-8C-1234)',
        rating: 4.8
      };

      const dummyTimeline = [
        {
          status: 'scheduled',
          time: '10:00 AM',
          icon: Clock,
          completed: true,
          description: 'Pickup scheduled'
        },
        {
          status: 'picked_up',
          time: '10:30 AM',
          icon: Package,
          completed: data.status !== 'Awaiting Pickup',
          description: 'Luggage picked up from source'
        },
        {
          status: 'in_transit',
          time: '11:00 AM',
          icon: Truck,
          completed: data.status === 'in_transit' || data.status === 'delivered',
          description: 'In transit to destination'
        },
        {
          status: 'delivered',
          time: '12:00 PM',
          icon: CheckCircle,
          completed: data.status === 'delivered',
          description: 'Delivered to destination'
        }
      ];

      setTrackingData({
        ...data,
        driver: dummyDriver,
        timeline: dummyTimeline
      });
    } catch (err) {
      alert(err.message || 'Tracking failed');
    }
    setIsTracking(false);
  };

  const handleRefresh = () => {
    if (trackingData) {
      setIsTracking(true);
      setTimeout(() => {
        setTrackingData((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 100),
          estimatedTime: prev.progress >= 90 ? '5 minutes' : '25 minutes'
        }));
        setIsTracking(false);
      }, 1000);
    }
  };

  const statusLabels = {
    scheduled: 'Pickup Scheduled',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    'Awaiting Pickup': 'Awaiting Pickup'
  };

  const statusColors = {
    scheduled: 'from-blue-500 to-blue-600',
    picked_up: 'from-yellow-500 to-orange-500',
    in_transit: 'from-purple-500 to-pink-500',
    delivered: 'from-green-500 to-emerald-500',
    'Awaiting Pickup': 'from-purple-700 to-purple-800'
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <style jsx>{`
        @keyframes truckRotate {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-64 h-64 bg-cyan-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-blue-300 rounded-full opacity-8 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-5 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-400 rounded-full opacity-7 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300">
            Track Your Luggage
          </h1>
          <div 
            className="text-6xl mb-4 cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => alert('🚚 Track Your Luggage 🚚')}
            style={{
              animation: 'truckRotate 3s ease-in-out infinite'
            }}
          >
            🚚
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time tracking with AI-powered insights
          </p>
        </div>

        {/* Tracking Input */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6 items-end">
              <div className="flex-1">
                <label className="block text-lg font-semibold text-white mb-3">
                  Enter Your Tracking ID
                </label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g., 1a2b3c4d5e6f"
                  className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={isTracking}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  isTracking
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105'
                }`}
              >
                {isTracking ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Tracking...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Navigation size={24} />
                    <span>Track Now</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Data */}
        {trackingData && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Booking Summary */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">📦</span>
                <h2 className="text-3xl font-bold text-white">Booking Summary</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-white">
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Tracking ID:</span> 
                    <span className="ml-2 font-mono font-bold text-cyan-400">{trackingData.trackingId}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Source:</span> 
                    <span className="ml-2">{trackingData.source}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Destination:</span> 
                    <span className="ml-2">{trackingData.destination}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Luggage Type:</span> 
                    <span className="ml-2">{trackingData.luggageType}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Weight:</span> 
                    <span className="ml-2">{trackingData.weight}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Status:</span> 
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg">
                      {statusLabels[trackingData.status] || trackingData.status}
                    </span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Date:</span> 
                    <span className="ml-2">{new Date(trackingData.date).toLocaleDateString()}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">ETA:</span> 
                    <span className="ml-2">{trackingData.estimatedTime}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-300">Live Location:</span> 
                    <span className="ml-2">{trackingData.location}</span>
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-cyan-400">{trackingData.progress}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-1000 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                    style={{ width: `${trackingData.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-8 justify-center">
                <span className="text-3xl mr-3">🕐</span>
                <h2 className="text-3xl font-bold text-white">Delivery Timeline</h2>
              </div>
              
              <div className="space-y-6">
                {trackingData.timeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-6 p-4 rounded-xl transition-all duration-300 ${
                        item.completed 
                          ? 'bg-slate-700/30 border border-cyan-400/30' 
                          : 'bg-slate-700/10 border border-slate-600/30 opacity-60'
                      }`}
                    >
                      <div className={`rounded-full p-4 ${
                        item.completed 
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                          : 'bg-gray-600'
                      }`}>
                        <Icon size={24} className={item.completed ? 'text-white' : 'text-gray-400'} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-lg font-bold ${
                            item.completed ? 'text-cyan-400' : 'text-gray-500'
                          }`}>
                            {statusLabels[item.status] || item.status}
                          </span>
                          <span className={`text-sm ${
                            item.completed ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {item.time}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          item.completed ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      {item.completed && (
                        <div className="text-green-400">
                          <CheckCircle size={20} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Information */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">👨‍💼</span>
                <h2 className="text-3xl font-bold text-white">Driver Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {trackingData.driver.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{trackingData.driver.name}</h3>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-semibold">{trackingData.driver.rating}</span>
                        <span className="text-gray-400">rating</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone size={18} />
                      <span>{trackingData.driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Truck size={18} />
                      <span>{trackingData.driver.vehicle}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                    <Phone size={20} />
                    Call Driver
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                    <MapPin size={20} />
                    View Live Location
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">⚡</span>
                <h2 className="text-3xl font-bold text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={handleRefresh}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-3"
                >
                  <RefreshCw size={32} />
                  <span>Refresh Status</span>
                </button>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-3">
                  <Camera size={32} />
                  <span>Photo Proof</span>
                </button>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-3">
                  <Shield size={32} />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>

            {/* Additional Features */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">🚀</span>
                <h2 className="text-3xl font-bold text-white">Premium Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap size={24} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Smart Alerts</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Get notified instantly when your luggage status changes</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield size={24} className="text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Insurance</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Your luggage is protected with comprehensive coverage</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={24} className="text-green-400" />
                    <h3 className="text-lg font-bold text-white">GPS Tracking</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Real-time location updates with precision mapping</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-xl border border-orange-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Camera size={24} className="text-orange-400" />
                    <h3 className="text-lg font-bold text-white">Photo Updates</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Visual confirmation at every step of the journey</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p>© 2025 LuggageTracker Pro. Powered by AI & Real-time GPS Technology.</p>
        </div>
      </div>
    </div>
  );
}