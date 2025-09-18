import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Edit, Trash2, X, Plus } from "lucide-react";



export default function CustomerTable() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Amit Sharma", email: "amit@example.com", phone: "+91 9999999999", joined: "1/8/2025", status: "Active", avatar: "AS", location: "Delhi" },
    { id: 2, name: "Rohit Verma", email: "rohit@example.com", phone: "+91 8888888888", joined: "5/8/2025", status: "Inactive", avatar: "RV", location: "Mumbai" },
    { id: 3, name: "Priya Singh", email: "priya@example.com", phone: "+91 7777777777", joined: "15/7/2025", status: "Active", avatar: "PS", location: "Bangalore" },
    { id: 4, name: "Vikram Kumar", email: "vikram@example.com", phone: "+91 6666666666", joined: "20/7/2025", status: "Blocked", avatar: "VK", location: "Chennai" },
    { id: 5, name: "Sneha Gupta", email: "sneha@example.com", phone: "+91 5555555555", joined: "10/8/2025", status: "Active", avatar: "SG", location: "Pune" },
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
    setOpenMenuId(null);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location
    });
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleEditSubmit = () => {
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id 
        ? { ...c, ...editForm }
        : c
    ));
    setShowEditModal(false);
    setSelectedCustomer(null);
    setEditForm({});
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    if (selectedCustomers.length > 0) {
      // Multiple customers selected - delete all selected
      setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
      setSelectedCustomers([]);
    } else if (selectedCustomer) {
      // Single customer - delete the selected one
      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
    }
    setShowDeleteModal(false);
    setSelectedCustomer(null);
  };

  const handleAddCustomer = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = () => {
    if (!addForm.name || !addForm.email || !addForm.phone || !addForm.location) {
      alert('Please fill all fields');
      return;
    }

    // Generate avatar from name
    const nameWords = addForm.name.trim().split(' ');
    const avatar = nameWords.length > 1 
      ? nameWords[0][0].toUpperCase() + nameWords[1][0].toUpperCase()
      : nameWords[0][0].toUpperCase() + nameWords[0][1]?.toUpperCase() || '';

    // Generate new ID
    const newId = Math.max(...customers.map(c => c.id)) + 1;
    
    // Current date
    const currentDate = new Date().toLocaleDateString('en-GB');
    
    const newCustomer = {
      id: newId,
      name: addForm.name,
      email: addForm.email,
      phone: addForm.phone,
      location: addForm.location,
      avatar: avatar,
      joined: currentDate,
      status: 'Active'
    };

    setCustomers([...customers, newCustomer]);
    setAddForm({
      name: '',
      email: '',
      phone: '',
      location: ''
    });
    setShowAddModal(false);
  };

  const updateStatus = (id, status) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, status } : c)));
    setOpenMenuId(null);
  };

  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    const allCustomerIds = customers.map(c => c.id);
    setSelectedCustomers(
      selectedCustomers.length === customers.length ? [] : allCustomerIds
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-yellow-100 text-yellow-700";
      case "Blocked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-yellow-500";
      case "Blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header with Add Button */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
              <button
                onClick={handleAddCustomer}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus size={16} />
                Add Customer
              </button>
            </div>
          </div>
          {/* Top Actions Bar */}
          {selectedCustomers.length > 0 && (
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">
                  {selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      selectedCustomers.forEach(id => updateStatus(id, "Active"));
                      setSelectedCustomers([]);
                    }}
                    disabled={selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Active")}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Set Active {selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Active") && "(Not Clickable)"}
                  </button>
                  <button 
                    onClick={() => {
                      selectedCustomers.forEach(id => updateStatus(id, "Inactive"));
                      setSelectedCustomers([]);
                    }}
                    disabled={selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Inactive")}
                    className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Set Inactive {selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Inactive") && "(Not Clickable)"}
                  </button>
                  <button 
                    onClick={() => {
                      selectedCustomers.forEach(id => updateStatus(id, "Blocked"));
                      setSelectedCustomers([]);
                    }}
                    disabled={selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Blocked")}
                    className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Block {selectedCustomers.every(id => customers.find(c => c.id === id)?.status === "Blocked") && "(Not Clickable)"}
                  </button>
                  <button 
                    onClick={() => {
                      const customersToDelete = customers.filter(c => selectedCustomers.includes(c.id));
                      setSelectedCustomer(customersToDelete[0]); // Set first customer for modal display
                      setShowDeleteModal(true);
                    }}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => setSelectedCustomers([])}
                    className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === customers.length && customers.length > 0}
                    onChange={selectAllCustomers}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-blue-600">Customer</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Contact Info</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Joined Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleCustomerSelection(customer.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {customer.avatar}
                        </div>
                        {customer.status === "Active" && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {customer.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-sm">✉</span>
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-sm">📞</span>
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-sm">📅</span>
                      <span className="text-sm">{customer.joined}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status)}`}>
                      <span className={`w-2 h-2 ${getStatusDot(customer.status)} rounded-full mr-2`}></span>
                      {customer.status}
                    </span>
                  </td>

                  <td className="p-4 relative">
                    <button
                      onClick={() => toggleMenu(customer.id)}
                      className="p-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>

                    {openMenuId === customer.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleView(customer)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            <Eye size={16} className="text-blue-500" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEdit(customer)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            <Edit size={16} className="text-blue-500" />
                            Edit Customer
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          
                          <button
                            onClick={() => handleDelete(customer)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
                          >
                            <Trash2 size={16} />
                            Delete Customer
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing 1 to 5 of {customers.length} customers
              </p>
              
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Customer</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({...addForm, email: e.target.value})}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({...addForm, phone: e.target.value})}
                  placeholder="+91 9999999999"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  value={addForm.location}
                  onChange={(e) => setAddForm({...addForm, location: e.target.value})}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-xs text-gray-500">
                * Customer will be added with Active status and today's date
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddForm({
                    name: '',
                    email: '',
                    phone: '',
                    location: ''
                  });
                }}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubmit}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals - Moved outside table structure */}
      
      {/* View Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-xl">
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{selectedCustomer.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                    <span className={`w-1.5 h-1.5 ${getStatusDot(selectedCustomer.status)} rounded-full mr-1`}></span>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📧</span>
                  <span className="text-sm text-gray-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📱</span>
                  <span className="text-sm text-gray-700">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-sm text-gray-700">{selectedCustomer.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📅</span>
                  <span className="text-sm text-gray-700">Joined: {selectedCustomer.joined}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Customer</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location || ''}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Customer</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              {selectedCustomers.length > 0 ? (
                <>Are you sure you want to delete <strong>{selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''}</strong>? 
                All customer data will be permanently removed.</>
              ) : (
                <>Are you sure you want to delete <strong>{selectedCustomer?.name}</strong>? 
                All customer data will be permanently removed.</>
              )}
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}