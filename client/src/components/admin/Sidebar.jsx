import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[260px] h-full bg-[#1e272e] text-white p-4">
        <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mt-6 mb-4">
          เมนูแอดมิน
        </h2>
        <nav className="space-y-2">
          <Link
            to="/predict"
            className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${isActive(
              "/predict"
            )}`}
          >
            เพิ่ม ลบ แก้ไข ข้อมูลผู้ใช้งาน
          </Link>
          <Link
            to="/dog-breed"
            className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${isActive(
              "/dog-breed"
            )}`}
          >
            ดูข้อมูลของผู้ใช้งาน
          </Link>
        </nav>

        <button className="w-full text-left px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 mt-4 transition">
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
