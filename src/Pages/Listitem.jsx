import React from "react";
import { useState } from "react";
function Listitem() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    estimatedPoints: 0,
  });

  const handleImage = (e) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd  to a service and get URLs
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  if (!localStorage.getItem("uid")) {
    return (
      <div>
        <h1>Please Login first</h1>
      </div>
    );
  }
  return (
    <div>
      <h1> a product</h1>
      <div>
        <h1>Photo</h1>
        <h4 className="aspect-square m-[10px] sm:w-100 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
          <span className="text-sm text-muted-foreground text-center">
            Add Photo
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </h4>
      </div>
      <div>
        <h1>Details</h1>
        <div className="space-y-2">
          <h4>Title *</h4>
          <input
            id="title"
            placeholder="e.g., Vintage Denim Jacket"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <h4>Description *</h4>
          <textarea
            id="description"
            placeholder="Describe the item, its condition, brand, and any other relevant details..."
            rows={4}
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 htmlFor="size">Size *</h4>
            <input
              id="size"
              placeholder="e.g., M, 32, 8"
              value={formData.size}
              onChange={(e) => updateFormData("size", e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h1>Tags</h1>
        <input
          id="size"
          placeholder="e.g., M, 32, 8"
          value={formData.size}
          onChange={(e) => updateFormData("size", e.target.value)}
        />
      </div>
    </div>
  );
}

export default Listitem;
