import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar } from "lucide-react";

const salesData = [
  { month: "Jan", revenue: 12000, orders: 120, customers: 80 },
  { month: "Feb", revenue: 15000, orders: 145, customers: 95 },
  { month: "Mar", revenue: 18000, orders: 180, customers: 110 },
  { month: "Apr", revenue: 10000, orders: 95, customers: 70 },
  { month: "May", revenue: 22000, orders: 220, customers: 140 },
  { month: "Jun", revenue: 25000, orders: 250, customers: 160 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#8b5cf6" },
  { name: "Clothing", value: 28, color: "#06b6d4" },
  { name: "Books", value: 20, color: "#10b981" },
  { name: "Home & Garden", value: 17, color: "#f59e0b" },
];

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
      <div className="bg-blue-100 p-3 rounded-full">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
    </div>
  </div>
);

export default function Reports() {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Reports</h1>
          <p className="text-gray-600">Comprehensive overview of your business performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Customers"
            value={totalCustomers.toLocaleString()}
            change="+15.3%"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Avg Order Value"
            value={`₹${Math.round(totalRevenue / totalOrders)}`}
            change="-2.1%"
            icon={Calendar}
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Monthly Revenue Trend</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full font-medium">6M</button>
                <button className="px-3 py-1 text-sm text-gray-500 rounded-full">1Y</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: 'white' 
                  }} 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#colorRevenue)" 
                  radius={[8, 8, 0, 0]} 
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Orders & Customers Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: 'white' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Orders"
                />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  name="Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Sales Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Sales Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 rounded-tl-lg">Month</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Revenue</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Orders</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 rounded-tr-lg">AOV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {salesData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.month}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 font-semibold text-green-600">
                        ₹{row.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.orders}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 font-medium">
                        ₹{Math.round(row.revenue / row.orders).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total Period Performance</span>
                <div className="flex space-x-6">
                  <span className="text-green-600 font-semibold">₹{totalRevenue.toLocaleString()}</span>
                  <span className="text-blue-600 font-semibold">{totalOrders} orders</span>
                  <span className="text-purple-600 font-semibold">₹{Math.round(totalRevenue / totalOrders)} AOV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}