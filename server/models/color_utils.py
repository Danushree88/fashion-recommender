import math

def rgb_string_to_tuple(rgb_str):
    """Convert 'rgb(255,255,255)' to (255, 255, 255)"""
    rgb = rgb_str.strip("rgb()").split(",")
    return tuple(map(int, rgb))

def calculate_color_distance(c1, c2):
    """Euclidean distance between two RGB tuples"""
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

