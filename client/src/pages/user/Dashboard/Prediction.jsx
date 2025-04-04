import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { predict } from "../../../composables/dogService";
import { verify } from "../../../composables/userService";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState("cnnmodel");
  const [prediction, setPrediction] = useState([]);
  const [userId, setUserId] = useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกไฟล์ภาพก่อน",
        text: "คุณยังไม่ได้เลือกไฟล์ภาพ",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await predict(userId, model, formData);

      if (response.status === 200) {
        setPrediction(response.data.prediction || "ไม่ทราบสายพันธุ์");
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "ทำนายสายพันธุ์สำเร็จ",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Prediction error:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถทำนายสายพันธุ์ได้",
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await verify();
      setUserId(data?.user_id);
    };
    fetchUser();
  }, []);

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
            <option value="cnnmodel">CNN</option>
            <option value="inceptionmodel">Inception</option>
            <option value="xceptionmodel">Xception</option>
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

          {prediction.length !== 0 && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
              <h3 className="text-2xl font-bold">ผลการทำนาย:</h3>
              <p>
                <strong>โมเดลที่เลือก:</strong> {model.toUpperCase()}
              </p>
              <p>
                <strong>สายพันธุ์ที่คาดว่า:</strong> {prediction?.breed}
              </p>
              <p>
                <strong>ความน่าจะเป็น:</strong> {prediction?.confidence} %
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
