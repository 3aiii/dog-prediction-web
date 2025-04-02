import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="flex bg-white p-8 rounded-xl shadow-md w-[550px]">
        <div className="w-full px-4">
          <div className="flex items-center">
            <div className="w-1/2 h-[3px] bg-blue-500"></div>
            <h1 className="text-4xl w-full font-semibold text-center text-blue-600">
              สมัครสมาชิก
            </h1>
            <div className="w-1/2 h-[3px] bg-blue-500"></div>
          </div>
          <form className="mt-4">
            <div className="flex gap-2 mb-4">
              <div>
                <label className="block text-left text-lg font-medium mb-1">
                  ชื่อ:
                </label>
                <input type="text" placeholder="ชื่อ" className="btn-field" />
              </div>
              <div>
                <label className="block text-left text-lg font-medium mb-1">
                  นามสกุล:
                </label>
                <input
                  type="text"
                  placeholder="นามสกุล"
                  className="btn-field"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                อีเมล:
              </label>
              <input type="email" placeholder="อีเมล" className="btn-field" />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                รหัสผู้ใช้งาน:
              </label>
              <input
                type="password"
                placeholder="รหัสผู้ใช้งาน"
                className="btn-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                ยืนยันรหัสผู้ใช้งาน:
              </label>
              <input
                type="password"
                placeholder="ยืนยันรหัสผู้ใช้งาน"
                className="btn-field"
              />
            </div>
          </form>
          <div className="flex items-center justify-between">
            <p className="flex items-center text-md">
              มีบัญชีผู้ใช้แล้ว?
              <Link to="/login" className="text-blue-500 ml-1">
                เข้าสู่ระบบ
              </Link>
            </p>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
