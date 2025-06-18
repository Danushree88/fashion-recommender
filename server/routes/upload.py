from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from models.color_analysis import extract_dominant_colors  # if you're extracting dominant colors here

upload_bp = Blueprint("upload", __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "server", "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image part in request"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)

        # Optional: extract colors and return them
        try:
            colors = extract_dominant_colors(save_path)
        except Exception as e:
            return jsonify({"error": f"Color extraction failed: {str(e)}"}), 500

        return jsonify({
            "message": "File uploaded successfully",
            "path": f"/static/uploads/{filename}",
            "dress_colors": colors
        }), 200

    return jsonify({"error": "Invalid file format"}), 400
