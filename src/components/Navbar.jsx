import React, { useState } from "react";
import { ShoppingBag, User, Menu } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "Browse Items", href: "/" },
    { name: "My Dashboard", href: "/dashboard" },
    { name: "Add Item", href: "/add-item" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  const user = {
    name: "John Doe",
    points: 150,
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </a>

          <div className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                {user.points} pts
              </span>
            </div>
            <button className="border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 shadow-sm transition duration-200">
              Logout
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 px-2 text-sm font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="flex items-center gap-2 mt-2 px-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                {user.points} pts
              </span>
            </div>

            <button className="mt-2 border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition mx-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
