"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Auth/config-firebase";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import {
  User,
  Package,
  Mail,
  Phone,
  MapPin,
  X,
  ShoppingBag,
  Star,
  Award,
  Send,
  Inbox,
  CheckCircle,
  Clock,
} from "lucide-react";

const AccountPage = () => {
  const [products, setProducts] = useState([]);
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
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
        return userItems.map((item) => item.id);
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    };

    const fetchExchangeRequests = async () => {
      try {
        const q = query(
          collection(db, "ExchangeRequests"),
          where("fromUid", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
          const fromRef = doc(db, "Products", data.fromProductId);
          const toRef = doc(db, "Products", data.toProductId);
          const [fromSnap, toSnap] = await Promise.all([
            getDoc(fromRef),
            getDoc(toRef),
          ]);
          if (fromSnap.exists() && toSnap.exists()) {
            items.push({
              id: docSnap.id,
              from: { id: data.fromProductId, ...fromSnap.data() },
              to: { id: data.toProductId, ...toSnap.data() },
            });
          }
        }
        setExchangeRequests(items);
      } catch (error) {
        console.error("Error fetching exchange requests:", error);
      }
    };

    const fetchReceivedRequests = async (userProductIds) => {
      try {
        if (!userProductIds || userProductIds.length === 0) return;
        const q = query(
          collection(db, "ExchangeRequests"),
          where("toProductId", "in", userProductIds)
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
          const fromRef = doc(db, "Products", data.fromProductId);
          const toRef = doc(db, "Products", data.toProductId);
          const [fromSnap, toSnap] = await Promise.all([
            getDoc(fromRef),
            getDoc(toRef),
          ]);
          if (fromSnap.exists() && toSnap.exists()) {
            items.push({
              id: docSnap.id,
              from: { id: data.fromProductId, ...fromSnap.data() },
              to: { id: data.toProductId, ...toSnap.data() },
            });
          }
        }
        setReceivedRequests(items);
      } catch (error) {
        console.error("Error fetching received requests:", error);
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
      fetchUserDetails();
      fetchUserProducts().then((userProductIds) => {
        fetchExchangeRequests();
        fetchReceivedRequests(userProductIds);
      });
    }
  }, [uid]);

  const cancelRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "ExchangeRequests", requestId));
      setExchangeRequests((prev) =>
        prev.filter((item) => item.id !== requestId)
      );
      setReceivedRequests((prev) =>
        prev.filter((item) => item.id !== requestId)
      );
    } catch (err) {
      console.error("Failed to cancel request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                My <span className="text-green-600">Account</span>
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your profile, products, and exchange requests
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Package className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {products.length}
                </h3>
                <p className="text-sm text-gray-600">Listed Products</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Send className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {exchangeRequests.length}
                </h3>
                <p className="text-sm text-gray-600">Sent Requests</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Inbox className="text-orange-600 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {receivedRequests.length}
                </h3>
                <p className="text-sm text-gray-600">Received Requests</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Details Section */}
        {userDetails && (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <User className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        Profile Information
                      </h2>
                      <p className="text-green-100 text-sm">
                        Your account details and contact information
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <User className="text-gray-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-900">
                          {userDetails.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <Mail className="text-gray-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-gray-900">
                          {userDetails.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <Phone className="text-gray-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mobile Number</p>
                        <p className="font-semibold text-gray-900">
                          {userDetails.mobile}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <MapPin className="text-gray-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-semibold text-gray-900">
                          {userDetails.address}
                        </p>
                      </div>
                    </div>
                    {userDetails.city && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <MapPin className="text-gray-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p className="font-semibold text-gray-900">
                            {userDetails.city}
                          </p>
                        </div>
                      </div>
                    )}
                    {userDetails.state && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <MapPin className="text-gray-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            State & Pincode
                          </p>
                          <p className="font-semibold text-gray-900">
                            {userDetails.state}{" "}
                            {userDetails.pincode && `- ${userDetails.pincode}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* My Products Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">My Products</h2>
              <p className="mt-2 text-gray-600">
                Items you've listed for exchange
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Products Listed
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't listed any products yet. Start by adding your
                  first item!
                </p>
                <a
                  href="/additem"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition"
                >
                  <Package className="mr-2 w-4 h-4" />
                  Add Your First Item
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
                  >
                    <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                      <img
                        src={
                          product.images?.[0] ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          Active
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Exchange Requests Sent Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                My Exchange Requests
              </h2>
              <p className="mt-2 text-gray-600">
                Requests you've sent to other users
              </p>
            </div>

            {exchangeRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Send className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Exchange Requests
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't made any exchange requests yet. Browse items to
                  start swapping!
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-50 transition"
                >
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  Browse Items
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exchangeRequests.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Send className="text-blue-600 w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Sent Request
                            </h3>
                            <p className="text-sm text-gray-600">
                              Waiting for response
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Your Product
                          </h4>
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                            <img
                              src={
                                item.from.images?.[0] ||
                                "/placeholder.svg?height=150&width=150"
                              }
                              alt={item.from.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.from.title}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Requested Product
                          </h4>
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                            <img
                              src={
                                item.to.images?.[0] ||
                                "/placeholder.svg?height=150&width=150"
                              }
                              alt={item.to.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.to.title}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => cancelRequest(item.id)}
                        className="w-full bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-100 transition flex items-center justify-center"
                      >
                        <X className="mr-2 w-4 h-4" />
                        Cancel Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Exchange Requests Received Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Exchange Requests Received
              </h2>
              <p className="mt-2 text-gray-600">
                Requests from other users for your products
              </p>
            </div>

            {receivedRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Inbox className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Requests Received
                </h3>
                <p className="text-gray-600 mb-6">
                  No one has requested to exchange with your products yet. Make
                  sure your items are attractive and well-described!
                </p>
                <a
                  href="/additem"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition"
                >
                  <Package className="mr-2 w-4 h-4" />
                  Add More Items
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {receivedRequests.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                            <Inbox className="text-orange-600 w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Received Request
                            </h3>
                            <p className="text-sm text-gray-600">
                              Someone wants your item
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          New
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Their Product
                          </h4>
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                            <img
                              src={
                                item.from.images?.[0] ||
                                "/placeholder.svg?height=150&width=150"
                              }
                              alt={item.from.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.from.title}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Your Product
                          </h4>
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                            <img
                              src={
                                item.to.images?.[0] ||
                                "/placeholder.svg?height=150&width=150"
                              }
                              alt={item.to.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.to.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center">
                          <CheckCircle className="mr-2 w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => cancelRequest(item.id)}
                          className="flex-1 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-100 transition flex items-center justify-center"
                        >
                          <X className="mr-2 w-4 h-4" />
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
