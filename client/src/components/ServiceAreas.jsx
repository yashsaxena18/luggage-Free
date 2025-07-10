import React, { useState, useRef } from 'react';
import { MapPin, Sparkles, Check, X, Loader2, AlertCircle } from 'lucide-react';

// City data with their pincodes
const cityData = {
  "Delhi": ["110001", "110002", "110003", "110004", "110005", "110006", "110007", "110008", "110009", "110010", "110011", "110012", "110013", "110014", "110015", "110016", "110017", "110018", "110019", "110020", "110021", "110022", "110023", "110024", "110025", "110026", "110027", "110028", "110029", "110030", "110031", "110032", "110033", "110034", "110035", "110036", "110037", "110038", "110039", "110040", "110041", "110042", "110043", "110044", "110045", "110046", "110047", "110048", "110049", "110050", "110051", "110052", "110053", "110054", "110055", "110056", "110057", "110058", "110059", "110060", "110061", "110062", "110063", "110064", "110065", "110066", "110067", "110068", "110069", "110070", "110071", "110072", "110073", "110074", "110075", "110076", "110077", "110078", "110079", "110080", "110081", "110082", "110083", "110084", "110085", "110086", "110087", "110088", "110089", "110090", "110091", "110092", "110093", "110094", "110095", "110096", "110097"],
  "Mumbai": ["400001", "400002", "400003", "400004", "400005", "400006", "400007", "400008", "400009", "400010", "400011", "400012", "400013", "400014", "400015", "400016", "400017", "400018", "400019", "400020", "400021", "400022", "400023", "400024", "400025", "400026", "400027", "400028", "400029", "400030", "400031", "400032", "400033", "400034", "400035", "400036", "400037", "400038", "400039", "400040", "400041", "400042", "400043", "400044", "400045", "400046", "400047", "400048", "400049", "400050", "400051", "400052", "400053", "400054", "400055", "400056", "400057", "400058", "400059", "400060", "400061", "400062", "400063", "400064", "400065", "400066", "400067", "400068", "400069", "400070", "400071", "400072", "400073", "400074", "400075", "400076", "400077", "400078", "400079", "400080", "400081", "400082", "400083", "400084", "400085", "400086", "400087", "400088", "400089", "400090", "400091", "400092", "400093", "400094", "400095", "400096", "400097", "400098", "400099", "400100", "400101", "400102", "400103", "400104"],
  "Bengaluru": ["560001", "560002", "560003", "560004", "560005", "560006", "560007", "560008", "560009", "560010", "560011", "560012", "560013", "560014", "560015", "560016", "560017", "560018", "560019", "560020", "560021", "560022", "560023", "560024", "560025", "560026", "560027", "560028", "560029", "560030", "560031", "560032", "560033", "560034", "560035", "560036", "560037", "560038", "560039", "560040", "560041", "560042", "560043", "560044", "560045", "560046", "560047", "560048", "560049", "560050", "560051", "560052", "560053", "560054", "560055", "560056", "560057", "560058", "560059", "560060", "560061", "560062", "560063", "560064", "560065", "560066", "560067", "560068", "560069", "560070", "560071", "560072", "560073", "560074", "560075", "560076", "560077", "560078", "560079", "560080", "560081", "560082", "560083", "560084", "560085", "560086", "560087", "560088", "560089", "560090", "560091", "560092", "560093", "560094", "560095", "560096", "560097", "560098", "560099", "560100"],
  "Pune": ["411001", "411002", "411003", "411004", "411005", "411006", "411007", "411008", "411009", "411010", "411011", "411012", "411013", "411014", "411015", "411016", "411017", "411018", "411019", "411020", "411021", "411022", "411023", "411024", "411025", "411026", "411027", "411028", "411029", "411030", "411031", "411032", "411033", "411034", "411035", "411036", "411037", "411038", "411039", "411040", "411041", "411042", "411043", "411044", "411045", "411046", "411047", "411048", "411049", "411050", "411051", "411052", "411053", "411054", "411055", "411056", "411057", "411058", "411059", "411060", "411061", "411062", "411063", "411064", "411065", "411066", "411067", "411068"],
  "Hyderabad": ["500001", "500002", "500003", "500004", "500005", "500006", "500007", "500008", "500009", "500010", "500011", "500012", "500013", "500014", "500015", "500016", "500017", "500018", "500019", "500020", "500021", "500022", "500023", "500024", "500025", "500026", "500027", "500028", "500029", "500030", "500031", "500032", "500033", "500034", "500035", "500036", "500037", "500038", "500039", "500040", "500041", "500042", "500043", "500044", "500045", "500046", "500047", "500048", "500049", "500050", "500051", "500052", "500053", "500054", "500055", "500056", "500057", "500058", "500059", "500060", "500061", "500062", "500063", "500064", "500065", "500066", "500067", "500068", "500069", "500070", "500071", "500072", "500073", "500074", "500075", "500076", "500077", "500078", "500079", "500080", "500081", "500082", "500083", "500084", "500085", "500086", "500087", "500088", "500089", "500090", "500091", "500092", "500093", "500094", "500095", "500096", "500097", "500098", "500099", "500100"],
  "Kolkata": ["700001", "700002", "700003", "700004", "700005", "700006", "700007", "700008", "700009", "700010", "700011", "700012", "700013", "700014", "700015", "700016", "700017", "700018", "700019", "700020", "700021", "700022", "700023", "700024", "700025", "700026", "700027", "700028", "700029", "700030", "700031", "700032", "700033", "700034", "700035", "700036", "700037", "700038", "700039", "700040", "700041", "700042", "700043", "700044", "700045", "700046", "700047", "700048", "700049", "700050", "700051", "700052", "700053", "700054", "700055", "700056", "700057", "700058", "700059", "700060", "700061", "700062", "700063", "700064", "700065", "700066", "700067", "700068", "700069", "700070", "700071", "700072", "700073", "700074", "700075", "700076", "700077", "700078", "700079", "700080", "700081", "700082", "700083", "700084", "700085", "700086", "700087", "700088", "700089", "700090", "700091", "700092", "700093", "700094", "700095", "700096", "700097", "700098", "700099", "700100"],
  "Jaipur": ["302001", "302002", "302003", "302004", "302005", "302006", "302007", "302008", "302009", "302010", "302011", "302012", "302013", "302014", "302015", "302016", "302017", "302018", "302019", "302020", "302021", "302022", "302023", "302024", "302025", "302026", "302027", "302028", "302029", "302030", "302031", "302032", "302033", "302034", "302035", "302036", "302037", "302038", "302039", "302040", "302041", "302042", "302043", "302044", "302045", "302046", "302047", "302048", "302049", "302050"],
  "Goa": ["403001", "403002", "403003", "403004", "403005", "403006", "403007", "403008", "403009", "403010", "403011", "403012", "403013", "403014", "403015", "403016", "403017", "403018", "403019", "403020", "403021", "403022", "403023", "403024", "403025", "403026", "403027", "403028", "403029", "403030", "403031", "403032", "403033", "403034", "403035", "403036", "403037", "403038", "403039", "403040", "403041", "403042", "403043", "403044", "403045", "403046", "403047", "403048", "403049", "403050"],
  "Chandigarh": ["160001", "160002", "160003", "160004", "160005", "160006", "160007", "160008", "160009", "160010", "160011", "160012", "160013", "160014", "160015", "160016", "160017", "160018", "160019", "160020", "160021", "160022", "160023", "160024", "160025", "160026", "160027", "160028", "160029", "160030", "160031", "160032", "160033", "160034", "160035", "160036", "160037", "160038", "160039", "160040", "160041", "160042", "160043", "160044", "160045", "160046", "160047", "160048", "160049", "160050"],
  "Lucknow": ["226001", "226002", "226003", "226004", "226005", "226006", "226007", "226008", "226009", "226010", "226011", "226012", "226013", "226014", "226015", "226016", "226017", "226018", "226019", "226020", "226021", "226022", "226023", "226024", "226025", "226026", "226027", "226028", "226029", "226030", "226031", "226032", "226033", "226034", "226035", "226036", "226037", "226038", "226039", "226040", "226041", "226042", "226043", "226044", "226045", "226046", "226047", "226048", "226049", "226050"],
  "Ahmedabad": ["380001", "380002", "380003", "380004", "380005", "380006", "380007", "380008", "380009", "380010", "380011", "380012", "380013", "380014", "380015", "380016", "380017", "380018", "380019", "380020", "380021", "380022", "380023", "380024", "380025", "380026", "380027", "380028", "380029", "380030", "380031", "380032", "380033", "380034", "380035", "380036", "380037", "380038", "380039", "380040", "380041", "380042", "380043", "380044", "380045", "380046", "380047", "380048", "380049", "380050", "380051", "380052", "380053", "380054", "380055", "380056", "380057", "380058", "380059", "380060", "380061", "380062", "380063", "380064", "380065", "380066", "380067", "380068", "380069", "380070", "380071", "380072", "380073", "380074", "380075", "380076", "380077", "380078", "380079", "380080"],
  "Indore": ["452001", "452002", "452003", "452004", "452005", "452006", "452007", "452008", "452009", "452010", "452011", "452012", "452013", "452014", "452015", "452016", "452017", "452018", "452019", "452020", "452021", "452022", "452023", "452024", "452025", "452026", "452027", "452028", "452029", "452030", "452031", "452032", "452033", "452034", "452035", "452036", "452037", "452038", "452039", "452040", "452041", "452042", "452043", "452044", "452045", "452046", "452047", "452048", "452049", "452050"]
};

