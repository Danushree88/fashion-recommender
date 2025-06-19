import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Eye, Star } from "lucide-react"; // Optional: Use lucide icons

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-pink-100 to-indigo-100 py-20 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-800"
        >
          Welcome to <span className="text-indigo-600">Fashion AI</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700"
        >
          Discover accessories that match your outfit. Let AI elevate your style.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            to="/upload"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition"
          >
            Upload Your Outfit
          </Link>
          <Link
            to="/categories"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 hover:scale-105 transition"
          >
            Browse Categories
          </Link>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">✨ Why Choose Us?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4 text-indigo-600">
              <Sparkles className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">AI Recommendations</h3>
            </div>
            <p className="text-gray-600">
              We use computer vision to suggest the best-matching accessories based on your dress.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4 text-indigo-600">
              <Eye className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Virtual Try-On</h3>
            </div>
            <p className="text-gray-600">
              See how accessories look with your outfit before you buy, thanks to our Try-On technology.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4 text-indigo-600">
              <Star className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Curated Collections</h3>
            </div>
            <p className="text-gray-600">
              Our style engine offers handpicked sets to suit every occasion, from casual to wedding.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
