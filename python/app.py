import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from flask import Flask, request, jsonify
from PIL import Image
import io

# โหลดโมเดลที่เซฟไว้
model = tf.keras.models.load_model("./Model/xceptionmodel.h5")

# รายชื่อสายพันธุ์ที่โมเดลสามารถทำนายได้ (ต้องตรงกับตอน Train)
class_names = ['beagle', 'golden_retriever', 'Rottweiler', 'German_shepherd', 'French_bulldog', 'Siberian_husky', 'pug', 'Samoyed', 'Pomeranian', 'standard_poodle']

# ฟังก์ชันทำนายสายพันธุ์สุนัข
def predict_breed(img, model):
    img = img.resize((224, 224))  # ขนาดภาพต้องตรงกับโมเดล
    img_array = np.array(img) / 255.0  # ทำให้ค่าอยู่ในช่วง 0-1
    img_array = np.expand_dims(img_array, axis=0)  # เพิ่มมิติให้โมเดลรับค่าได้

    # ทำการพยากรณ์
    predictions = model.predict(img_array)
    confidence_scores = predictions[0] * 100  # แปลงเป็นเปอร์เซ็นต์
    max_index = np.argmax(predictions)
    max_confidence = confidence_scores[max_index]

    if max_confidence < 50:
        return "ไม่ทราบสายพันธุ์", max_confidence

    return class_names[max_index], max_confidence

# สร้างแอปพลิเคชัน Flask
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        img = Image.open(file.stream)  # ใช้ .stream เพื่อเปิดไฟล์จากคำขอ
        breed, confidence = predict_breed(img, model)

        return jsonify({
            "breed": breed,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
