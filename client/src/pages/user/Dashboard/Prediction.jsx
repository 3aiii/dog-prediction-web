import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getHistoryByUserId, predict } from "../../../composables/dogService";
import { verify } from "../../../composables/userService";
import { IMAGE_URL } from "../../../secret";
import { formatEnglishDate } from "./../../../utils/formatDate";
import { FaImages } from "react-icons/fa";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState("cnnmodel");
  const [prediction, setPrediction] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchUser = async () => {
    const { data } = await verify();
    const historys = await getHistoryByUserId(data?.user_id);
    setHistory(historys?.data);
    setUserId(data?.user_id);
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
      setLoading(true);
      const response = await predict(userId, model, formData);
      fetchUser();
      setPrediction(response.data.prediction || "ไม่ทราบสายพันธุ์");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถทำนายสายพันธุ์ได้",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 text-center md:text-left">
            อัปโหลดภาพสุนัขเพื่อทำนายสายพันธุ์
          </h2>
          <select
            className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="cnnmodel">CNN</option>
            <option value="inceptionmodel">Inception</option>
            <option value="xceptionmodel">Xception</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {!preview ? (
            <label
              className="w-full h-72 flex justify-center items-center 
            border-2 border-dashed border-blue-400 rounded-xl bg-gray-50 text-gray-600 cursor-pointer hover:bg-blue-50 transition text-lg"
            >
              <FaImages size={45}/>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="w-full h-64">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center my-2">
                <div className="animate-spin h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
                <p className="mt-2 text-blue-600 font-semibold">
                  กำลังประมวลผลภาพ...
                </p>
              </div>
            ) : (
              prediction.length !== 0 && (
                <div className="w-full h-full bg-green-50 border border-green-200 rounded-xl p-6 text-left shadow-md">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    ผลการทำนายสายพันธุ์สุนัข
                  </h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">โมเดลที่ใช้:</p>
                    <div className="inline-block bg-blue-100 text-blue-700 font-bold px-4 py-1 rounded-full uppercase shadow-sm text-sm tracking-wider">
                      {prediction?.model?.toUpperCase()}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">สายพันธุ์ที่คาดว่า:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {prediction?.breed}
                    </p>
                  </div>

                  {prediction?.breedDetail && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">ลักษณะ:</p>
                        <p className="text-gray-700">
                          {prediction?.breedDetail?.nature}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">นิสัย:</p>
                        <p className="text-gray-700">
                          {prediction?.breedDetail?.habits}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">การดูแล:</p>
                        <p className="text-gray-700">
                          {prediction?.breedDetail?.husbandry}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ถิ่นกำเนิด:</p>
                        <p className="text-gray-700">
                          {prediction?.breedDetail?.origin}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">
                      ความมั่นใจในการทำนาย:{" "}
                      <strong>{prediction?.confidence}%</strong>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          prediction?.confidence > 80
                            ? "bg-green-500"
                            : prediction?.confidence > 50
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${prediction?.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className={`flex gap-3 justify-end ${
            prediction.length !== 0 ? `mt-4` : ``
          }`}
        >
          <button
            onClick={() => {
              setPreview(null);
              setSelectedFile(null);
              setPrediction([]);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white text-lg px-4 py-1 rounded-lg transition"
            disabled={loading}
          >
            ยกเลิก
          </button>
          <button
            onClick={handlePredict}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg 
              px-4 py-1 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "กำลังทำนาย..." : "ทำนาย"}
          </button>
        </div>

        {history?.data?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-left">
              ประวัติการทำนายของคุณ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {history?.data?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={`${IMAGE_URL}/${item.image}`}
                    alt={item.breed}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-400">
                      {formatEnglishDate(item.createdAt)}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-800 mt-1">
                      {item.breed}
                    </h4>
                    <p className="text-sm text-gray-600">
                      โมเดล: {item.model_used.toUpperCase()} | ความมั่นใจ:{" "}
                      {item.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
