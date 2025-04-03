import React, { useState } from "react";
import Swal from "sweetalert2";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState("cnn");
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePredict = () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกไฟล์ภาพก่อน",
        text: "คุณยังไม่ได้เลือกไฟล์ภาพใด ๆ",
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }
    setPrediction("Labrador Retriever (จำลอง)");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
          <div className="flex items-center mb-4">
            <div className="w-[50px] h-[3px] bg-[#2f3542]"></div>
            <h2 className="w-full text-3xl text-[#2f3542] font-bold">
              อัปโหลดภาพสุนัขเพื่อทำนายสายพันธุ์
            </h2>
            <div className="w-[50px] h-[3px] bg-[#2f3542]"></div>
          </div>

          {preview ? (
            <div className="flex items-center justify-center">
              <img
                src={preview}
                alt="Uploaded Preview"
                className="w-full h-[250px] object-cover mt-3 rounded-lg mb-4"
              />
            </div>
          ) : (
            <></>
          )}

          <label className="block text-left font-semibold mb-2">
            เลือกโมเดล:
          </label>
          <select
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="cnn">CNN</option>
            <option value="inception">Inception</option>
            <option value="xception">Xception</option>
          </select>

          <label
            className="block w-full p-3 border border-gray-300 rounded-lg cursor-pointer 
            bg-gray-50 text-gray-700 text-center hover:bg-gray-200 transition mb-4"
          >
            เลือกไฟล์ภาพ
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setPreview(null)}
              className="bg-gray-500 px-3 py-2 text-white rounded-md"
            >
              ยกเลิก
            </button>
            <button
              onClick={handlePredict}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              ทำนาย
            </button>
          </div>

          {prediction && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
              <h3 className="text-2xl font-bold">ผลการทำนาย:</h3>
              <p>
                <strong>โมเดลที่เลือก:</strong> {model.toUpperCase()}
              </p>
              <p>
                <strong>สายพันธุ์ที่คาดว่า:</strong> {prediction}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
