from PIL import Image
from rembg import remove
from io import BytesIO
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

def extract_dominant_colors(image_path, num_colors=3):
    with open(image_path, "rb") as f:
        input_image = f.read()
    output_image = remove(input_image)

    # Save processed image for debugging
    debug_image = Image.open(BytesIO(output_image))
    debug_image.save("debug_output.png")

    image = debug_image.convert('RGB')
    image = image.resize((150, 150))  # Increased size for better color detail
    pixels = np.array(image).reshape(-1, 3)

    pixels = [tuple(p) for p in pixels if not is_white(p)]

    if len(pixels) < 150:  # Adjusted threshold for larger image
        pixels = np.array(image).reshape(-1, 3)
        pixels = [tuple(p) for p in pixels]

    if len(pixels) == 0:
        return ["rgb(0,0,0)"]

    # Count frequency of each color
    pixel_counts = Counter(pixels)
    total_pixels = sum(pixel_counts.values())

    # Filter out black/white unless they dominate
    filtered_pixels = []
    for color, count in pixel_counts.items():
        percentage = count / total_pixels
        if is_fallback_color(color, include_gold_silver=False) and percentage < 0.5:  # Lowered to 50%
            continue
        filtered_pixels.extend([color] * count)

    if len(filtered_pixels) < 150:
        filtered_pixels = pixels

    # KMeans clustering
    kmeans = KMeans(n_clusters=min(num_colors, len(filtered_pixels)), n_init=10)
    kmeans.fit(filtered_pixels)
    colors = kmeans.cluster_centers_.astype(int)

    rgb_colors = [f"rgb({r},{g},{b})" for r, g, b in colors]
    print(f"Extracted colors: {rgb_colors}")
    return rgb_colors

def is_white(rgb, threshold=180):  # Lowered threshold to capture more colors
    return all(c > threshold for c in rgb)

def is_fallback_color(rgb_tuple, include_gold_silver=True):
    color = np.array(rgb_tuple)
    black_white = (
        np.linalg.norm(color - np.array([0, 0, 0])) < 30 or  # Black
        np.linalg.norm(color - np.array([255, 255, 255])) < 30  # White
    )
    if include_gold_silver:
        return black_white or np.linalg.norm(color - np.array([255, 215, 0])) < 50  # Golden
    return black_white