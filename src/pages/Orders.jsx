
import { useState } from "react";
import { Eye, X, Package, Clock, CheckCircle, Search, Filter, Download } from "lucide-react";

const dummyOrders = [
  { id: 101, customer: "Amit Sharma", amount: 2499, date: "2025-09-01", status: "Pending", email: "amit@example.com", items: 3 },
  { id: 102, customer: "Priya Singh", amount: 1599, date: "2025-09-02", status: "Shipped", email: "priya@example.com", items: 2 },
  { id: 103, customer: "Rahul Verma", amount: 3999, date: "2025-09-03", status: "Delivered", email: "rahul@example.com", items: 1 },
  { id: 104, customer: "Sneha Patel", amount: 899, date: "2025-09-04", status: "Pending", email: "sneha@example.com", items: 4 },
  { id: 105, customer: "Vikash Kumar", amount: 5299, date: "2025-09-05", status: "Shipped", email: "vikash@example.com", items: 2 },
];

export default function Orders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "Cancelled" }
        : order
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Shipped": return <Package className="w-4 h-4" />;
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <X className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white";
      case "Shipped": return "bg-gradient-to-r from-blue-400 to-indigo-400 text-white";
      case "Delivered": return "bg-gradient-to-r from-green-400 to-emerald-400 text-white";
      case "Cancelled": return "bg-gradient-to-r from-red-400 to-pink-400 text-white";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">Manage and track all your orders in one place</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 backdrop-blur-sm bg-white/80">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders or customers..."
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 w-72"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Export Button */}
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Orders", value: orders.length, color: "from-blue-500 to-cyan-400", icon: "📦" },
            { title: "Pending", value: orders.filter(o => o.status === "Pending").length, color: "from-yellow-500 to-orange-400", icon: "⏳" },
            { title: "Shipped", value: orders.filter(o => o.status === "Shipped").length, color: "from-indigo-500 to-blue-400", icon: "🚚" },
            { title: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "from-green-500 to-emerald-400", icon: "✅" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-90">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-indigo-600">#{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                          {order.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-lg text-gray-900">₹{order.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{order.items} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(order.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          View
                        </button>
                        {order.status !== "Cancelled" && order.status !== "Delivered" && (
                          <button 
                            onClick={() => handleCancelOrder(order.id)}
                            className="group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                          >
                            <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>

        {/* Modal with Blur Background */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0  bg-white/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Order Details</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-black hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Order ID</label>
                    <div className="font-bold text-lg text-indigo-600">#{selectedOrder.id}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</label>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Customer</label>
                  <div className="font-semibold text-gray-900">{selectedOrder.customer}</div>
                  <div className="text-gray-600">{selectedOrder.email}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Amount</label>
                    <div className="font-bold text-xl text-green-600">₹{selectedOrder.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Items</label>
                    <div className="font-semibold text-gray-900">{selectedOrder.items} items</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Order Date</label>
                  <div className="text-gray-900">{new Date(selectedOrder.date).toLocaleDateString('en-IN', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}