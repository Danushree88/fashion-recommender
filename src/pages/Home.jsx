import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      <header className="bg-gradient-to-r from-pink-100 to-indigo-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Fashion AI</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Discover accessories that match your outfit. Let AI elevate your style.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/upload"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Upload Your Outfit
          </Link>
          <Link
            to="/categories"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-100 transition"
          >
            Browse Categories
          </Link>
        </div>
      </header>

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
            <p>We use computer vision to suggest the best-matching accessories based on your dress.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
            <p>See how accessories look with your outfit before you buy, thanks to our Try-On technology.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">Curated Collections</h3>
            <p>Our style engine offers handpicked sets to suit every occasion, from casual to wedding.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;