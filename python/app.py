from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os
from datetime import datetime

app = Flask(__name__)

# Define available models
MODEL_PATHS = {
    'cnnmodel': './model/cnnmodel.h5',
    'xceptionmodel': './model/xceptionmodel.h5',
    'inceptionmodel': './model/inceptionmodel.h5'
}

# Class names (update with the correct breed list)
class_names = ['beagle', 'golden_retriever', 'Rottweiler', 'German_shepherd', 'French_bulldog', 
               'Siberian_husky', 'pug', 'Samoyed', 'Pomeranian', 'standard_poodle']

# Function to load the selected model
def load_model(model_name):
    if model_name not in MODEL_PATHS:
        raise ValueError("Invalid model name. Choose from 'cnnmodel', 'xceptionmodel', or 'inceptionmodel'.")
    return tf.keras.models.load_model(MODEL_PATHS[model_name])

def predict_breed(img_path, model):
    # Load and preprocess the image
    img = image.load_img(img_path, target_size=(224, 224))  # Resize image
    img_array = image.img_to_array(img) / 255.0  # Normalize to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Prediction
    predictions = model.predict(img_array)
    confidence_scores = predictions[0] * 100 
    max_index = np.argmax(predictions)
    max_confidence = confidence_scores[max_index]

    # If confidence is less than 50%, return "Unknown breed"
    if max_confidence < 50:
        return "ไม่ทราบสายพันธุ์", max_confidence

    return class_names[max_index], max_confidence

@app.route('/predict', methods=['POST'])
def upload_image():
    model_name = request.args.get('model', 'cnnmodel')  
    try:
        model = load_model(model_name)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Get the current date and time
    current_date = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    file_extension = os.path.splitext(file.filename)[1]
    new_filename = f"{current_date}{file_extension}"

    current_dir = os.path.dirname(os.path.abspath(__file__))
    img_path = os.path.join(current_dir, '..', 'server', 'src', 'uploads', new_filename)
    os.makedirs(os.path.join(current_dir, '..', 'server', 'src', 'uploads'), exist_ok=True)
    file.save(img_path)

    # Predict breed
    breed, confidence = predict_breed(img_path, model)

    # Return the result
    return jsonify({
        'breed': breed,
        'model': model_name,
        'confidence': f'{confidence:.2f}%',
        'image_path': img_path
    })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
