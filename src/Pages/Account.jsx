import { useEffect, useState } from "react";

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = localStorage.getItem("uid");

  // Fetch user and products
  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/user/${uid}`);
        const productRes = await fetch(`/api/products?uid=${uid}`);

        const userData = await userRes.json();
        const productData = await productRes.json();

        setProfile(userData);
        setProducts(productData);
      } catch (err) {
        console.error("Fetch error:", err);
        // fallback for testing
        setProfile({
          email: "john.doe@example.com",
          username: "John Doe",
          website: "www.johndoe.com",
        });

        setProducts([
          { id: 1, title: "t-shirt", description: "this t-shirt is good", price: "$150" },
          { id: 2, title: "t-shirt", description: "this t-shirt is good", price: "$35" },
          { id: 3, title: "t-shirt", description: "this t-shirt is good", price: "$20" },
          { id: 4, title: "t-shirt", description: "this t-shirt is good", price: "$75" },
          { id: 5, title: "t-shirt", description: "this t-shirt is good", price: "$120" },
          { id: 6, title: "t-shirt", description: "this t-shirt is good", price: "$60" },
          { id: 7, title: "t-shirt", description: "this t-shirt is good", price: "$15" },
          { id: 8, title: "t-shirt", description: "this t-shirt is good", price: "$40" },
          { id: 9, title: "t-shirt", description: "this t-shirt is good", price: "$25" },
          { id: 10, title: "t-shirt", description: "this t-shirt is good", price: "$10" },
          { id: 11, title: "t-shirt", description: "this t-shirt is good", price: "$22" },
          { id: 12, title: "t-shirt", description: "this t-shirt is good", price: "$70" },
          { id: 13, title: "t-shirt", description: "this t-shirt is good", price: "$18" },
          { id: 14, title: "t-shirt", description: "this t-shirt is good", price: "$30" },
          { id: 15, title: "t-shirt", description: "this t-shirt is good", price: "$28" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  if (loading || !profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-20 text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">My Account</h1>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Avatar */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-100 border-4 border-gray-200 overflow-hidden shadow-md">
            <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
          <div className="space-y-4">
            {["email", "username", "website"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block font-medium text-sm text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={field}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium shadow">
              Update Profile
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 rounded-md font-medium">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">My Uploaded Products</h2>
      <div className="overflow-x-auto pb-4 -mx-2">
        <div className="flex gap-4 px-2 sm:px-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] max-w-[280px] sm:min-w-[220px] sm:max-w-[240px] flex-shrink-0 border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-all"
            >
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img src="/placeholder.svg" alt={product.title} className="h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-md font-semibold text-gray-800">{product.price}</span>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
