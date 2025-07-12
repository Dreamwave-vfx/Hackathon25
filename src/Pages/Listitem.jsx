import React, { useState } from "react";
import { X, Loader } from "lucide-react";
import Navbar from "../components/navbar";
import { db } from "../Auth/config-firebase";
import { collection, addDoc } from "firebase/firestore";

function Listitem() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
  });

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

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const removeImage = (index) => {
    const newFiles = [...files];
    const newImages = [...images];
    newFiles.splice(index, 1);
    newImages.splice(index, 1);
    setFiles(newFiles);
    setImages(newImages);
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

  const uploadImagesToCloudinary = async (files) => {
    const cloudName = "dhtge1ocz";
    const uploadPreset = "clothimgs";
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }

    return uploadedUrls;
  };

  const addProduct = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) return alert("Please login first.");

    try {
      setLoading(true);
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
        size: "",
        condition: "",
      });
      setTags([]);
      setImages([]);
      setFiles([]);
    } catch (err) {
      alert("Error uploading product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!localStorage.getItem("uid")) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center">
          <h1 className="text-red-600 text-xl font-semibold">
            Please login first.
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-20 text-gray-900">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6">List a New Product</h1>

          {/* Upload Image Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Photos (max 5)
            </label>
            <label
              htmlFor="upload"
              className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-md p-5 text-center cursor-pointer hover:border-green-400 transition"
            >
              <span className="text-sm text-gray-600">
                Click or drag files to upload
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                id="upload"
                onChange={handleImage}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={src}
                      className="object-cover w-full h-full"
                      alt="preview"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid gap-5">
            {[
              {
                id: "title",
                label: "Title",
                placeholder: "e.g. Stylish Hoodie",
              },
              {
                id: "description",
                label: "Description",
                type: "textarea",
                rows: 4,
                placeholder: "Describe the product...",
              },
              { id: "size", label: "Size", placeholder: "e.g. M, L, 32" },
            ].map(({ id, label, ...rest }) => (
              <div key={id}>
                <label className="block text-sm font-medium mb-1">
                  {label} *
                </label>
                {rest.type === "textarea" ? (
                  <textarea
                    id={id}
                    value={formData[id]}
                    onChange={(e) => updateFormData(id, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows={rest.rows}
                    placeholder={rest.placeholder}
                  />
                ) : (
                  <input
                    id={id}
                    value={formData[id]}
                    onChange={(e) => updateFormData(id, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder={rest.placeholder}
                  />
                )}
              </div>
            ))}

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData("category", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="border px-3 py-1 rounded w-full"
                placeholder="e.g. vintage, handmade"
              />
              <button
                onClick={addTag}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {tag}
                  <X
                    className="h-4 w-4 text-gray-600 hover:text-red-500 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={addProduct}
            disabled={loading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" /> Uploading...
              </>
            ) : (
              "Upload Product"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Listitem;
