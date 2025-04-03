import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { create } from "../../../composables/userService";

const Registration = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      return Swal.fire({
        title: "รหัสผ่านไม่ตรงกัน!",
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
        icon: "error",
        confirmButtonText: "ลองใหม่อีกครั้ง",
      });
    }

    try {
      const { data } = await create(formData);
      if (data) {
        Swal.fire({
          title: "สมัครสมาชิกสำเร็จ!",
          text: "ยินดีต้อนรับ! คุณสามารถเข้าสู่ระบบได้เลย",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          didClose: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      if (error.response.data.error) {
        return Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "ลองใหม่อีกครั้ง",
        });
      }
    }
  };

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

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-4">
              <div>
                <label className="block text-left text-lg font-medium mb-1">
                  ชื่อ:
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  className="btn-field"
                />
              </div>
              <div>
                <label className="block text-left text-lg font-medium mb-1">
                  นามสกุล:
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  className="btn-field"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                อีเมล:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="อีเมล"
                className="btn-field"
              />
            </div>

            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                รหัสผู้ใช้งาน:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="ยืนยันรหัสผู้ใช้งาน"
                className="btn-field"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center text-md">
                มีบัญชีผู้ใช้แล้ว?
                <Link to="/login" className="text-blue-500 ml-1">
                  เข้าสู่ระบบ
                </Link>
              </p>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md"
              >
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
