import os
from PIL import Image
import numpy as np
from sklearn.metrics.pairwise import euclidean_distances
from .color_analysis import extract_dominant_colors
from collections import defaultdict

# Match threshold (lower = stricter)
MATCH_THRESHOLD = 20

def recommend_accessories_from_subfolders(dress_colors_rgb, accessory_dir="accessories", top_k=5):
    base_dir = os.path.join(os.path.dirname(__file__), '..', 'static', 'accessories')
    base_dir = os.path.abspath(base_dir)

    results = []
    dress_rgb = [parse_rgb(c) for c in dress_colors_rgb]

    fallback_accessories = []
    exact_matches = []

    for category in os.listdir(base_dir):
        category_path = os.path.join(base_dir, category)
        if not os.path.isdir(category_path):
            continue

        for filename in os.listdir(category_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(category_path, filename)

                accessory_colors = extract_dominant_colors(image_path)
                accessory_rgb = [parse_rgb(color) for color in accessory_colors]

                distance = color_distance(dress_rgb, accessory_rgb)

                # Debug log
                print(f"Accessory: {filename} | Dominant: {accessory_rgb} | Distance: {distance:.2f}")

                similarity = max(0, round(100 - (distance / 441.67 * 100), 1))

                accessory_data = {
                    "image_path": f"static/accessories/{category}/{filename}",
                    "category": category,
                    "score": similarity
                }

                # Store fallback (black, white, golden)
                if any(is_fallback_color(c) for c in accessory_rgb):
                    fallback_accessories.append(accessory_data)

                # Store exact matches
                if distance <= MATCH_THRESHOLD:
                    exact_matches.append(accessory_data)

    # Decision: Use exact match or fallback
    if not exact_matches:
        print("⚠️ No close match found. Showing fallback (black/white/golden) accessories.")
        results = fallback_accessories
    else:
        results = exact_matches

    results.sort(key=lambda x: x["score"], reverse=True)
    return limit_per_category(results, k=2)

# Only top-k per category
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

# Calculate average distance between two color sets
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

# Check if color is close to black, white, or gold
def is_fallback_color(rgb_tuple):
    color = np.array(rgb_tuple)
    return (
        np.linalg.norm(color - np.array([0, 0, 0])) < 30 or        # Black
        np.linalg.norm(color - np.array([255, 255, 255])) < 30 or  # White
        np.linalg.norm(color - np.array([255, 215, 0])) < 50       # Golden
    )
