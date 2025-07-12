import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Recycle, Users, Award, Upload, Search, Repeat } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    points: 150,
    email: "john@example.com",
  });

  const handleLogout = () => setUser(null);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Outerwear",
      size: "M",
      condition: "Excellent",
      points: 25,
      rating: 4.8,
      location: "San Francisco, CA",
      user: "Sarah M.",
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      category: "Dresses",
      size: "S",
      condition: "Like New",
      points: 35,
      rating: 4.9,
      location: "Los Angeles, CA",
      user: "Emma K.",
    },
    {
      id: 3,
      title: "Casual Sneakers",
      category: "Shoes",
      size: "9",
      condition: "Good",
      points: 20,
      rating: 4.7,
      location: "New York, NY",
      user: "Mike R.",
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      category: "Outerwear",
      size: "L",
      condition: "Very Good",
      points: 40,
      rating: 4.8,
      location: "Chicago, IL",
      user: "Lisa T.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Give Your Clothes a <span className="text-green-600">Second Life</span>
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Join ReWear's community-driven clothing exchange. Swap, redeem, and discover pre-loved fashion
            while making a positive impact on the environment.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="/add-item" className="bg-green-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition inline-flex items-center">
              Start Swapping <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a href="/browse" className="text-black border border-gray-300 px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-100 transition">
              Browse Items
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Recycle className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">10,000+</h3>
              <p className="text-sm text-gray-600">Items Exchanged</p>
            </div>
            <div>
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Users className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">5,000+</h3>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
            <div>
              <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Award className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">2 Tons</h3>
              <p className="text-sm text-gray-600">Textile Waste Saved</p>
            </div>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <p className="text-gray-600 mt-2">Discover amazing pre-loved fashion from our community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
                <div className="h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  <span>No image</span>
                </div>
                <div className="p-4">
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">
                    {item.points} pts
                  </span>
                  <h3 className="font-semibold mt-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.category} • Size {item.size}
                  </p>
                  <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1">
                    {item.condition}
                  </span>
                  <div className="text-sm mt-2 text-gray-500">⭐ {item.rating} • {item.location}</div>
                  <p className="text-xs text-gray-500 mt-1">by {item.user}</p>
                  <a href="#" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition">
                    View Item
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How ReWear Works</h2>
            <p className="text-gray-600 mt-2">Simple steps to start your sustainable fashion journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
            {[
              { icon: <Upload className="text-green-600 w-6 h-6" />, step: "List Your Items", desc: "Upload clothes you no longer wear and set point values." },
              { icon: <Search className="text-green-600 w-6 h-6" />, step: "Browse & Discover", desc: "Explore thousands of pre-loved items by size and style." },
              { icon: <Repeat className="text-green-600 w-6 h-6" />, step: "Swap or Redeem", desc: "Use points or swap directly with other members." },
              { icon: <Award className="text-green-600 w-6 h-6" />, step: "Earn & Give Back", desc: "Gain points and help reduce textile waste." },
            ].map((item, index) => (
              <div key={index}>
                <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div className="w-6 h-6 rounded-full bg-green-600 text-white text-sm mx-auto mb-2 flex items-center justify-center">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-gray-900">{item.step}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
