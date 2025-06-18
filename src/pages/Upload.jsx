import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [dressColors, setDressColors] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Step 1: Upload image to extract colors
      const colorRes = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const colors = colorRes.data.dress_colors;
      setDressColors(colors);

      // Step 2: Send extracted colors to /recommend/ (JSON)
      const recommendRes = await axios.post("http://localhost:5000/recommend/", {
        dress_colors: colors,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setRecommendations(recommendRes.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Upload or recommendation failed.");
    }
  };


  const getFullImageUrl = (path) => {
    // Fix for image path if it's relative like "static/accessories/..."
    return `http://localhost:5000/static/${path.replace(/^static\//, '')}`;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-700">Upload Your Outfit</h2>

      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Uploaded Outfit"
            className="w-64 rounded-lg shadow-lg mb-4 border-2 border-pink-400"
          />
        )}
      </div>

      {dressColors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Dress Dominant Colors:</h3>
          <div className="flex gap-3">
            {dressColors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-10 h-10 rounded-full border shadow-md"
                title={color}
              ></div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recommended Accessories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={getFullImageUrl(item.image_path)}
                  alt={`Accessory ${index}`}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <p className="text-sm font-semibold text-gray-800 capitalize">
                  {item.category || "Accessory"}
                </p>
                <p className="text-xs text-gray-500">
                  Match Score: {(100 - item.distance).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
