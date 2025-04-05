import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { top5 } from "../../../composables/dogService";

const TopDogPrediction = () => {
  const [breeds, setBreeds] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await top5();
      setBreeds(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-[#2f3542] text-center font-bold my-6 mb-12">
        ข้อมูลสุนัขที่ถูกทำนายมากที่สุด 5 อันดับ
      </h1>

      {/* Graph */}
      {breeds?.top5 && (
        <div className="w-full flex justify-center mb-4 bg-white p-4 rounded-lg shadow-md">
          <ResponsiveContainer width="80%" height={350}>
            <BarChart
              data={breeds?.top5?.map((item) => ({
                name: item.breedDetail?.name || "ไม่ทราบชื่อ",
                count: item.count,
              }))}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A90E2" stopOpacity={1} />
                  <stop offset="100%" stopColor="#7B61FF" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="url(#colorUv)" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top 5 */}
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 gap-4">
        {breeds?.top5?.map((breed, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="flex items-center justify-center text-center text-xl font-semibold mb-2">
              <span className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold mr-2">
                {index + 1}
              </span>
              {breed.breedDetail.name}
            </h3>
            <img
              src={breed.breedDetail.image}
              alt={breed.breedDetail.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>จำนวนครั้งที่ถูกทำนาย:</strong> {breed.count} ครั้ง
            </p>
            <p>
              <strong>ลักษณะ:</strong> {breed.breedDetail.nature}
            </p>
            <p>
              <strong>นิสัย:</strong> {breed.breedDetail.habits}
            </p>
            <p>
              <strong>การดูแล:</strong> {breed.breedDetail.husbandry}
            </p>
            <p>
              <strong>ถิ่นกำเนิด:</strong> {breed.breedDetail.origin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDogPrediction;