// City rows
const citiesRow1 = ["Delhi", "Mumbai", "Bengaluru", "Pune"];
const citiesRow2 = ["Hyderabad", "Kolkata", "Jaipur", "Goa"];
const citiesRow3 = ["Chandigarh", "Lucknow", "Ahmedabad", "Indore"];

const CityCard = ({ city, index, direction, isActive }) => {
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
        isActive ? 'animate-pulse' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 ${
        isActive ? 'opacity-60' : ''
      }`} />
      
      {/* Main card */}
      <div className={`relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl p-4 flex items-center justify-center space-x-3 hover:border-cyan-400/50 transition-all duration-300 ${
        isActive ? 'border-cyan-400/80 bg-cyan-900/20' : ''
      }`}>
        {/* Animated icon */}
        <div
          className={`transition-all duration-300 ${
            isActive ? 'animate-spin' : ''
          }`}
        >
          <MapPin className={`w-5 h-5 transition-colors duration-300 ${
            isActive ? 'text-cyan-300' : 'text-cyan-400'
          }`} />
        </div>
        
        <span className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
          isActive ? 'text-cyan-200' : 'text-white'
        }`}>
          {city}
        </span>
        
        {/* Sparkle effect */}
        <div className="absolute top-1 right-1">
          <Sparkles className={`w-3 h-3 opacity-70 transition-all duration-300 ${
            isActive ? 'text-cyan-300 animate-spin' : 'text-yellow-400'
          }`} />
        </div>
      </div>
    </div>
  );
};

