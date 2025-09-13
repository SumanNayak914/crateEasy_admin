import { useState, useRef, useEffect } from "react";
import { Search, Filter, UserPlus, MoreVertical, Edit, Eye, Trash2, Ban, CheckCircle, XCircle, X, Save, Mail, Calendar, User } from "lucide-react";

const dummyCustomers = [
  { id: 1, name: "Amit Sharma", email: "amit@example.com", joined: "2025-08-01", status: "Active", avatar: "AS", phone: "+91 9876543210" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", joined: "2025-08-10", status: "Inactive", avatar: "PS", phone: "+91 9876543211" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", joined: "2025-08-20", status: "Active", avatar: "RV", phone: "+91 9876543212" },
  { id: 4, name: "Neha Gupta", email: "neha@example.com", joined: "2025-07-15", status: "Blocked", avatar: "NG", phone: "+91 9876543213" },
  { id: 5, name: "Vikram Kumar", email: "vikram@example.com", joined: "2025-09-01", status: "Active", avatar: "VK", phone: "+91 9876543214" },
  { id: 6, name: "Anita Rao", email: "anita@example.com", joined: "2025-07-30", status: "Inactive", avatar: "AR", phone: "+91 9876543215" },
];

export default function Customers() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(dummyCustomers);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active"
  });
  const [notification, setNotification] = useState("");
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter customers based on search and status
  useEffect(() => {
    let filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const generateAvatar = (name) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const toggleMenu = (event, id) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const updateCustomerStatus = (id, newStatus) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? { ...customer, status: newStatus } : customer
      )
    );
    setOpenMenuId(null);
    showNotification(`Customer status updated to ${newStatus}`);
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    setShowDeleteModal(false);
    setCustomerToDelete(null);
    showNotification("Customer deleted successfully");
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
    setOpenMenuId(null);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });
    setShowEditForm(true);
    setOpenMenuId(null);
  };

  const handleAddCustomer = () => {
    setShowAddForm(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "Active"
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      showNotification("Name and email are required!");
      return;
    }

    if (showEditForm) {
      // Edit existing customer
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === selectedCustomer.id
            ? {
                ...customer,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                avatar: generateAvatar(formData.name)
              }
            : customer
        )
      );
      setShowEditForm(false);
      showNotification("Customer updated successfully!");
    } else {
      // Add new customer
      const newCustomer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        joined: new Date().toISOString().split('T')[0],
        avatar: generateAvatar(formData.name)
      };
      setCustomers(prev => [...prev, newCustomer]);
      setShowAddForm(false);
      showNotification("Customer added successfully!");
    }
    
    setSelectedCustomer(null);
  };

  const closeAllModals = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedCustomer(null);
    setCustomerToDelete(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active": return <CheckCircle className="w-4 h-4" />;
      case "Inactive": return <XCircle className="w-4 h-4" />;
      case "Blocked": return <Ban className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "Inactive": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Blocked": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
          <p className="text-gray-600">Manage your customers and track their status</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {/* Add Customer Button */}
              <button 
                onClick={handleAddCustomer}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
              >
                <UserPlus className="w-5 h-5" />
                Add Customer
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {customer.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: #{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{customer.email}</td>
                    <td className="px-6 py-4 text-gray-700">{customer.phone}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(customer.joined).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(customer.status)}`}>
                        {getStatusIcon(customer.status)}
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative" ref={openMenuId === customer.id ? menuRef : null}>
                        <button
                          onClick={(e) => toggleMenu(e, customer.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        
                        {openMenuId === customer.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            <div className="py-2">
                              <button 
                                onClick={() => handleViewDetails(customer)}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-500" />
                                View Details
                              </button>
                              <button 
                                onClick={() => handleEditClick(customer)}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-500" />
                                Edit Customer
                              </button>
                              <hr className="my-1 border-gray-100" />
                              
                              {customer.status !== "Active" && (
                                <button
                                  onClick={() => updateCustomerStatus(customer.id, "Active")}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Mark Active
                                </button>
                              )}
                              
                              {customer.status !== "Inactive" && (
                                <button
                                  onClick={() => updateCustomerStatus(customer.id, "Inactive")}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-yellow-700"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Mark Inactive
                                </button>
                              )}
                              
                              {customer.status !== "Blocked" && (
                                <button
                                  onClick={() => updateCustomerStatus(customer.id, "Blocked")}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-700"
                                >
                                  <Ban className="w-4 h-4" />
                                  Block Customer
                                </button>
                              )}
                              
                              <hr className="my-1 border-gray-100" />
                              <button
                                onClick={() => handleDeleteClick(customer)}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Customer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No customers found</div>
              <div className="text-gray-500">Try adjusting your search or filters</div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
            <div className="text-gray-600">Total Customers</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {customers.filter(c => c.status === "Active").length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {customers.filter(c => c.status === "Inactive").length}
            </div>
            <div className="text-gray-600">Inactive</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="text-2xl font-bold text-red-600">
              {customers.filter(c => c.status === "Blocked").length}
            </div>
            <div className="text-gray-600">Blocked</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Customer Form Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {showEditForm ? "Edit Customer" : "Add New Customer"}
              </h3>
              <button
                onClick={closeAllModals}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {showEditForm ? "Update" : "Add"} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Customer Details</h3>
              <button
                onClick={closeAllModals}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {selectedCustomer.avatar}
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h4>
              <p className="text-gray-600">Customer ID: #{selectedCustomer.id}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{selectedCustomer.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 text-gray-500">📱</div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{selectedCustomer.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Joined Date</div>
                  <div className="font-medium">
                    {new Date(selectedCustomer.joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon(selectedCustomer.status)}
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  handleEditClick(selectedCustomer);
                  setShowViewModal(false);
                }}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Customer
              </button>
              <button
                onClick={closeAllModals}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && customerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Customer</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{customerToDelete.name}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCustomer(customerToDelete.id)}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}