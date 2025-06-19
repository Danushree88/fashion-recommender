// src/pages/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";

const ProductDetail = () => {
  const { categoryName, productId } = useParams();
  const product = products[categoryName.toLowerCase()]?.[productId];

  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">Rs. {product.price}</p>
          <p className="text-sm text-gray-600 mb-6">{product.description}</p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;