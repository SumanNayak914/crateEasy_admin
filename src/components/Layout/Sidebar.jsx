import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/products", label: "Products" },
    { path: "/orders", label: "Orders" },
    { path: "/customers", label: "Customers" },
    { path: "/reports", label: "Reports" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 sticky top-0">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-3 py-2 rounded-md ${
              pathname === link.path
                ? "bg-yellow-400 text-black font-semibold"
                : "hover:text-yellow-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
