import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TopDogPrediction = () => {
  const breeds = [
    {
      name: "Labrador",
      image: "labrador.png",
      nature: "ตัวใหญ่ ขนสั้น สีดำ น้ำตาล หรือครีม",
      habits: "ฉลาด เป็นมิตร ขี้เล่น",
      husbandry: "ออกกำลังกายทุกวัน และแปรงขนประจำ",
      origin: "แคนาดา",
      predictedTimes: 120,
    },
    {
      name: "Golden",
      image: "golden retriever.png",
      nature: "ขนยาวนุ่ม สีทองหรือครีม",
      habits: "ใจดี รักเด็ก ซื่อสัตย์",
      husbandry: "แปรงขนบ่อย และฝึกออกกำลังกาย",
      origin: "สกอตแลนด์",
      predictedTimes: 95,
    },
    {
      name: "Poodle",
      image: "poodle.png",
      nature: "ขนหยิก ลอนแน่น ขนาดเล็ก-กลาง-ใหญ่",
      habits: "ฉลาดมาก เป็นมิตร และเชื่อฟัง",
      husbandry: "ต้องตัดแต่งขนเป็นประจำ",
      origin: "เยอรมนี / ฝรั่งเศส",
      predictedTimes: 85,
    },
    {
      name: "Pomeranian",
      image: "pomeranian.png",
      nature: "ตัวเล็ก ขนฟู หน้าตาน่ารัก",
      habits: "ขี้เล่น ช่างพูด ตื่นตัว",
      husbandry: "แปรงขนทุกวัน และฝึกการเข้าสังคม",
      origin: "โปแลนด์ / เยอรมนี",
      predictedTimes: 75,
    },
    {
      name: "Chihuahua",
      image: "chihuahua.png",
      nature: "ตัวเล็กจิ๋ว หัวแอปเปิลหรือหัวกวาง",
      habits: "กล้าหาญ รักเจ้าของ หวงตัว",
      husbandry: "ระวังเรื่องอากาศเย็น และอาหาร",
      origin: "เม็กซิโก",
      predictedTimes: 60,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl text-[#2f3542] text-center font-bold my-6 mb-12">
        ข้อมูลสุนัขที่ถูกทำนายมากที่สุด 5 อันดับ
      </h1>

      {/* Graph */}
      <div className="w-full flex justify-center mb-4 bg-white p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="80%" height={350}>
          <BarChart data={breeds}>
            {/* กำหนด Gradient */}
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
            <Bar dataKey="predictedTimes" fill="url(#colorUv)" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 */}
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 gap-4">
        {breeds?.map((breed, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="flex items-center justify-center text-center text-xl font-semibold mb-2">
              <span className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold mr-2">
                {index + 1}
              </span>
              {breed.name}
            </h3>
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>จำนวนครั้งที่ถูกทำนาย:</strong> {breed.predictedTimes}{" "}
              ครั้ง
            </p>
            <p>
              <strong>ลักษณะ:</strong> {breed.nature}
            </p>
            <p>
              <strong>นิสัย:</strong> {breed.habits}
            </p>
            <p>
              <strong>การดูแล:</strong> {breed.husbandry}
            </p>
            <p>
              <strong>ถิ่นกำเนิด:</strong> {breed.origin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDogPrediction;
