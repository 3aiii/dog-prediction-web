import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm w-full">
        <h1>ยินดีต้อนรับสู่เว็บไซต์จำแนกสายพันธุ์สุนัข</h1>
        <img src="/cute-dog.jpg.png" alt="น้องหมาน่ารัก" />
        <br />
        <Link to="/login" className="btn-green text-white">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
};

export default Index;
