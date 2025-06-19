import os
import json
from flask import Blueprint, request, jsonify
import numpy as np
from sklearn.metrics.pairwise import euclidean_distances
from collections import defaultdict

from models.color_analysis import  is_fallback_color  # Use utilities from your own module if available

recommend_bp = Blueprint('recommend', __name__)  # REGISTER BLUEPRINT

MATCH_THRESHOLD = 10  # Match strictness


@recommend_bp.route('/', methods=['POST'])  # POST /recommend
def recommend():
    data = request.json
    dress_colors = data.get('dress_colors', [])
    
    recommendations = recommend_accessories_from_precomputed(
        dress_colors,
        json_file=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'models', 'accessory_colors.json'))
    )
    
    return jsonify(recommendations)


def recommend_accessories_from_precomputed(dress_colors_rgb, json_file, top_k=5):
    # Load precomputed accessory colors
    with open(json_file, "r") as f:
        accessory_data = json.load(f)

    dress_rgb = [parse_rgb(c) for c in dress_colors_rgb]
    fallback_accessories = []
    exact_matches = []

    for accessory in accessory_data:
        accessory_rgb = [parse_rgb(c) for c in accessory["colors"]]
        distance = color_distance(dress_rgb, accessory_rgb)

        print(f"Accessory: {accessory['image_path']} | Dominant: {accessory_rgb} | Distance: {distance:.2f}")

        similarity = max(0, round(100 - (distance / 441.67 * 100), 1))

        item = {
            "image_path": accessory["image_path"],
            "category": accessory["category"],
            "score": similarity
        }

        if any(is_fallback_color(c) for c in accessory_rgb):
            fallback_accessories.append(item)

        if distance <= MATCH_THRESHOLD:
            exact_matches.append(item)

    results = exact_matches if exact_matches else fallback_accessories
    results.sort(key=lambda x: x["score"], reverse=True)
    
    return limit_per_category(results, k=2)


def limit_per_category(sorted_results, k=2):
    category_map = defaultdict(list)
    for item in sorted_results:
        if len(category_map[item['category']]) < k:
            category_map[item['category']].append(item)
    limited = []
    for items in category_map.values():
        limited.extend(items)
    return limited


# Converts "rgb(200,50,100)" → (200, 50, 100)
def parse_rgb(rgb_string):
    try:
        return tuple(map(int, rgb_string.replace("rgb(", "").replace(")", "").split(",")))
    except Exception as e:
        print(f"⚠️ Error parsing RGB string: {rgb_string} → {e}")
        return (0, 0, 0)


def color_distance(colors1, colors2):
    if not colors1 or not colors2:
        return 9999
    try:
        c1 = np.array(colors1).reshape(-1, 3)
        c2 = np.array(colors2).reshape(-1, 3)
        return np.mean(euclidean_distances(c1, c2))
    except Exception as e:
        print(f"⚠️ Error in color_distance: {e}")
        return 9999


def is_fallback_color(rgb_tuple):
    color = np.array(rgb_tuple)
    return (
        np.linalg.norm(color - np.array([0, 0, 0])) < 30 or        # Black
        np.linalg.norm(color - np.array([255, 255, 255])) < 30 or  # White
        np.linalg.norm(color - np.array([255, 215, 0])) < 50       # Golden
    )
