import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  if (cartItems.length === 0)
    return <div className="text-center py-20 text-lg">👜 Your bag is empty.</div>;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-8">👜 Your Bag</h2>

      <ul className="space-y-6">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center border-b pb-6 gap-4"
          >
            <Link
              to={`/categories/${item.category || "unknown"}/${item.id}`}
              className="flex gap-4 items-center w-full sm:w-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.salePrice} x {item.quantity}</p>
                  {/* Show size if available */}
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
              </div>
            </Link>

            <div className="text-right sm:text-left mt-2 sm:mt-0">
              <p className="font-medium text-gray-800">
                ₹{item.salePrice * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline mt-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total Price and Clear Cart */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Total: ₹{totalAmount}
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={clearCart}
        >
          Clear Cart
        </button>

          <Link
            to="/checkout"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </Link>

      </div>
    </div>
  );
};

export default Cart;
