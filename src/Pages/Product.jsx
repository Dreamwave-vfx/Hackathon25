import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Auth/config-firebase";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 px-4 py-10 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
            All Products
          </h1>

          {products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col"
                >
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/150"
                    }
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
