// src/pages/ProductCategories.jsx
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Bags", image: "/assets/categories/bags.jpg" },
  { name: "Bracelet", image: "/assets/categories/bracelet.jpg" },
  { name: "Chains", image: "/assets/categories/chains.jpg" },
  { name: "Earings", image: "/assets/categories/earings.jpg" },
  { name: "Footwear", image: "/assets/categories/footwear.jpg" },
  { name: "Glasses", image: "/assets/categories/glasses.jpg" },
  { name: "Hats", image: "/assets/categories/hats.jpg" },
  { name: "Rings", image: "/assets/categories/rings.jpg" },
  { name: "Watches", image: "/assets/categories/watches.jpg" }
];

const ProductCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Shop by Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={`/categories/${category.name.toLowerCase()}`}>
              <Card className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;