import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">
      <div className="text-pink-600 text-xl font-bold">FashionAI</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/categories">Categories</Link></li> {/* 👈 Add this */}
        <li><Link to="/recommendations">Shop</Link></li>
        <li><Link to="/tryon">Try On</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;