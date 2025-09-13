import { useState } from "react";
import { FiBell, FiMenu, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dummyNotifications = [
    "New order #101 received",
    "Product 'T-Shirt' stock low",
    "Customer 'Priya' sent a message",
  ];

  // Profile image state
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/50");
  const [newImage, setNewImage] = useState(null);

  // Functions
  const handleReplace = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    if (newImage) setProfileImage(newImage);
    setNewImage(null);
    setModalOpen(false);
  };

  const handleDelete = () => {
    setProfileImage("https://i.pravatar.cc/50");
    setNewImage(null);
    setModalOpen(false);
  };

  return (
    <header className="bg-white shadow-xl px-6 py-4 flex items-center justify-between h-20 relative">
      {/* Left: Logo / Title */}
      <div className="flex items-center space-x-3">
        <FiMenu
          size={28}
          className="text-gray-700 cursor-pointer md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        />
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      {/* Center: Search bar (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-72 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
        />
      </div>

      {/* Right: Notifications + Profile + Logout */}
      <div className="flex items-center space-x-5">
        {/* Notifications */}
        <div className="relative">
          <FiBell
            size={28}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {dummyNotifications.length}
          </span>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
              <div className="p-4 border-b font-semibold">Notifications</div>
              <ul>
                {dummyNotifications.map((n, i) => (
                  <li key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile photo */}
        <div className="relative">
          <img
            src={profileImage}
            alt="Admin"
            className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-yellow-400 cursor-pointer"
            onClick={() => setModalOpen(true)}
          />
        </div>

        {/* Logout */}
        <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg hover:bg-yellow-500 font-semibold">
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 md:hidden z-40">
          <ul className="space-y-2 font-medium">
            <li className="hover:text-yellow-500 cursor-pointer">Dashboard</li>
            <li className="hover:text-yellow-500 cursor-pointer">Products</li>
            <li className="hover:text-yellow-500 cursor-pointer">Orders</li>
            <li className="hover:text-yellow-500 cursor-pointer">Customers</li>
            <li className="hover:text-yellow-500 cursor-pointer">Reports</li>
            <li className="hover:text-yellow-500 cursor-pointer">Settings</li>
          </ul>
        </div>
      )}

      {/* Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <h2 className="font-semibold text-lg mb-4">Profile Photo</h2>

            <div className="flex flex-col items-center space-y-4">
              <img
                src={newImage || profileImage}
                alt="Preview"
                className="w-32 h-32 rounded-full border-2 border-gray-300"
              />

              <div className="flex space-x-3">
                <label className="flex items-center px-3 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                  <FiEdit2 className="mr-2" />
                  Replace
                  <input type="file" accept="image/*" className="hidden" onChange={handleReplace} />
                </label>

                <button
                  onClick={handleDelete}
                  className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>

              <button
                onClick={handleSave}
                className="mt-2 px-6 py-2 bg-yellow-400 rounded-lg font-semibold hover:bg-yellow-500"
              >
                Save
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => {
                setModalOpen(false);
                setNewImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
