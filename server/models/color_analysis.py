from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

def extract_dominant_colors(image_path, num_colors=3):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((100, 100))
    pixels = np.array(image).reshape(-1, 3)

    # Filter out white pixels (close to 255,255,255)
    pixels = np.array([p for p in pixels if not is_white(p)])

    if len(pixels) == 0:
        return ["rgb(0,0,0)"]  # Fallback if all were white

    kmeans = KMeans(n_clusters=min(num_colors, len(pixels)), n_init=10)
    kmeans.fit(pixels)
    colors = kmeans.cluster_centers_.astype(int)

    return [f"rgb({r},{g},{b})" for r, g, b in colors]

def is_white(rgb, threshold=250):
    return all(c > threshold for c in rgb)
