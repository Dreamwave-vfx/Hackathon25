import React, { useState } from "react";
import { db } from "../Auth/config-firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uid = localStorage.getItem("uid");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uid) {
      setError("User not authenticated.");
      return;
    }

    const { name, mobile, email, address } = formData;
    if (!name || !mobile || !email || !address) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "Users", uid);
      await setDoc(userRef, {
        ...formData,
        createdAt: new Date(),
      });
      navigate("/"); // redirect to home/dashboard after success
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full border px-3 py-2 rounded"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <input
          type="tel"
          placeholder="Mobile Number *"
          className="w-full border px-3 py-2 rounded"
          value={formData.mobile}
          onChange={(e) => updateField("mobile", e.target.value)}
        />

        <input
          type="email"
          placeholder="Email *"
          className="w-full border px-3 py-2 rounded"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <input
          type="text"
          placeholder="Address *"
          className="w-full border px-3 py-2 rounded"
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full border px-3 py-2 rounded"
          value={formData.city}
          onChange={(e) => updateField("city", e.target.value)}
        />

        <input
          type="text"
          placeholder="State"
          className="w-full border px-3 py-2 rounded"
          value={formData.state}
          onChange={(e) => updateField("state", e.target.value)}
        />

        <input
          type="text"
          placeholder="Pin Code"
          className="w-full border px-3 py-2 rounded"
          value={formData.pincode}
          onChange={(e) => updateField("pincode", e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
