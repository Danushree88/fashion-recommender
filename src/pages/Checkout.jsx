function Checkout() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form className="space-y-4 max-w-md">
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <button className="bg-pink-500 text-white px-4 py-2 rounded">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
