import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Truck,
  Phone,
  Camera,
  Star,
  ArrowLeft,
  RefreshCw,
  Navigation,
  Shield,
  Zap,
  Calendar,
  User,
  Weight,
  Eye,
  Edit,
  X,
  Save,
} from "lucide-react";
import { BASE_URL } from "../utils/api"; // ✅ Adjust path if needed

export default function BookingDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Get user info from localStorage or token
  //This code snippet defines a function that retrieves a JWT token from local storage, decodes it, and extracts user information like ID, name, and email.
  useEffect(() => {
    const getUserFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode JWT token to get user info
          const payload = JSON.parse(atob(token.split(".")[1]));
          return {
            id: payload.id,
            name: payload.name || "User",
            email: payload.email || "user@example.com",
          };
        } catch (error) {
          console.error("Error decoding token:", error);
          return null;
        }
      }
      return null;
    };

    const user = getUserFromToken();
    if (user) {
      setCurrentUser(user);
      fetchBookings();
    } else {
      setError("Please login to view bookings");
      setIsLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${BASE_URL}/api/bookings/my-bookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ✅ Use this instead of response.text() + JSON.parse
      const data = await response.json();
      console.log("✅ Raw data from backend:", data);

      const transformedBookings = (data.bookings || []).map((booking) => ({
        id: booking._id,
        trackingId: booking.trackingId,
        source: booking.source,
        destination: booking.destination,
        date: booking.date,
        time: booking.time || "10:00 AM",
        status: mapBackendStatusToFrontend(booking.status),
        weight: booking.weight,
        luggageType: booking.luggageType,
        customerName: currentUser?.name || "Customer",
        customerPhone: "+91 98765 43210",
        customerEmail: currentUser?.email || "customer@example.com",
        bags: booking.bags || "1",
        price: calculatePrice(booking.weight, booking.luggageType),
        createdAt: booking.createdAt,
      }));

      setCurrentBookings(transformedBookings);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      setError(error.message || "Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const mapBackendStatusToFrontend = (backendStatus) => {
    const statusMap = {
      "Awaiting Pickup": "pending",
      "Picked Up": "confirmed",
      "In Transit": "in-transit",
      Delivered: "delivered",
      Cancelled: "cancelled",
    };
    return statusMap[backendStatus] || "pending";
  };

  const calculatePrice = (weight, luggageType) => {
    let basePrice = 200;
    const weightNum = parseInt(weight) || 10;
    if (weightNum > 20) basePrice += 200;
    else if (weightNum > 10) basePrice += 100;

    if (luggageType === "Premium") basePrice *= 1.5;
    else if (luggageType === "Express") basePrice *= 1.8;

    return `₹${Math.round(basePrice)}`;
  };

  const generateTrackingData = (booking) => {
    const statusMap = {
      pending: "scheduled",
      confirmed: "picked_up",
      "in-transit": "in_transit",
      delivered: "delivered",
    };

    const currentStatus = statusMap[booking.status] || "scheduled";
    const progressMap = {
      scheduled: 20,
      picked_up: 40,
      in_transit: 70,
      delivered: 100,
    };

    const drivers = [
      {
        name: "Shah Rukh Khan",
        phone: "+91 98765 43210",
        vehicle: "Tata Ace (DL-8C-1234)",
        rating: 4.8,
      },
      {
        name: "Amitabh Bachchan",
        phone: "+91 87654 32109",
        vehicle: "Mahindra Bolero (MH-01-2345)",
        rating: 4.9,
      },
      {
        name: "Rajinikanth",
        phone: "+91 76543 21098",
        vehicle: "Maruti Eeco (KA-03-5678)",
        rating: 4.7,
      },
      {
        name: "Mia Bhai DSP Siraj",
        phone: "+91 95432 10987",
        vehicle: "Ashok Leyland (UP-16-7890)",
        rating: 4.6,
      },
    ];

    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

    return {
      id: booking.trackingId,
      status: currentStatus,
      customer: booking.customerName,
      route: `${booking.source} → ${booking.destination}`,
      progress: progressMap[currentStatus],
      estimatedTime:
        currentStatus === "delivered"
          ? "Delivered"
          : currentStatus === "in_transit"
          ? "25 minutes"
          : currentStatus === "picked_up"
          ? "45 minutes"
          : "1 hour",
      driver: randomDriver,
      timeline: [
        {
          status: "scheduled",
          time: booking.time,
          completed: [
            "scheduled",
            "picked_up",
            "in_transit",
            "delivered",
          ].includes(currentStatus),
          icon: Clock,
        },
        {
          status: "picked_up",
          time: "10:30 AM",
          completed: ["picked_up", "in_transit", "delivered"].includes(
            currentStatus
          ),
          icon: Package,
        },
        {
          status: "in_transit",
          time: "11:00 AM",
          completed: ["in_transit", "delivered"].includes(currentStatus),
          icon: Truck,
        },
        {
          status: "out_for_delivery",
          time: "11:30 AM",
          completed: currentStatus === "delivered",
          icon: MapPin,
        },
        {
          status: "delivered",
          time: "12:00 PM",
          completed: currentStatus === "delivered",
          icon: CheckCircle,
        },
      ],
      location:
        currentStatus === "delivered"
          ? `Delivered to: ${booking.destination}`
          : currentStatus === "in_transit"
          ? `En route to ${booking.destination}`
          : currentStatus === "picked_up"
          ? `Picked up from: ${booking.source}`
          : `Scheduled for pickup from: ${booking.source}`,
      weight: booking.weight,
      luggageType: booking.luggageType,
      bookingDate: booking.date,
      bags: booking.bags,
      originalBooking: booking,
    };
  };

  const handleTrackBooking = (booking) => {
    setSelectedBooking(booking);
    setIsTracking(true);

    setTimeout(() => {
      const generatedData = generateTrackingData(booking);
      setTrackingData(generatedData);
      setIsTracking(false);
      setCurrentView("track");
    }, 1000);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedBooking(null);
    setTrackingData(null);
  };

  const handleRefreshBookings = () => {
    fetchBookings();
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking.id);
    setEditForm({
      destination: booking.destination,
      date: booking.date,
      time: booking.time,
      weight: booking.weight,
      luggageType: booking.luggageType,
      bags: booking.bags,
    });
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditForm({});
  };

  const handleSaveEdit = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
    //Sends a PUT request to the backend to modify an existing booking.
      const response = await fetch(
        `${BASE_URL}/api/bookings/modify/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking");
      }

      alert("✅ Booking updated successfully!");
      setEditingBooking(null);
      setEditForm({});
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("❌ Edit booking error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      alert("✅ Booking cancelled successfully!");
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("❌ Cancel booking error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const statusColors = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    "in-transit": "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  const statusLabels = {
    pending: "Pickup Pending",
    confirmed: "Confirmed",
    "in-transit": "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const trackingStatusColors = {
    scheduled: "from-blue-500 to-blue-600",
    picked_up: "from-yellow-500 to-orange-500",
    in_transit: "from-purple-500 to-pink-500",
    out_for_delivery: "from-orange-500 to-red-500",
    delivered: "from-green-500 to-emerald-500",
  };

  const trackingStatusLabels = {
    scheduled: "Pickup Scheduled",
    picked_up: "Picked Up",
    in_transit: "In Transit",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header with User Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome back, {currentUser?.name || "User "}!
                    </h2>
                    <p className="text-slate-300 text-sm">
                      {currentUser?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Luggage Dashboard
                </h1>
                <p className="text-slate-300">
                  Track and manage your luggage deliveries
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleRefreshBookings}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-2">
            {/* Total Bookings */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white w-full max-w-xs mx-auto md:max-w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold">{currentBookings.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            {/* Pending */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white w-full max-w-xs mx-auto md:max-w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Pending</p>
                  <p className="text-2xl font-bold">
                    {
                      currentBookings.filter((b) => b.status === "pending")
                        .length
                    }
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>

            {/* In Transit */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-xs mx-auto md:max-w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">In Transit</p>
                  <p className="text-2xl font-bold">
                    {
                      currentBookings.filter((b) => b.status === "in-transit")
                        .length
                    }
                  </p>
                </div>
                <Truck className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Delivered</p>
                  <p className="text-2xl font-bold">
                    {
                      currentBookings.filter((b) => b.status === "delivered")
                        .length
                    }
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-white">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading bookings...</span>
              </div>
            </div>
          )}

          {/* Bookings List */}
          {!isLoading && currentBookings.length === 0 && !error && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Bookings Found
              </h3>
              <p className="text-slate-400">
                Your luggage deliveries will appear here
              </p>
            </div>
          )}

          {!isLoading && currentBookings.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Booking Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {booking.trackingId}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {booking.customerName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                          statusColors[booking.status]
                        }`}
                      >
                        {statusLabels[booking.status]}
                      </span>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Route</span>
                    </div>
                    {editingBooking === booking.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editForm.destination}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              destination: e.target.value,
                            })
                          }
                          placeholder="Destination"
                          className="w-full p-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <p className="text-white font-medium">
                        {booking.source} → {booking.destination}
                      </p>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {editingBooking === booking.id ? (
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(e) =>
                            setEditForm({ ...editForm, date: e.target.value })
                          }
                          className="bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                        />
                      ) : (
                        <span className="text-slate-300 text-sm">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {editingBooking === booking.id ? (
                        <input
                          type="time"
                          value={editForm.time}
                          onChange={(e) =>
                            setEditForm({ ...editForm, time: e.target.value })
                          }
                          className="bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                        />
                      ) : (
                        <span className="text-slate-300 text-sm">
                          {booking.time}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Weight className="w-4 h-4 text-slate-400" />
                      {editingBooking === booking.id ? (
                        <input
                          type="number"
                          value={editForm.weight}
                          onChange={(e) =>
                            setEditForm({ ...editForm, weight: e.target.value })
                          }
                          placeholder="Weight (kg)"
                          className="w-20 p-1 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                        />
                      ) : (
                        <span className="text-slate-300 text-sm">
                          {booking.weight} kg
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      {editingBooking === booking.id ? (
                        <input
                          type="number"
                          value={editForm.bags}
                          onChange={(e) =>
                            setEditForm({ ...editForm, bags: e.target.value })
                          }
                          placeholder="Bags"
                          className="w-16 p-1 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                        />
                      ) : (
                        <span className="text-slate-300 text-sm">
                          {booking.bags} bag(s)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Luggage Type */}
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-slate-400" />
                    {editingBooking === booking.id ? (
                      <select
                        value={editForm.luggageType}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            luggageType: e.target.value,
                          })
                        }
                        className="bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Express">Express</option>
                      </select>
                    ) : (
                      <span className="text-slate-300 text-sm">
                        {booking.luggageType}
                      </span>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="text-white font-bold text-lg">
                      {booking.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTrackBooking(booking)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        Track
                      </button>
                    </div>
                  </div>

                  {/* Edit/Cancel Actions */}
                  <div className="flex gap-2 mt-3">
                    {editingBooking === booking.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(booking.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditBooking(booking)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          disabled={
                            booking.status === "delivered" ||
                            booking.status === "cancelled"
                          }
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          disabled={
                            booking.status === "delivered" ||
                            booking.status === "cancelled"
                          }
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tracking View
  if (currentView === "track") {
    if (isTracking) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Tracking Your Luggage
            </h2>
            <p className="text-slate-300">
              Please wait while we fetch the latest updates...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Live Tracking
            </h1>
            <p className="text-slate-300">
              Track your luggage delivery in real-time
            </p>
          </div>

          {trackingData && (
            <>
              {/* Status Banner */}
              <div
                className={`bg-gradient-to-r ${
                  trackingStatusColors[trackingData.status]
                } rounded-xl p-6 mb-8 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {trackingStatusLabels[trackingData.status]}
                    </h2>
                    <p className="text-lg opacity-90">
                      {trackingData.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-75">Estimated Time</p>
                    <p className="text-xl font-bold">
                      {trackingData.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Progress</h3>
                  <span className="text-purple-400 font-medium">
                    {trackingData.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${trackingData.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Driver Information
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {trackingData.driver.name}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {trackingData.driver.vehicle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">
                      {trackingData.driver.rating}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Delivery Timeline
                </h3>
                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-slate-600"
                          }`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              event.completed ? "text-white" : "text-slate-400"
                            }`}
                          >
                            {trackingStatusLabels[event.status] || event.status}
                          </p>
                          <p className="text-slate-500 text-sm">{event.time}</p>
                        </div>
                        {event.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Booking Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Tracking ID</p>
                    <p className="text-white font-medium">{trackingData.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Customer</p>
                    <p className="text-white font-medium">
                      {trackingData.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Weight</p>
                    <p className="text-white font-medium">
                      {trackingData.weight} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Service Type</p>
                    <p className="text-white font-medium">
                      {trackingData.luggageType}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Number of Bags</p>
                    <p className="text-white font-medium">
                      {trackingData.bags}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Booking Date</p>
                    <p className="text-white font-medium">
                      {new Date(trackingData.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400 text-sm">Route</p>
                    <p className="text-white font-medium">
                      {trackingData.route}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
