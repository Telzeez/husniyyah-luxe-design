import os
import json
from PIL import Image
from transformers import pipeline

# Set up zero-shot image classification pipeline using CLIP
print("Loading CLIP model...")
classifier = pipeline("zero-shot-image-classification", model="openai/clip-vit-base-patch32")

labels_to_search = [
    "keyholder", 
    "pen pouch", 
    "jewelry", 
    "earrings", 
    "bag", 
    "wallet", 
    "table mat", 
    "shoes", 
    "sticker",
    "handmade ornament",
    "knitted item",
    "brooch",
    "necklace",
    "bracelet"
]

images_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'products')
results = {}

print(f"Scanning directory: {images_dir}")

for filename in os.listdir(images_dir):
    if filename.endswith(('.jpg', '.jpeg', '.png', '.webp')):
        filepath = os.path.join(images_dir, filename)
        try:
            image = Image.open(filepath).convert('RGB')
            # Classify
            predictions = classifier(image, candidate_labels=labels_to_search)
            # Get the top prediction
            top_pred = predictions[0]
            label = top_pred['label']
            
            # Capitalize each word for product name
            product_name = " ".join([word.capitalize() for word in label.split()])
            print(f"{filename}: {product_name} ({top_pred['score']:.2f})")
            
            results[filename] = product_name
        except Exception as e:
            print(f"Error processing {filename}: {e}")

output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'classifications.json')
with open(output_file, 'w') as f:
    json.dump(results, f, indent=2)

print(f"Classification finished. Results saved to {output_file}")
