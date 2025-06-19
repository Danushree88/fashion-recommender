# server/routes/category.py
from flask import Blueprint, jsonify
import os

category_bp = Blueprint("category", __name__)
BASE_DIR = os.path.join(os.getcwd(), "server", "static", "accessories")

@category_bp.route("/category/<category_name>")
def list_category_images(category_name):
    category_path = os.path.join(BASE_DIR, category_name)
    
    if not os.path.isdir(category_path):
        return jsonify({"error": "Category not found"}), 404

    files = [
        file for file in os.listdir(category_path)
        if file.lower().endswith((".png", ".jpg", ".jpeg"))
    ]
    
    return jsonify({"images": files})
