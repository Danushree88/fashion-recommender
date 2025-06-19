import os
import json
import numpy as np
from collections import defaultdict
from itertools import product
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000

def recommend_accessories_from_subfolders(dress_colors_rgb, json_file="accessory_colors.json", top_k_per_category=2):
    with open(json_file, "r") as f:
        accessory_data = json.load(f)

    dress_rgb = [parse_rgb(c) for c in dress_colors_rgb]
    matches_by_category = defaultdict(list)
    fallback_by_category = defaultdict(list)

    has_exact_matches = False

    for accessory in accessory_data:
        accessory_rgb = [parse_rgb(c) for c in accessory["colors"]]
        distance = hsv_distance(dress_rgb, accessory_rgb)
        # Adjust scaling to 100 - (distance * 0.8) for finer granularity, cap at 70
        similarity = max(0, round(100 - (distance * 0.8), 1)) if distance < 70 else 0

        item = {
            "image_path": accessory["image_path"],
            "category": accessory["category"],
            "score": similarity,
            "colors": accessory["colors"]  # Add for debugging
        }

        print(f"Accessory {accessory['image_path']} colors: {accessory['colors']}, score: {similarity}, all_fallback: {all(is_strict_fallback_color(c) for c in accessory_rgb)}")

        # Stricter check: all accessory colors must be very close to dress colors
        all_colors_match = all(min(hsv_distance([c1], [c2]) for c2 in dress_rgb) < 20 for c1 in accessory_rgb)
        if similarity >= 70 and all_colors_match:
            matches_by_category[accessory["category"]].append(item)
            has_exact_matches = True
        elif all(is_strict_fallback_color(c) for c in accessory_rgb):  # Only pure fallback colors
            fallback_by_category[accessory["category"]].append(item)

    # Select top 2 per category
    final_matches = []
    categories = set(matches_by_category.keys()) | set(fallback_by_category.keys())
    for category in categories:
        matches = matches_by_category.get(category, [])
        if not matches and not has_exact_matches:  # Only use fallback if no exact matches exist
            matches = fallback_by_category.get(category, [])
        matches.sort(key=lambda x: x["score"], reverse=True)
        final_matches.extend(matches[:top_k_per_category])
        print(f"Category {category}: {len(matches)} matches, selected {min(len(matches), top_k_per_category)}, top score: {matches[0]['score'] if matches else 0}")

    return final_matches

# --- Utilities ---

def hsv_distance(colors1, colors2):
    try:
        distances = []
        for c1, c2 in product(colors1, colors2):
            rgb1 = sRGBColor(*[x/255 for x in c1])
            rgb2 = sRGBColor(*[x/255 for x in c2])
            lab1 = convert_color(rgb1, LabColor)
            lab2 = convert_color(rgb2, LabColor)
            distances.append(delta_e_cie2000(lab1, lab2))
        return np.mean(distances) if distances else 9999
    except Exception as e:
        print("Color distance error:", e)
        return 9999

def parse_rgb(rgb_string):
    try:
        return tuple(map(int, rgb_string.replace("rgb(", "").replace(")", "").split(",")))
    except:
        return (0, 0, 0)

def is_strict_fallback_color(rgb_tuple):
    color = np.array(rgb_tuple)
    gold_silver_priority = (
        np.linalg.norm(color - np.array([255, 215, 0])) < 40 or  # Gold
        np.linalg.norm(color - np.array([192, 192, 192])) < 40    # Silver
    )
    neutral = (
        np.linalg.norm(color - np.array([0, 0, 0])) < 30 or       # Black
        np.linalg.norm(color - np.array([255, 255, 255])) < 30     # White
    )
    return gold_silver_priority or neutral