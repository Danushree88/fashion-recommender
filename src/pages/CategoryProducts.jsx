// src/pages/CategoryProducts.jsx
import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/product";

const CategoryProducts = () => {
  const { category } = useParams();
  const items = products[category.toLowerCase()];

  if (!items) {
    return <div className="text-center mt-10 text-red-600">Category not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">
        {category} Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-700 mt-1">Rs. {item.price}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;