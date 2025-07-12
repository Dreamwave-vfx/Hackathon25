import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Auth/config-firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Navbar from "../components/navbar";

const ProductDetail = () => {
  const { productId } = useParams(); // URL param
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [userProducts, setUserProducts] = useState([]);
  const [selecting, setSelecting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [success, setSuccess] = useState("");

  const uid = localStorage.getItem("uid");

  // Load selected product details
  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "Products", productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  // Load user's products
  const fetchUserProducts = async () => {
    const q = query(collection(db, "Products"), where("uid", "==", uid));
    const querySnap = await getDocs(q);
    const items = [];
    querySnap.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setUserProducts(items);
  };

  // Exchange button clicked
  const handleExchangeClick = async () => {
    setSelecting(true);
    await fetchUserProducts();
  };

  // Submit exchange request
  const handleSendRequest = async () => {
    if (!selectedProductId) return alert("Select one of your items first!");

    await addDoc(collection(db, "ExchangeRequests"), {
      fromUid: uid,
      fromProductId: selectedProductId,
      toProductId: productId,
      timestamp: new Date(),
    });

    setSuccess("Exchange request sent successfully!");
    setSelecting(false);
    setSelectedProductId("");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={mainImage || "https://via.placeholder.com/400"}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded"
            />
            <div className="flex gap-2 mt-3">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setMainImage(img)}
                  alt={`Thumbnail ${i}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    mainImage === img
                      ? "border-green-600 border-2"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {!selecting && (
              <button
                onClick={handleExchangeClick}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Exchange
              </button>
            )}
          </div>
        </div>

        {selecting && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Select one of your items to exchange
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedProductId(item.id)}
                  className={`border p-3 rounded cursor-pointer transition ${
                    selectedProductId === item.id
                      ? "border-green-600 bg-green-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              ))}
            </div>
            <button
              onClick={handleSendRequest}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Exchange Request
            </button>
          </div>
        )}

        {success && (
          <p className="mt-4 text-green-600 font-semibold">{success}</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
