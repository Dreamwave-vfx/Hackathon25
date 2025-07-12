import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { signInWithGoogle } from "../Auth/config-firebase";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem("uid");
    if (user) setSignIn(true);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Exchange", href: "/shop" },
    { name: "Add Item", href: "/additem" },
    { name: "My Account", href: "/dashboard" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setSignIn(false);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      localStorage.setItem("user", JSON.stringify(result.user));
      setSignIn(true);
    } catch (error) {
      console.error("Login failed", error);
    }
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

          {/* Desktop Navigation */}
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

          {/* Desktop Login/Logout */}
          <div className="hidden md:flex items-center gap-4">
            {!signIn ? (
              <button
                onClick={handleLogin}
                className="mt-2 border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition mx-2"
              >
                LogIn
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 shadow-sm transition duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
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

            {/* Mobile Login/Logout - FIXED: changed from hidden to flex */}
            <div className="flex items-center gap-4 px-2">
              {!signIn ? (
                <button
                  onClick={handleLogin}
                  className="mt-2 border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition mx-2"
                >
                  LogIn
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 shadow-sm transition duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
