import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="flex bg-white p-8 rounded-xl shadow-md w-[550px] h-[350px]">
        <div className="w-full px-4">
          <div className="flex items-center">
            <div className="w-1/2 h-[3px] bg-blue-500"></div>
            <h1 className="text-4xl w-[300px] font-semibold text-center text-blue-600">
              เข้าสู่ระบบ
            </h1>
            <div className="w-1/2 h-[3px] bg-blue-500"></div>
          </div>
          <form className="mt-4">
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
          </form>
          <div className="flex items-center justify-between">
            <p className="flex items-center text-md">
              ยังไม่มีบัญชีผู้ใช้?
              <Link to="/registration" className="text-blue-500 ml-1">
                สมัครสมาชิก
              </Link>
            </p>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
