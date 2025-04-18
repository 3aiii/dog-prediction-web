import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRadarChart } from "react-icons/ai";
import { AiOutlineLineChart } from "react-icons/ai";
import { GiSittingDog } from "react-icons/gi";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="grid grid-cols-2 gap-4 max-w-6xl w-full items-center">
        <div>
          <h1 className="text-[52px] font-bold text-gray-800 leading-tight mb-6">
            ค้นหาสายพันธุ์สุนัข <br />
            จากภาพถ่ายของคุณ <br />
            ด้วย AI อัจฉริยะ
          </h1>
          <p className="text-gray-600 mb-8 text-xl">
            เพียงอัปโหลดรูปภาพสุนัขของคุณ
            ระบบจะช่วยวิเคราะห์และระบุสายพันธุ์อย่างแม่นยำภายในไม่กี่วินาที —
            รวดเร็ว ง่าย และใช้งานฟรี!
          </p>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white 
                rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 
                transition hover:scale-105"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              to="/registration"
              className="px-8 py-3 bg-white border border-blue-500 
              text-blue-500 rounded-xl text-lg font-medium shadow-lg 
                hover:bg-blue-500 hover:text-white transition hover:scale-105"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/3d_character_206.jpg"
            alt="3D Character"
            className="w-full h-auto object-contain "
          />
        </div>
      </div>
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="cursor-default bg-blue-50 p-6 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <div className="flex justify-center text-5xl mb-4 text-blue-600">
            <AiOutlineRadarChart />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            วิเคราะห์แม่นยำด้วย AI
          </h3>
          <p className="text-gray-600 text-sm">
            ระบบของเราถูกฝึกด้วยภาพนับพัน พร้อมแบบจำลอง deep learning
            เพื่อให้ได้ผลลัพธ์ที่เชื่อถือได้สูงสุด
          </p>
        </div>

        <div className="cursor-default bg-green-50 p-6 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <div className="flex justify-center text-5xl mb-4 text-green-600">
            <AiOutlineLineChart />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            แสดงผลการทำนาย Top 5
          </h3>
          <p className="text-gray-600 text-sm">
            ระบบจะแสดงผลลัพธ์การคาดเดาสายพันธุ์ 5 อันดับแรก
            พร้อมเปอร์เซ็นต์ความแม่นยำ
            เพื่อให้คุณเข้าใจความเป็นไปได้ของสายพันธุ์ต่างๆ อย่างชัดเจน
          </p>
        </div>

        <div className="cursor-default bg-yellow-50 p-6 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <div className="flex justify-center text-5xl mb-4 text-yellow-600">
            <GiSittingDog />
          </div>
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">
            ข้อมูลสายพันธุ์ครบถ้วน
          </h3>
          <p className="text-gray-600 text-sm">
            หลังจากระบุสายพันธุ์แล้ว ระบบจะแสดงรายละเอียดพันธุ์ ประวัติ
            ลักษณะนิสัย และข้อมูลที่น่าสนใจเพิ่มเติม
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