const CityRow = ({ cities, direction, rowIndex, activeCities }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    {cities.map((city, index) => (
      <CityCard 
        key={index} 
        city={city} 
        index={index} 
        direction={direction}
        isActive={activeCities.includes(city)}
      />
    ))}
  </div>
);

function ServiceAreas() {
  const [pincode, setPincode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [activeCities, setActiveCities] = useState([]);
  const [error, setError] = useState('');

  // Booking URL - Replace with your actual booking page URL
  const BOOKING_URL = '/booking'; // Change this to your actual booking page URL
  
  const handleBookNow = () => {
    // You can also pass the pincode and city as URL parameters
    const bookingURL = `${BOOKING_URL}?pincode=${checkResult?.pincode}&city=${checkResult?.city}`;
    
    // Open in same tab
    window.location.href = bookingURL;
    
    // Or open in new tab (uncomment if preferred)
    // window.open(bookingURL, '_blank');
  };

  const checkPincode = async () => {
    if (!pincode.trim()) {
      setError('Please enter a pincode');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setIsChecking(true);
    setError('');
    setCheckResult(null);
    setActiveCities([]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const enteredPincode = pincode.trim();
    let foundCity = null;

    // Check if pincode exists in any city
    for (const [city, pincodes] of Object.entries(cityData)) {
      if (pincodes.includes(enteredPincode)) {
        foundCity = city;
        break;
      }
    }

    if (foundCity) {
      setCheckResult({
        available: true,
        city: foundCity,
        pincode: enteredPincode
      });
      setActiveCities([foundCity]);
    } else {
      setCheckResult({
        available: false,
        pincode: enteredPincode
      });
    }

    setIsChecking(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    setError('');
    if (checkResult) {
      setCheckResult(null);
      setActiveCities([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPincode();
    }
  };

  const resetCheck = () => {
    setPincode('');
    setCheckResult(null);
    setActiveCities([]);
    setError('');
  };

  return (
    <section className="mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated Title */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          <span className="inline-block animate-pulse">
            We Deliver Across INDIA 🇮🇳
          </span>
        </h2>

        <p className="text-gray-300 mb-12 max-w-xl mx-auto text-lg animate-fade-in">
          LuggageFree is available in the following cities with{" "}
          <span className="text-cyan-400 font-semibold">lightning-fast</span> delivery:
        </p>

        {/* City rows */}
        <div className="space-y-10 mb-16">
          <div className="animate-slide-in-left">
            <CityRow cities={citiesRow1} direction="left" rowIndex={0} activeCities={activeCities} />
          </div>
          
          <div className="animate-slide-in-right">
            <CityRow cities={citiesRow2} direction="right" rowIndex={1} activeCities={activeCities} />
          </div>
          
          <div className="animate-slide-in-left">
            <CityRow cities={citiesRow3} direction="left" rowIndex={2} activeCities={activeCities} />
          </div>
        </div>

        {/* Enhanced pincode input */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative mb-6">
          <div className="relative">
            <input
              type="text"
              value={pincode}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your 6-digit pincode"
              className={`px-6 py-3 bg-gray-800/50 border rounded-xl w-full sm:w-[320px] focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm ${
                error ? 'border-red-500/50 focus:ring-red-500' : 'border-gray-600/50 focus:ring-cyan-500'
              }`}
              disabled={isChecking}
            />
            <div className={`absolute inset-0 border rounded-xl pointer-events-none transition-all duration-300 ${
              error ? 'border-red-500/30' : 'border-cyan-500/30'
            } ${isChecking ? 'animate-pulse' : ''}`} />
          </div>
          
          <button
            onClick={checkPincode}
            disabled={isChecking}
            className={`bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg relative overflow-hidden transition-all duration-300 hover:from-cyan-600 hover:to-purple-700 hover:scale-105 hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              isChecking ? 'cursor-not-allowed' : ''
            }`}
          >
            {isChecking ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Checking...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer" />
                Check Coverage
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-400 mb-4 animate-shake">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Check result */}
        {checkResult && (
          <div className={`max-w-md mx-auto p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 animate-fade-in-up ${
            checkResult.available 
              ? 'bg-green-900/20 border-green-500/30' 
              : 'bg-red-900/20 border-red-500/30'
          }`}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              {checkResult.available ? (
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400 animate-bounce" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400 animate-pulse" />
                </div>
              )}
            </div>
            
            {checkResult.available ? (
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-400 mb-2">🎉 Great News!</h3>
                <p className="text-gray-300 mb-2">
                  We deliver to <span className="text-green-400 font-semibold">{checkResult.city}</span>
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Pincode: <span className="text-green-400">{checkResult.pincode}</span>
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={resetCheck}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Check Another
                  </button>
                  <button 
                    onClick={handleBookNow}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-bold text-red-400 mb-2">Sorry! 😔</h3>
                <p className="text-gray-300 mb-2">
                  We don't deliver to pincode <span className="text-red-400 font-semibold">{checkResult.pincode}</span> yet
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  But we're expanding rapidly! Check back soon.
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={resetCheck}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Try Again
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                    Notify Me
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-gray-400 mt-8 animate-pulse">
          <span className="text-green-400">More cities launching soon! 🚀</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default ServiceAreas;