
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('1Y');
  const [showAllPages, setShowAllPages] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});

  // Stat Cards Data
  const statsData = [
    {
      title: "Total Orders",
      value: 13647,
      displayValue: "13,647",
      change: "+3.3%",
      period: "Last Week",
      positive: true,
      icon: "📦",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    {
      title: "New Leads",
      value: 9526,
      displayValue: "9,526",
      change: "+6.1%",
      period: "Last Month",
      positive: true,
      icon: "👥",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      title: "Deals",
      value: 976,
      displayValue: "976",
      change: "-0.3%",
      period: "Last Month",
      positive: false,
      icon: "🤝",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100"
    },
    {
      title: "Booked Revenue",
      value: 123600,
      displayValue: "$123.6k",
      change: "-10.6%",
      period: "Last Month",
      positive: false,
      icon: "💰",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    }
  ];

  // Performance data for different time periods
  const performanceDataSets = {
    'All': [65, 45, 78, 52, 89, 67, 73, 85, 92, 68, 75, 88],
    '1M': [78, 65, 82, 90, 75, 88, 92],
    '6M': [45, 67, 78, 85, 92, 88],
    '1Y': [65, 45, 78, 52, 89, 67, 73, 85, 92, 68, 75, 88]
  };

  // Extended Top Pages Data
  const allPagesData = [
    { path: "/admin/ecommerce.html", views: "4865", exitRate: "4.8%", rateColor: "text-green-600" },
    { path: "/admin/dashboard.html", views: "4266", exitRate: "35.6%", rateColor: "text-red-500" },
    { path: "/admin/chat.html", views: "3254", exitRate: "2.5%", rateColor: "text-green-600" },
    { path: "/admin/auth-login.html", views: "3180", exitRate: "5.4%", rateColor: "text-green-600" },
    { path: "/admin/email.html", views: "1456", exitRate: "8.7%", rateColor: "text-yellow-500" },
    { path: "/admin/social.html", views: "1023", exitRate: "1.9%", rateColor: "text-green-600" },
    { path: "/admin/blog.html", views: "478", exitRate: "4.2%", rateColor: "text-green-600" },
    { path: "/admin/calendar.html", views: "387", exitRate: "6.8%", rateColor: "text-yellow-500" },
    { path: "/admin/profile.html", views: "245", exitRate: "12.3%", rateColor: "text-red-500" },
    { path: "/admin/settings.html", views: "198", exitRate: "3.1%", rateColor: "text-green-600" }
  ];

  // Extended Recent Orders Data
  const allOrdersData = [
    { id: "#3210", customer: "Montana Singh", amount: "$100.00", status: "Paid", avatar: "M", date: "2 min ago" },
    { id: "#3209", customer: "Ora Johnson", amount: "$85.00", status: "Pending", avatar: "O", date: "15 min ago" },
    { id: "#3208", customer: "Thor Williams", amount: "$120.00", status: "Paid", avatar: "T", date: "1 hour ago" },
    { id: "#3207", customer: "Beck Davis", amount: "$95.00", status: "Cancelled", avatar: "B", date: "2 hours ago" },
    { id: "#3206", customer: "Alex Kumar", amount: "$150.00", status: "Paid", avatar: "A", date: "3 hours ago" },
    { id: "#3205", customer: "Sam Patel", amount: "$75.00", status: "Processing", avatar: "S", date: "4 hours ago" },
    { id: "#3204", customer: "Riley Chen", amount: "$200.00", status: "Paid", avatar: "R", date: "5 hours ago" },
    { id: "#3203", customer: "Jordan Lee", amount: "$45.00", status: "Pending", avatar: "J", date: "6 hours ago" }
  ];

  // Country Sessions Data with more details
  const countryData = [
    { country: "Canada", sessions: 23500, flag: "🇨🇦", change: "+5.2%" },
    { country: "United States", sessions: 41050, flag: "🇺🇸", change: "+12.8%" },
    { country: "Russia", sessions: 18750, flag: "🇷🇺", change: "-2.1%" },
    { country: "Brazil", sessions: 15200, flag: "🇧🇷", change: "+8.4%" },
    { country: "China", sessions: 28900, flag: "🇨🇳", change: "+15.6%" }
  ];

  // Animated counter function
  const animateValue = (start, end, duration, key) => {
    const startTimestamp = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      
      setAnimatedStats(prev => ({ ...prev, [key]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // Initialize animations on component mount
  useEffect(() => {
    statsData.forEach((stat, index) => {
      setTimeout(() => {
        animateValue(0, stat.value, 2000, stat.title);
      }, index * 300);
    });
  }, []);

  const formatAnimatedValue = (value, originalStat) => {
    if (!value) return "0";
    
    if (originalStat.title === "Booked Revenue") {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    
    if (value >= 1000) {
      return `${Math.floor(value / 1000)},${(value % 1000).toString().padStart(3, '0')}`;
    }
    
    return value.toString();
  };

  const StatCard = ({ title, value, displayValue, change, period, positive, icon, bgColor, iconBg }, index) => (
    <div 
      className={`${bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1`}
      style={{ 
        animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {animatedStats[title] ? formatAnimatedValue(animatedStats[title], { title, value }) : "0"}
          </p>
          <div className="flex items-center space-x-2 flex-wrap">
            <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-500'} flex items-center`}>
              <span className="mr-1">{positive ? '↗️' : '↘️'}</span>
              {change}
            </span>
            <span className="text-gray-500 text-sm">{period}</span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline">
              View More
            </button>
          </div>
        </div>
        <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ConversionChart = () => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        animateValue(0, 65.2, 2000, 'conversion');
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (animatedStats['conversion']) {
        setAnimatedPercentage(animatedStats['conversion']);
      }
    }, [animatedStats]);

    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversions</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#f97316"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(animatedPercentage || 0) * 2.51} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-900">
                {animatedPercentage ? `${animatedPercentage.toFixed(1)}%` : "0%"}
              </span>
              <span className="text-sm text-gray-500 text-center">Returning Customer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <p className="text-sm text-gray-500 mb-1">This Week</p>
            <p className="text-xl font-bold text-gray-900">23.5k</p>
          </div>
          <div className="hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <p className="text-sm text-gray-500 mb-1">Last Week</p>
            <p className="text-xl font-bold text-gray-900">41.05k</p>
          </div>
        </div>
        
        <button 
          onClick={() => alert('Conversion details would open here!')}
          className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
        >
          View Details
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
              <span className="text-orange-600 text-sm">⚠</span>
            </div>
            <div className="flex-1">
              <p className="text-orange-800 text-sm">
                We regret to inform you that our server is currently experiencing technical difficulties.
              </p>
            </div>
            <button 
              onClick={(e) => e.target.closest('.bg-orange-50').style.display = 'none'}
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
              <div className="flex space-x-2">
                {['All', '1M', '6M', '1Y'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-300 transform hover:scale-105 ${
                      timeFilter === filter
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Animated Chart */}
            <div className="h-64 flex items-end justify-between space-x-2 mb-4">
              {performanceDataSets[timeFilter].map((height, index) => (
                <div key={`${timeFilter}-${index}`} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-all duration-500 cursor-pointer transform hover:scale-105"
                    style={{ 
                      height: `${height}%`,
                      animation: `growUp 0.8s ease-out ${index * 0.1}s both`
                    }}
                    title={`Period ${index + 1}: ${height}%`}
                    onClick={() => alert(`Detailed data for period ${index + 1}: ${height}%`)}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 hover:scale-110 transition-transform cursor-pointer">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Page Views</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-110 transition-transform cursor-pointer">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Clicks</span>
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Top Pages</h3>
              <button 
                onClick={() => setShowAllPages(!showAllPages)}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors hover:underline"
              >
                {showAllPages ? 'Show Less' : 'View All'}
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-4 pb-2 text-sm font-medium text-gray-500 border-b">
                <span>Page Path</span>
                <span className="text-center">Page Views</span>
                <span className="text-center">Exit Rate</span>
              </div>
              
              {(showAllPages ? allPagesData : allPagesData.slice(0, 7)).map((page, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-3 gap-4 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => alert(`Opening details for: ${page.path}`)}
                  style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <span className="text-sm text-gray-800 truncate" title={page.path}>
                    {page.path}
                  </span>
                  <span className="text-sm text-gray-900 text-center font-medium">
                    {page.views}
                  </span>
                  <span className={`text-sm text-center font-medium ${page.rateColor}`}>
                    {page.exitRate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversions Chart */}
          <ConversionChart />

          {/* Sessions by Country */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Sessions by Country</h3>
            
            {/* World Map Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-32 mb-6 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <span className="text-gray-700 text-lg">🗺️ Interactive World Map</span>
            </div>
            
            <div className="space-y-3 mb-4">
              {countryData.slice(0, 3).map((country, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  onClick={() => alert(`Country details for ${country.country}: ${country.sessions.toLocaleString()} sessions`)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-800">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {(country.sessions / 1000).toFixed(1)}k
                    </span>
                    <span className={`text-xs ml-2 ${country.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {country.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
              <div className="hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <p className="text-sm text-gray-500 mb-1">This Week</p>
                <p className="text-xl font-bold text-gray-900">23.5k</p>
              </div>
              <div className="hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <p className="text-sm text-gray-500 mb-1">Last Week</p>
                <p className="text-xl font-bold text-gray-900">41.05k</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              <button 
                onClick={() => alert('Create new order functionality would open here!')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-all duration-300 hover:underline hover:scale-105"
              >
                Create order
              </button>
            </div>
            
            <div className="space-y-3">
              {(showAllOrders ? allOrdersData : allOrdersData.slice(0, 4)).map((order, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg -mx-3 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  onClick={() => alert(`Order details: ${order.id} - ${order.customer}`)}
                  style={{ animation: `slideInRight 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-sm font-medium hover:scale-110 transition-transform">
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.id} • {order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 hover:scale-110 ${
                      order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {allOrdersData.length > 4 && (
              <button 
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {showAllOrders ? 'Show Less Orders' : `Show ${allOrdersData.length - 4} More Orders`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes growUp {
          from {
            height: 0%;
          }
          to {
            height: var(--final-height);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}