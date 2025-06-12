import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-pink-600">FashionAI</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <Link to="/upload" className="hover:text-pink-500">Upload</Link>
        <Link to="/recommendations" className="hover:text-pink-500">Shop</Link>
        <Link to="/tryon" className="hover:text-pink-500">Try On</Link>
        <Link to="/cart" className="hover:text-pink-500">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
