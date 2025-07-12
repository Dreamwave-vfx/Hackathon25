import React, { useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/navbar";
import { db } from "../Auth/config-firebase";
import { collection, addDoc } from "firebase/firestore";

function Listitem() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImagesToCloudinary = async (files) => {
    const cloudName = "dhtge1ocz";
    const uploadPreset = "clothimgs";

    const uploadedUrls = [];
    for (let i = 0; i < files.length && i < 5; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }
    return uploadedUrls;
  };

  const addProduct = async () => {
    try {
      const uid = localStorage.getItem("uid");
      if (!uid) return alert("You must be logged in");

      const uploadedUrls = await uploadImagesToCloudinary(files);

      await addDoc(collection(db, "Products"), {
        ...formData,
        tags,
        images: uploadedUrls,
        uid,
        createdAt: new Date(),
      });

      alert("Product uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
      });
      setTags([]);
      setImages([]);
      setFiles([]);
    } catch (err) {
      alert("Error uploading product: " + err.message);
    }
  };

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags((prev) => [...prev, trimmed]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const categories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Shoes",
    "Accessories",
    "Activewear",
    "Sleepwear",
  ];

  if (!localStorage.getItem("uid")) {
    return (
      <div className="p-6">
        <h1 className="text-red-500 text-xl font-semibold">
          Please login first.
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold my-4">List a Product</h1>

        {/* Image Upload */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Photos</h2>
          <label className="aspect-square m-[10px] sm:w-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <span className="text-sm text-gray-500 text-center">
              Add Photos
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
          <div className="flex gap-2 flex-wrap mt-2">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Details</h2>

          <div className="space-y-2">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              className="border rounded px-2 py-1 w-full"
              placeholder="e.g., Vintage Denim Jacket"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              className="border rounded px-2 py-1 w-full"
              placeholder="Describe the item, brand, condition..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label>Category *</label>
            <select
              id="category"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={formData.category}
              onChange={(e) => updateFormData("category", e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 mt-4">
            <label htmlFor="size">Size *</label>
            <input
              id="size"
              className="border rounded px-2 py-1 w-full"
              placeholder="e.g., M, 32, 8"
              value={formData.size}
              onChange={(e) => updateFormData("size", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter a tag"
              className="border px-2 py-1 rounded"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              onClick={addTag}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-1 bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
                >
                  {tag}
                  <X
                    className="h-3 w-3 text-gray-600 hover:text-red-500 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={addProduct}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Product
        </button>
      </div>
    </>
  );
}

export default Listitem;
