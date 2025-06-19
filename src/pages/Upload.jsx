import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
      const colorRes = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const colors = colorRes.data.dress_colors;
      setDressColors(colors);

      const recommendRes = await axios.post("http://localhost:5000/recommend/", {
        dress_colors: colors,
      });

      setRecommendations(recommendRes.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Upload or recommendation failed.");
    }
  };

  const getFullImageUrl = (path) =>
    `http://localhost:5000/static/${path.replace(/^static\//, "")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white px-6 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-pink-700 mb-4">Upload Your Outfit</h2>
        <p className="text-gray-600 mb-10">Get AI-powered accessory suggestions based on your look.</p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-3xl border border-pink-100 shadow-xl p-8"
        >
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Choose a file
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
            />
          </div>

          {preview && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={preview}
              alt="Uploaded Outfit"
              className="w-64 mx-auto rounded-lg shadow-md border-2 border-pink-400 mb-6"
            />
          )}

          {dressColors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Extracted Colors:</h3>
              <div className="flex justify-center gap-3">
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
        </motion.div>

        {recommendations.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recommended Accessories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="bg-white border rounded-xl p-4 shadow transition"
                >
                  <img
                    src={getFullImageUrl(item.image_path)}
                    alt={`Accessory ${index}`}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {item.category || "Accessory"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Match Score: {isNaN(item.score) ? "N/A" : `${item.score}%`}
                  </p>

                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
