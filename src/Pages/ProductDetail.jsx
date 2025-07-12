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
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [userProducts, setUserProducts] = useState([]);
  const [selecting, setSelecting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [success, setSuccess] = useState("");

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "Products", productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data();
        setProduct(data);
        if (data.images?.length > 0) {
          setMainImage(data.images[0]);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  const fetchUserProducts = async () => {
    const q = query(collection(db, "Products"), where("uid", "==", uid));
    const querySnap = await getDocs(q);
    const items = [];
    querySnap.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setUserProducts(items);
  };

  const handleExchangeClick = async () => {
    setSelecting(true);
    await fetchUserProducts();
  };

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

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-20">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Image & Thumbnails */}
            <div className="lg:w-1/2">
              <img
                src={mainImage || "https://via.placeholder.com/400"}
                alt={product.title}
                className="w-full h-80 sm:h-96 object-cover rounded-md"
              />
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i}`}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                      mainImage === img ? "border-green-600" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  {product.title}
                </h1>
                <p className="text-gray-700">{product.description}</p>
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {!selecting && (
                <button
                  onClick={handleExchangeClick}
                  className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold"
                >
                  Propose Exchange
                </button>
              )}
            </div>
          </div>

          {/* Exchange UI */}
          {selecting && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Select Your Product for Exchange
              </h2>
              {userProducts.length === 0 ? (
                <p className="text-gray-500">You have no products listed.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {userProducts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedProductId(item.id)}
                      className={`cursor-pointer rounded-lg border p-3 shadow-sm transition-all ${
                        selectedProductId === item.id
                          ? "bg-green-50 border-green-600"
                          : "hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/150"
                        }
                        alt={item.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleSendRequest}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
              >
                Send Exchange Request
              </button>
            </div>
          )}

          {success && (
            <p className="mt-6 text-green-600 font-medium">{success}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
