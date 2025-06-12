const dummyData = [
  { id: 1, name: "Gold Earrings", price: "$25", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Black Handbag", price: "$45", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Silver Necklace", price: "$30", image: "https://via.placeholder.com/150" },
];

function Recommendations() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Accessories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dummyData.map(item => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.price}</p>
            <button className="mt-2 bg-pink-500 text-white px-4 py-1 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
