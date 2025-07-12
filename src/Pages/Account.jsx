import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Auth/config-firebase";
import Navbar from "../components/navbar";

export default function Account() {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const q = query(collection(db, "Products"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const userItems = [];
        querySnapshot.forEach((doc) => {
          userItems.push({ id: doc.id, ...doc.data() });
        });
        setProducts(userItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (uid) {
      fetchUserProducts();
      fetchUserDetails();
    }
  }, [uid]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-20 text-gray-900">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
          My Account
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Avatar */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-100 border-4 border-gray-200 overflow-hidden shadow-md">
              <img
                src={localStorage.getItem("profilePic")}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
            <div className="space-y-4">
              {["email", "username", "website"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block font-medium text-sm text-gray-700"
                  >
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          My Uploaded Products
        </h2>
        <div className="overflow-x-auto pb-4 -mx-2">
          <div className="flex gap-4 px-2 sm:px-0">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] max-w-[280px] sm:min-w-[220px] sm:max-w-[240px] flex-shrink-0 border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-all"
              >
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <img
                    src="/placeholder.svg"
                    alt={product.title}
                    className="h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-md font-semibold text-gray-800">
                      {product.price}
                    </span>
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
    </>
  );
}
