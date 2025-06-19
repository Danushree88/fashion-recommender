import os
import json
from color_analysis import extract_dominant_colors, is_fallback_color
from accessory_matcher import parse_rgb

def precompute_accessory_colors(
    accessory_dir=os.path.abspath(os.path.join(os.path.dirname('_file_'), '..', 'static', 'accessories')),
    output_file="accessory_colors.json"
):
    accessory_data = []
    skipped_files = []

    for category in os.listdir(accessory_dir):
        category_path = os.path.join(accessory_dir, category)
        if not os.path.isdir(category_path):
            continue

        for filename in os.listdir(category_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(category_path, filename)
                colors = extract_dominant_colors(image_path)

                # Skip if all colors are black/white (but allow gold/silver)
                fallback_count = sum(is_fallback_color(parse_rgb(c), include_gold_silver=False) for c in colors)
                if fallback_count == len(colors):
                    print(f"⚠ Skipping mostly black/white: {filename}")
                    skipped_files.append(filename)
                    continue

                accessory_data.append({
                    "image_path": os.path.join("static", "accessories", category, filename).replace("\\", "/"),
                    "category": category,
                    "colors": colors
                })

    with open(output_file, "w") as f:
        json.dump(accessory_data, f, indent=2)

    print(f"✅ Precomputed data for {len(accessory_data)} accessories.")
    if skipped_files:
        print(f"Skipped {len(skipped_files)} accessories: {skipped_files}")

if __name__ == "__main__":
    precompute_accessory_colors()