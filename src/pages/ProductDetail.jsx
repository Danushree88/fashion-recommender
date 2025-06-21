import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/product";
import { CartContext } from "../context/CartContext";
import SizeGuideModal from "../components/SizeGuideModal";

const ProductDetail = () => {
  const { categoryName, productId } = useParams();
  const productList = products[categoryName.toLowerCase()];
  const product = productList?.find((item) => item.id === Number(productId));

  const { addToCart } = useContext(CartContext);

  const [quantityStep, setQuantityStep] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return <div className="text-center py-20">Product not found</div>;

  const handleConfirmAdd = () => {
    if (product.sizeOptions && !selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      category: categoryName,
    });
    setAddedMsg(true);
    setQuantityStep(false);
    setTimeout(() => setAddedMsg(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-sm text-gray-500 mb-4">
        Home / <span className="text-pink-600 font-semibold">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-xs max-h-[300px] object-contain rounded-xl shadow"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

          <div className="text-xl mb-2">
            <span className="text-pink-600 font-bold">₹{product.salePrice}</span>{" "}
            <span className="line-through text-gray-500 ml-2">₹{product.price}</span>{" "}
            <span className="text-green-600 ml-2 font-medium">
              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">Price inclusive of all taxes</p>

          {/* Product Attributes */}
          <div className="text-sm text-gray-700 mb-4 space-y-1">
            {product.color && (
              <p>
                <span className="font-medium">Color:</span> {product.color}
              </p>
            )}
            {product.size && (
              <p>
                <span className="font-medium">Size:</span> {product.size}
              </p>
            )}
            {product.material && (
              <p>
                <span className="font-medium">Material:</span> {product.material}
              </p>
            )}
            {product.strapType && (
              <p>
                <span className="font-medium">Strap Type:</span> {product.strapType}
              </p>
            )}
            {product.frameType && (
              <p>
                <span className="font-medium">Frame Type:</span> {product.frameType}
              </p>
            )}
            {product.lensType && (
              <p>
                <span className="font-medium">Lens Type:</span> {product.lensType}
              </p>
            )}
            {product.capacity && (
              <p>
                <span className="font-medium">Capacity:</span> {product.capacity}
              </p>
            )}
          </div>

          {/* Size Selection */}
          {product.sizeOptions && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border rounded px-2 py-1 w-32"
              >
                <option value="">--Select--</option>
                {product.sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {product.sizeOptions && (
            <button
              onClick={() => setShowSizeGuide(true)}
              className="text-blue-600 text-sm hover:underline mb-2"
            >
              📏 View Size Guide
            </button>
          )}

          {/* Quantity Input */}
          {!quantityStep ? (
            <button
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 w-full mb-4"
              onClick={() => setQuantityStep(true)}
            >
              ADD TO CART
            </button>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter Quantity</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border rounded px-2 py-1"
                />
                <button
                  onClick={handleConfirmAdd}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Added to Cart Message */}
          {addedMsg && (
            <div className="text-green-600 text-sm font-medium mb-4">
              ✅ {quantity} item(s) added to cart!
            </div>
          )}

          {/* Designer Notes */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">DESIGNER NOTES</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>{product.description}</li>
              {product.length && <li>Length: {product.length}</li>}
              {product.designerNotes && <li>{product.designerNotes}</li>}
            </ul>
          </div>
        </div>
      </div>
            {showSizeGuide && (
        <SizeGuideModal
          category={categoryName.toLowerCase()}
          onClose={() => setShowSizeGuide(false)}
        />
      )}
    </div>
    
  );
};

export default ProductDetail;
